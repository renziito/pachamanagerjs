require('./tiffinhandles.js');

var Dealer = require('./utils/dealer.js'); Dealer = new Dealer();
var Router = require('progressiverouter');

var War = require('war'); War = new War();
War.setGlobalHeaders( {
  'Accept': 'text/plain, text/html'
});

//set global libs
Router.addLib( 'dealer', Dealer );
Router.addLib( 'war', War );
//set webpage routes
Router.setRoute( '/', require('./pages/index.js') );
Router.setRoute( '/landing', require('./pages/landing.js') );

Router.chooseRoute( Router.currentPage.pathname );
