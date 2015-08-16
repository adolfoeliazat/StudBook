//horseTable
var HorseTable = React.createClass({displayName: 'HorseTable',
  
	defineGender: function(horse, e){
		this.props.openDefineGenderModal(horse);
	},

	moreInfo: function(horse,e){
		this.props.openMoreInfoModal(horse);
	},

	transfer: function(horse,e){
		this.props.openTransferModal(horse);
	},

	render: function() {
		if(this.props.data.length == 0) return (
			<span>...</span>
		);

	  	var horseRows = this.props.data.map(function (horse) {
	  	  if(horse.gender == undefined){
	  	  	gender=<Button bsStyle='danger' bsSize='xsmall' onClick={this.defineGender.bind(this,horse)}>
	  	  				<Glyphicon glyph='exclamation-sign' /> Define gender 
  	  				</Button>
	  	  }	else {
	  	  	gender=horse.gender;
	  	  }
	      return (
	      	<tr key={horse.index}>
		        <td>{horse.index}</td>
		        <td><EthAddr addr={horse.address}/></td>
		        <td>{horse.name}</td>
		        <td>{gender}</td>
		        <td>
		        	<ButtonToolbar>
			        	<Button bsStyle='primary' bsSize='xsmall' onClick={this.moreInfo.bind(this,horse)}>
		  	  				<Glyphicon glyph='info-sign' /> More info
	  	  				</Button>
	  	  				<Button bsStyle='success' bsSize='xsmall' onClick={this.transfer.bind(this,horse)}>
		  	  				<Glyphicon glyph='export' /> Transfer
	  	  				</Button>
  	  				</ButtonToolbar>
  				</td>
		    </tr>
	      );
	    }.bind(this));
	    return (
	      <Table striped bordered condensed hover>
		    <thead>
		      <tr>
		        <th>#</th>
		        <th>Address</th>
		        <th>Name</th>
		        <th>Gender</th>
		        <th>&nbsp;</th>
		      </tr>
		    </thead>
		    <tbody>
		      {horseRows}
		    </tbody>
		  </Table>
	    );
  	}
});