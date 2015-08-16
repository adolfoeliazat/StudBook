//changeAccountModal
var ChangeAccountModal = React.createClass({displayName: 'ChangeAccountModal',

 getInitialState(){
    return { showModal: false };
  },

  close(){
    this.setState({ showModal: false });
  },

  open(){
    this.setState({ showModal: true });
  },

  choose: function(a,e){
  	console.log("chosen:"+a);
	this.props.useNewAccount(a);
	this.close();
  },

render: function() {
	var accountRows = this.props.accounts.map(function (a) {
	  	  if(a != this.props.account){
	  	  	b=<Button bsStyle='primary' bsSize='xsmall' onClick={this.choose.bind(this,a)}>
	  	  				 Use this account <Glyphicon glyph='arrow-right' />
  	  				</Button>
	  	  }	else {
	  	  	b="Current account";
	  	  }
	      return (
	      	<tr key={a}>
		        <td><EthAddr addr={a}/></td>
		        <td>{b}</td>
		    </tr>
	      );
	    }.bind(this));
    return (
	<Modal show={this.state.showModal} onHide={this.close}>
      <Modal.Header closeButton>
        <Modal.Title>Change Account</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Table striped bordered condensed hover>
	        <tbody>
	          {accountRows}
	        </tbody>
      	</Table>
      </Modal.Body>

      <Modal.Footer>
        <Button onClick={this.close}>Cancel</Button>
      </Modal.Footer>

    </Modal>
    );
  }
});

