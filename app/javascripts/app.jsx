//App.jsx

var App  = React.createClass({displayName: 'App',
  getInitialState: function() {
    return {horseRegistryAddr: HorseRegistry.deployed_address};
  },
  componentDidMount: function() {
  	this.getFirstAccount();
  },

  getFirstAccount: function() {
  	web3.eth.getAccounts(function(error,result){
  		if(error == null){
  			this.setState({account: result[0]});
  			this.refs.myHorses.getHorsesFromBlockchain();
  		}
  	}.bind(this));
  },

  openNewHorseModal: function() {
  	this.refs.newHorseModal.open();
  },

  render: function() {
    return (
      <body>
        <NavigationBar account={this.state.account}/>
        <div className="container-fluid"> 
          <ReactBootstrap.Row>
            <ReactBootstrap.Col md={12}>
              <MyHorses global={this.state}
              			ref={'myHorses'}
              			openNewHorseModal={this.openNewHorseModal}/>
            </ReactBootstrap.Col>
          </ReactBootstrap.Row>
        </div>
        <NewHorseModal global={this.state} ref={'newHorseModal'}/>
      </body>
    );
  }
});

React.render(
  <App/>,
  document.getElementById('body')
);