var event = function(){

  this.eventCallbacks = {};

};

event.prototype.on = function( eventName, callback ){

  this.eventCallbacks[ eventName ] = callback;

};

event.prototype.dispatchEvent = function( eventName ){

  //console.log(this.eventCallbacks)
  if( eventName !== '' && typeof eventName === 'string' )
    this.eventCallbacks[ eventName ]();
  else {
    throw 'event name should be a string';
  }

};

//event.prototype.addEventListener = function(){};


module.exports = event;
