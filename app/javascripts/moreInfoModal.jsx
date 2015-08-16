//moreInfoModal
var MoreInfoModal = React.createClass({displayName: 'MoreInfoModal',

  getInitialState(){
    return { showModal: false, contractInfo: {} };
  },

  close(){
    this.setState({ showModal: false });
  },

  open(){
    this.setState({ showModal: true });
  },


  getDataFromBlockchain(addr){
    if(addr == undefined) {
      console.log("address not here? WTF?");
      return;
    }else{
      console.log("querying Blockchain for:"+addr);
    }
    var h =  Horse.at(addr);
    //console.log(h);
    var contractInfo = {};

    h.getOwner.call()
    .then ( function (_horseOwner){
        console.log("owner:"+_horseOwner);
        contractInfo.owner=_horseOwner;
        return h.getGender.call();
    })
    .then ( function (_horseGender){
        console.log("gender:"+_horseGender);
        var gender = Number(_horseGender);
        if(gender == 0){
          contractInfo.gender = 'Male (0)';
        }
        if(gender == 1){
          contractInfo.gender = 'Female (1)';
        }
        return h.getMother.call();
    })
    .then ( function (_horseMother){
        console.log("_horseMother:"+_horseMother);
        contractInfo.mother=_horseMother;
        return h.getFather.call();
    })
    .then ( function (_horseFather){
        console.log("_horseFather:"+_horseFather);
        contractInfo.father=_horseFather;

        this.setState({ contractInfo: contractInfo });
    }.bind(this))
    .catch(function(e) {
        console.log(e);
    })
    .done();

  },

  componentWillReceiveProps: function(nextProps) {
    if(nextProps.horse.address != undefined){
      this.getDataFromBlockchain(nextProps.horse.address)
    }
  },
  
render: function() {
    return (
	<Modal show={this.state.showModal} onHide={this.close}>
      <Modal.Header closeButton>
        <Modal.Title>Blockchain Information</Modal.Title>
      </Modal.Header>

      <Modal.Body>
       <Table striped bordered condensed hover>
        <tbody>
          <tr>
            <td>Name</td>
            <td>{this.props.horse.name}</td>
          </tr>
          <tr>
            <td>Contract Address</td>
            <td><EthAddr addr={this.props.horse.address}/></td>
          </tr>
        </tbody>
      </Table>


      <Table striped bordered condensed hover>
        <tbody>
          <tr>
            <td>Owner</td>
            <td><EthAddr addr={this.state.contractInfo.owner}/></td>
          </tr>
          <tr>
            <td>Gender</td>
            <td>{this.state.contractInfo.gender}</td>
          </tr>
          <tr>
            <td>Mother</td>
            <td><EthAddr addr={this.state.contractInfo.mother}/></td>
          </tr>
          <tr>
            <td>Father</td>
            <td><EthAddr addr={this.state.contractInfo.father}/></td>
          </tr>
          
        </tbody>
      </Table>
      </Modal.Body>

      <Modal.Footer>
        <Button onClick={this.close}>Close</Button>
      </Modal.Footer>

    </Modal>
    );
  }
});

