var ds = require('domshaper');
var styles = require('./styles/styles.css');
var protoModule = require('../../utils/protoModule.js');

var imgShell = function( router ) {

  protoModule.call(this);
  //added methods for mediation
  this.router = router;
  this.dealer = this.router.getLib('dealer');

  //this.dealer.subscribe(this, 'changeTitleOnAnswer', this.magicTitle);

  this.container;

  //content group
  this.content;

  this.startedModuleAt = 0;
  this.endedModuleAt = 0;

};

/*OOP herency*/
imgShell.prototype = Object.create( protoModule.prototype );
imgShell.prototype.contructor = imgShell;
/*OOP herency*/

imgShell.prototype.init = function() {

  this.container = new ds.Shape('div');
  this.container.setClass( styles.cont );
  this.bg;

  this.putbackground();
  this.puticon();
  //this.puttext();
  //this.putbutton();

  this.launchEvent('load');

};

imgShell.prototype.putbackground = function(){
  this.bg = new ds.Shape( 'div' );
  this.bg.setClass( styles.bg, 'text-center' );
  this.container.appendShape( this.bg );
};

imgShell.prototype.puticon = function(){
  var icon = new ds.ImageShape( require('./icon.png') );
  icon.setClass( styles.icon );
  this.bg.appendShape( icon );
};

imgShell.prototype.puttext = function(){
  var txt = new ds.TextShape('h1');
  txt.updateText( 'Quieres pertenecer a los super amixers?' );
  txt.setClass( styles.title );
  this.bg.appendShape( txt );
};

imgShell.prototype.putbutton = function(){
  var b = new ds.ButtonShape('Obvio!');
  b.setClass( 'btn', 'btn-success', 'btn-lg', styles.buttone );
  this.bg.appendShape( b );
};

imgShell.prototype.onStart = function(){
  //console.log('started module');
  this.startedModuleAt = Date.now();
};

imgShell.prototype.onLoad = function(){
  //console.log('loaded module');
  this.endedModuleAt = Date.now();
  console.log( 'module loaded in', ( this.endedModuleAt - this.startedModuleAt ), 'ms' );
};

module.exports = imgShell;
