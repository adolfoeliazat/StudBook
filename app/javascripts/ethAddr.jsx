//ethAddr
var EthAddr = React.createClass({displayName: 'EthAddr',
	render: function() {
	    return (
	    	<Label bsStyle='info'>{this.props.addr}</Label>
	    );
  	}
});
