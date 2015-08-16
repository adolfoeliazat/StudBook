//myHorses
var MyHorses = React.createClass({displayName: 'MyHorses',
  getHorsesFromBlockchain: function(){
  	console.log("horseRegistryAddr:"+this.props.global.horseRegistryAddr);
    console.log("account:"+this.props.global.account);

    if(this.props.global.account != undefined){

		console.log("loading horses from registry");    	
    	
    	var hr =  HorseRegistry.at(this.props.global.horseRegistryAddr);
    	
    	hr.getNumHorses.call(this.props.global.account)
	    .then (function(_numHorses){
	    	var num=Number(_numHorses);
			this.setState({numHorses: num});
			//return hr.
	    }.bind(this))

	    .done();
    }
  },
  getInitialState: function() {
  	return {numHorses     : ".." };
  },

  render: function() {
    return (
      <ReactBootstrap.Panel header={"My Horses registered at " + this.props.global.horseRegistryAddr}>
        <p>Horses registered here: {this.state.numHorses}</p>
      </ReactBootstrap.Panel> 
    );
  }
});