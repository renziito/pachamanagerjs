var ds = require('domshaper');
var protoModule = require('../../utils/protoModule.js');
var styles = require('./styles.css');

var contactForm = function( router ) {

  protoModule.call(this);
  //added methods for mediation
  this.router = router;
  this.war = this.router.getLib('war');

  //this.dealer.subscribe(this, 'changeTitleOnAnswer', this.magicTitle);

  this.container;

  //content group
  this.content;

  this.startedModuleAt = 0;
  this.endedModuleAt = 0;

};

/*OOP herency*/
contactForm.prototype = Object.create( protoModule.prototype );
contactForm.prototype.contructor = contactForm;
/*OOP herency*/

contactForm.prototype.init = function() {

  this.container = new ds.Shape('div');
  this.addForm();

  this.launchEvent('load');

};

contactForm.prototype.addForm = function(){
  var all = new ds.FormShape('/someplace');
  all.setClass( 'col', 'text-left' );

  all.addSection( this.createTextInputSection( 'name', 'Nombres: ', 'Ingresa tus nombres', 'Con un nombre basta' ) );
  all.addSection( this.createTextInputSection( 'lastname', 'Apellidos: ', 'Ingresa tus apellidos' ) );
  all.addSection( this.createTextInputSection( 'email', 'Email: ', 'Ingresa tu email' ) );
  all.addSection( this.createTextInputSection( 'cellphone', '# Celular: ', 'Ingresa tu numero de celular' ) );

  all.addSection( this.createOptions() );

  all.setSubmitTrigger("enviar")
  .setClass('btn btn-success', styles.centered );


  all.on( 'submit', function( ev ){
    ev.preventDefault();

    var c = this.war.confConnection('https://httpbin.org/put');
    c.response = function( data ){
      console.log(data)
    };

    c.progress = function( data ){
      console.log(data)
    };
    c.addTempHeader({ 'tex' : 'atex' });
    c.addTempHeader({ 'X-User-Agent' : 'wawasilawa' });

    this.war.PUT( c.id, all.serializeForm() );

  }.bind(this));

  this.container.appendShape( all );

};

contactForm.prototype.createTextInputSection = function( inputname = 'test', labeltext = 'test', placeholder = 'test', helpText ){
//  <div class="form-group">
// <label for="exampleInputEmail1">Email address</label>
//   <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email">
//   <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
// </div>

  var group = new ds.Shape('div');
  group.setClass( 'form-group' );

  var label = new ds.TextShape('label');
  label.addAttr( 'for', inputname );
  label.updateText( labeltext );
  label.setClass( styles.white );

  var input = new ds.TextInputShape( inputname );
  input.setClass( 'form-control' );
  input.addAttr( 'placeholder', placeholder );

  var small;
  if( helpText ){
    small = new ds.TextShape( 'small' );
    small.setClass( 'form-text', styles.whiteish );
    small.updateText( helpText );
  }

  group.appendShape( label );
  group.appendShape( input );
  if( small )
    group.appendShape( small );

  return group;

};

contactForm.prototype.createOptions = function(){

  var options = new ds.OptionShape( 'opciones', 'radio' );

     for (var i = 0; i < 2; i++ ) {

          options.addOption(
               'bleh'+1,
               'value'+1,
               'custom-control custom-radio ' + styles.white,
               'custom-control-input'
          );
     }
     options.setClass( 'form-group' );

     return options;

};

contactForm.prototype.onStart = function(){
  //console.log('started module');
  this.startedModuleAt = Date.now();
};

contactForm.prototype.onLoad = function(){
  //console.log('loaded module');
  this.endedModuleAt = Date.now();
  console.log( 'module loaded in', ( this.endedModuleAt - this.startedModuleAt ), 'ms' );
};

module.exports = contactForm;
