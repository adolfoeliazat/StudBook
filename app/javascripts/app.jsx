//App.jsx

var App  = React.createClass({displayName: 'App',
  getInitialState: function() {
    //web3.setProvider(new web3.providers.HttpProvider('http://localhost:8545'));
    return {horseRegistryAddr: HorseRegistry.deployed_address, accounts: []};
  },
  componentDidMount: function() {
  	this.getWorkingAccount();
  },

  getWorkingAccount: function() {
  	web3.eth.getAccounts(function(error,result){
  		if(error == null){
        console.log("accounts in app")
  			this.setState({account: result[0]});
  			this.setState({accounts: result});
  			this.refs.myHorses.getHorsesFromBlockchain(result[0]);
  		}else{
        console.log("error in web3.eth.getAccounts:"+error);
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

window.onload = function() {
  // TODO: How much of this is actually needed?
  web3.eth.getCoinbase(function(error, coinbase) {
    if (error != null) {
      alert("Couldn't get coinbase! Is your client running?");
      return;
    };

    Pudding.defaults({
      from: coinbase,
      gas: 3141592
    });
  });

  React.render(
    <App/>,
    document.getElementById('body')
  );
};