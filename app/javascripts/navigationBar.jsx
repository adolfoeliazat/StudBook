//navigationBar
var NavigationBar = React.createClass({displayName: 'NavigationBar',
  render: function() {
    return (
      <nav className="navbar navbar-inverse navbar-fixed-top">
        <div className="container">
            <div className="navbar-header page-scroll">
                <a className="navbar-brand page-scroll" href="#page-top">
                    StudBook / HorseRegistry
                </a>
            </div>
            <div className="collapse navbar-collapse">
              <p className="navbar-text navbar-right">Working with account: {this.props.account}</p>
            </div>
       </div>
    </nav>
    );
  }
});