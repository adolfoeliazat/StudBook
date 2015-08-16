//transferModal
var TransferModal = React.createClass({displayName: 'TransferModal',

  getInitialState(){
    return { showModal: false};
  },

  close(){
    this.setState({ showModal: false });
  },

  open(){
    this.setState({ showModal: true });
  },

  transfer(){
  	var newOwner = this.refs.newOwner.getValue().trim();
  	console.log("transfering "+this.props.horse.address+" to: "+newOwner);
	  if(newOwner != ''){
		var hr =  HorseRegistry.at(this.props.global.horseRegistryAddr);
    var h =  Horse.at(this.props.horse.address);
    	
    	h.transfer(newOwner)
	    .then (function(tx){
        	console.log("transfered tx:"+tx);
          return hr.registerTransfer(this.props.horse.address,newOwner)	
	    }.bind(this))
      .then (function(tx){
          console.log("transfered registered tx:"+tx);
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
        <Modal.Title>Transfering {horse.name} <EthAddr addr={horse.address}/></Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Alert bsStyle='danger'>
          This is a blockchain operation that cannot be undone. Consider this the last warning!
        <form>
          <Label>New Owner address</Label>
        	<Input type="text" placeholder="New Owner" ref='newOwner'/>
        </form>
        </Alert>
        
      </Modal.Body>

      <Modal.Footer>
        <Button onClick={this.close}>Cancel</Button>
        <Button bsStyle='primary' onClick={this.transfer}>Transfer</Button>
      </Modal.Footer>

    </Modal>
    );
  }
});

