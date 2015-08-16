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

    })
    .then ( function (_horseGender){
        //console.log(_horseGender);
        var gender = Number(_horseGender);
        if(gender == 0){
          horse.gender = 'Male';
        }
        if(gender == 1){
          horse.gender = 'Female';
        }
        horse.genderCode = gender;

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
      horses        : [],
      selectedHorseDefineGender : {},
      selectedHorseMoreInfo : {},
      selectedHorseTransfer : {},

    };
  },
  
  openDefineGenderModal: function(selHorse) {
    this.setState({selectedHorseDefineGender: selHorse});
    console.log("defining gender for: "+selHorse.name);
    this.refs.defineGenderModal.open();
  },

  openMoreInfoModal: function(selHorse) {
    this.setState({selectedHorseMoreInfo: selHorse});
    console.log("more info for: "+selHorse.name);
    this.refs.moreInfoModal.open();
  },

  openTransferModal: function(selHorse) {
    this.setState({selectedHorseTransfer: selHorse});
    console.log("transfering for: "+selHorse.name);
    this.refs.transferModal.open();
  },


  openNewHorseModal: function() {
    this.refs.newHorseModal.open();
  },

  openNewBornHorseModal: function() {
    this.refs.newBornHorseModal.open();
  },

  render: function() {
    var header="My Horses registered at " + this.props.global.horseRegistryAddr;
    return (
      <Panel header={ header }>
        <p>Horses registered here: {this.state.numHorses}</p>
        <HorseTable data={this.state.horses} 
              openDefineGenderModal={this.openDefineGenderModal}
              openMoreInfoModal={this.openMoreInfoModal}
              openTransferModal={this.openTransferModal} />
        <ButtonToolbar>
          <Button bsStyle='primary' onClick={this.openNewHorseModal}>New Horse</Button>
          <Button bsStyle='primary' onClick={this.openNewBornHorseModal}>Newborn Horse</Button>
        </ButtonToolbar>
        <DefineGenderModal ref={'defineGenderModal'} 
            horse={this.state.selectedHorseDefineGender}
            askForMyHorsesRefresh={this.getHorsesFromBlockchain}/>

        <MoreInfoModal ref={'moreInfoModal'} 
            horse={this.state.selectedHorseMoreInfo}/>

        <TransferModal ref={'transferModal'} 
            global={this.props.global}
            horse={this.state.selectedHorseTransfer}
            askForMyHorsesRefresh={this.getHorsesFromBlockchain}/>    

        <NewHorseModal 
                global={this.props.global}
                ref={'newHorseModal'}
                askForMyHorsesRefresh={this.getHorsesFromBlockchain}/>
        <NewBornHorseModal
                global={this.props.global}
                ref={'newBornHorseModal'}
                myHorses={this.state.horses} 
                askForMyHorsesRefresh={this.getHorsesFromBlockchain}/>
      </Panel>

    );
  }
});