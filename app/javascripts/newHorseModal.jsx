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

render: function() {
    return (
	<Modal show={this.state.showModal} onHide={this.close}>
      <Modal.Header closeButton>
        <Modal.Title>New Horse</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        Modal body aca
      </Modal.Body>

      <Modal.Footer>
        <Button onClick={this.close}>Cancel</Button>
        <Button bsStyle='primary'>Save changes</Button>
      </Modal.Footer>

    </Modal>
    );
  }
});