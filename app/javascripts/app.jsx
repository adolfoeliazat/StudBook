//App.jsx

var App  = React.createClass({displayName: 'App',
  getInitialState: function() {
    return {horseRegistryAddr: HorseRegistry.deployed_address, accounts: []};
  },
  componentDidMount: function() {
  	this.getWorkingAccount();
  },

  getWorkingAccount: function() {
  	web3.eth.getAccounts(function(error,result){
  		if(error == null){
  			this.setState({account: result[0]});
  			this.setState({accounts: result});

  			this.refs.myHorses.getHorsesFromBlockchain(result[0]);
  		}
  	}.bind(this));
  },
  openChangeAccountModal: function() {
  	console.log('openChangeAccountModal');
  	this.refs.changeAccountModal.open();
  },

  useNewAccount: function(account){
  	console.log("useNewAccount:"+account);
  	this.setState({account: account});
  	this.refs.myHorses.getHorsesFromBlockchain(account);
  },

  render: function() {
    return (
      <body>
        <NavigationBar 
        	account={this.state.account} 
        	openChangeAccountModal={this.openChangeAccountModal}/>
        <div className="container-fluid"> 
          <ReactBootstrap.Row>
            <ReactBootstrap.Col md={12}>
              <MyHorses global={this.state}
              			ref={'myHorses'}
              			/>
            </ReactBootstrap.Col>
          </ReactBootstrap.Row>
        </div>
        <ChangeAccountModal 
        	ref={'changeAccountModal'}
        	accounts={this.state.accounts}
        	account={this.state.account} 
        	useNewAccount={this.useNewAccount}/>
      </body>
    );
  }
});

React.render(
  <App/>,
  document.getElementById('body')
);