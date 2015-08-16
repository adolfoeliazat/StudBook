//defineGenderModal
var DefineGenderModal = React.createClass({displayName: 'DefineGenderModal',

  getInitialState(){
    return { showModal: false};
  },

  close(){
    this.setState({ showModal: false });
  },

  open(){
    this.setState({ showModal: true });
  },

  save(){
  	var gender = this.refs.gender.getValue().trim();
  	console.log("setting gender:"+gender+" "+this.props.horse.address);
	if(gender != ''){
		var h =  Horse.at(this.props.horse.address);
    	
    	h.setGender(gender)
	    .then (function(tx){
        	console.log("gender set. tx:"+tx);
        	this.props.askForMyHorsesRefresh();
        	this.close();
	    }.bind(this))
	    .catch(function(e) {
        	console.log(e);
		})
	    .done();
	}  	
  },

render: function() {
	var horse=this.props.horse;
    return (
	<Modal show={this.state.showModal} onHide={this.close}>
      <Modal.Header closeButton>
        <Modal.Title>Set Gender for {horse.name} <EthAddr addr={horse.address}/></Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <form>
        	<Input type="select" placeholder="Select Gender" ref='gender'>
        		<option value='0'>Male</option>
      			<option value='1'>Female</option>
        	</Input>
        </form>
      </Modal.Body>

      <Modal.Footer>
        <Button onClick={this.close}>Cancel</Button>
        <Button bsStyle='primary' onClick={this.save}>Set Gender</Button>
      </Modal.Footer>

    </Modal>
    );
  }
});

