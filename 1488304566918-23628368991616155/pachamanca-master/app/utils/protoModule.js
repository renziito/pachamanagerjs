var event = require('./event.js');
var protoModule = function() {
    event.call(this);
    this.events = {};
    this.root;
    this.flagIsModuleActive = false;
};
/*OOP herency*/
protoModule.prototype = Object.create(event.prototype);
protoModule.prototype.contructor = protoModule;
/*OOP herency*/
protoModule.prototype.activateModule = function() {
    this.flagIsModuleActive = true;
};
protoModule.prototype.deactivateModule = function() {
    this.flagIsModuleActive = false;
};
protoModule.prototype.build = function() {
    if (this.flagIsModuleActive) {
        this.setEvents();
        //console.log( this.eventCallbacks )
        this.launchEvent('start');
        this._init(arguments[0]);
    } else {
        //do nothing, this module shouldnt even load
        return;
    }
};
protoModule.prototype._init = function() {
    this.init(arguments[0]);
};
protoModule.prototype.init = function() {};
protoModule.prototype.setEvents = function() {
    this.on('start', this._onStart.bind(this));
    this.on('load', this._onLoad.bind(this));
};
protoModule.prototype.launchEvent = function(name) {
    if (name !== '' && typeof name === 'string') this.dispatchEvent(name);
    else {
        throw 'event name should be a string';
    }
};
protoModule.prototype._onStart = function() {
    this.onStart(arguments);
};
protoModule.prototype._onLoad = function() {
    this.onLoad(arguments);
};
protoModule.prototype.onStart = function() {};
protoModule.prototype.onLoad = function() {};
module.exports = protoModule;