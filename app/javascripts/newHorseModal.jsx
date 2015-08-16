//new Horse modal
var NewHorseModal = React.createClass({displayName: 'NewHorseModal',

  getInitialState(){
    return { showModal: false };
  },

  close(){
    this.setState({ showModal: false });
  },

  open(){
    this.setState({ showModal: true });
  },

  save(){
  	console.log("save now");
  	var newHorseName = this.refs.newHorseName.getValue().trim();
  	console.log("new horse:"+newHorseName);
	if(newHorseName != ''){
		var hr =  HorseRegistry.at(this.props.global.horseRegistryAddr);
    	
    	hr.newHorse(newHorseName)
	    .then (function(tx){
        	console.log("new Horse created. tx:"+tx);
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
    return (
	<Modal show={this.state.showModal} onHide={this.close}>
      <Modal.Header closeButton>
        <Modal.Title>New Horse</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <form>
        	<Input type="text" placeholder="Horse Name" ref='newHorseName' />
        </form>
      </Modal.Body>

      <Modal.Footer>
        <Button onClick={this.close}>Cancel</Button>
        <Button bsStyle='primary' onClick={this.save}>Save changes</Button>
      </Modal.Footer>

    </Modal>
    );
  }
});

