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

        this.setState({horses: []});
        for(var i=0; i < num; i++){
          this.getHorse(i);
        }
	    }.bind(this))
	    .catch(function(e) {
        console.log(e);
		  })
	    .done();
    }
  },

  getHorse: function(_index){
    var hr =  HorseRegistry.at(this.props.global.horseRegistryAddr);
    var horse = {
      index: _index
    };
    
    hr.getHorseByIndex.call(this.props.global.account,_index)
    .then ( function (_horseAddress){
        //console.log(_horseAddress);
        horse.address = _horseAddress;
        return hr.getHorseName.call(_horseAddress);
    })
    .then ( function (_horseName){
        //console.log(_horseName);
        horse.name = web3.toAscii(_horseName);
        var h = Horse.at(horse.address)
        return h.getGender.call();

    }.bind(this))
    .then ( function (_horseGender){
        //console.log(_horseGender);
        var gender = Number(_horseGender);
        if(gender == 0){
          horse.gender = 'Male';
        }
        if(gender == 1){
          horse.gender = 'Female';
        }

        var horses = this.state.horses;
        horses[_index] = horse;
        this.setState({ horses: horses });

    }.bind(this))
    .catch(function(e) {
        console.log(e);
    })
    .done();
  },

  getInitialState: function() {
  	return {
      numHorses     : 0,
      horses        : [
        {index: 1, address: '0x123', name: 'Gran Papa', gender: 0},
        {index: 2, address: '0x223', name: 'Gran Mama', gender: 1}
      ]
    };
  },
  
  rowClick: function(e){
    console.log('row clicked pp');
  },


  render: function() {
    return (
      <Panel header={"My Horses registered at " + this.props.global.horseRegistryAddr}>
        <p>Horses registered here: {this.state.numHorses}</p>
        <HorseTable data={this.state.horses} rowClick={this.rowClick}/>
        <ButtonToolbar>
          <Button bsStyle='primary' onClick={this.props.openNewHorseModal}>New Horse</Button>
          <Button bsStyle='primary'>Newborn Horse</Button>
        </ButtonToolbar>
      </Panel> 
    );
  }
});