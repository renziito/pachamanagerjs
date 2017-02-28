var event = require('./event.js');

var protoPage = function( router ){

  event.call(this);
  this.events = {};
  this.root;
  this.router = router;
  this.modules = [];

};

/*OOP herency*/
protoPage.prototype = Object.create( event.prototype );
protoPage.prototype.contructor = protoPage;
/*OOP herency*/

protoPage.prototype.build = function(){
  this.setEvents();

  //console.log( this.eventCallbacks )
  this.launchEvent('load');

  this._init();
};

protoPage.prototype._init = function(){

  this.init();
};
protoPage.prototype.init = function(){};

protoPage.prototype.setEvents = function(){

  this.on( 'load', this._onLoad.bind(this) );
  this.on( 'close', this._onClose.bind(this) );

};

protoPage.prototype.launchEvent = function( name ){

  if( name !== '' && typeof name === 'string' )
    this.dispatchEvent( name );
  else {
    throw 'event name should be a string';
  }

};

protoPage.prototype._onLoad = function(){
  this.onLoad( arguments );
};
protoPage.prototype._onClose = function(){
  this.onClose( arguments );
};

protoPage.prototype.onLoad = function(){};
protoPage.prototype.onClose = function(){};


module.exports = protoPage;
