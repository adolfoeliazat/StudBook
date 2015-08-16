//newBornHorse modal
var NewBornHorseModal = React.createClass({displayName: 'NewBornHorseModal',

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
  	var newBornHorseName = this.refs.newBornHorseName.getValue().trim();
    var newBornHorseFather = this.refs.newBornHorseFather.getValue().trim();
    var newBornHorseMother = this.refs.newBornHorseMother.getValue().trim();

    console.log("newBornHorseName:"+newBornHorseName);
    console.log("newBornHorseFather:"+newBornHorseName);
    console.log("newBornHorseMother:"+newBornHorseMother);

	if(newBornHorseName != '' && newBornHorseFather!= '' && newBornHorseMother!= ''){
		var hr =  HorseRegistry.at(this.props.global.horseRegistryAddr);
    	
    	hr.newChild(newBornHorseFather,newBornHorseMother,newBornHorseName)
	    .then (function(tx){
        	console.log("new child created. tx:"+tx);
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
        <Modal.Title>New Born Horse</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <form>
          <Label>Horse Name</Label>
        	<Input type="text" placeholder="Horse Name" ref='newBornHorseName' />
          <Label>Horse Father Address</Label>
          <Input type="text" placeholder="Father Address" ref='newBornHorseFather'/>
          <Label>Horse Mother Address</Label>
          <Input type="text" placeholder="Mother Address" ref='newBornHorseMother' />

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

