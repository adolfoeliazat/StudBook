//myHorses
var MyHorses = React.createClass({displayName: 'MyHorses',
  getHorsesFromBlockchain: function(){
  	console.log("horseRegistryAddr:"+this.props.global.horseRegistryAddr);
    console.log("account:"+this.props.global.account);

    if(this.props.global.account != undefined){

		console.log("loading horses from registry for: "+this.props.global.account);    	
    	
    	var hr =  HorseRegistry.at(this.props.global.horseRegistryAddr);
    	
    	hr.getNumHorses.call(this.props.global.account)
	    .then (function(_numHorses){
        var num=Number(_numHorses);
        this.setState({numHorses: num});
        console.log(num +" to go.");
	    }.bind(this))
	    .catch(function(e) {
        console.log(e);
		  })
	    .done();
    }
  },

  getInitialState: function() {
  	return {numHorses     : ".." };
  },
  

  render: function() {
    return (
      <Panel header={"My Horses registered at " + this.props.global.horseRegistryAddr}>
        <p>Horses registered here: {this.state.numHorses}</p>
        <div id="horseTable"></div>
        <ButtonToolbar>
          <Button bsStyle='primary' onClick={this.props.openNewHorseModal}>New Horse</Button>
          <Button bsStyle='primary'>Newborn Horse</Button>
        </ButtonToolbar>
      </Panel> 
    );
  }
});