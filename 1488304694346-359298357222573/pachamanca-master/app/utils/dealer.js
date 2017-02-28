var Dealer = function(){
     //constructor
     this.channels = {};
};

Dealer.prototype.subscribe = function( context, channel, fn ){

     if (!this.channels[channel]) this.channels[channel] = [];
        this.channels[channel].push({ context: context, callback: fn });
        return this;

};

Dealer.prototype.publish = function( channel ){

     if (!this.channels[channel]) return false;
        var args = Array.prototype.slice.call(arguments, 1);
        for (var i = 0, l = this.channels[channel].length; i < l; i++) {
            var subscription = this.channels[channel][i];
            subscription.callback.apply(subscription.context, args);
        }
        return this;

};

Dealer.prototype.installTo = function( module ){

     module.publish = this.publish;
     module.subscribe = this.subscribe;

};

module.exports = Dealer;


/*
var Dealer = (function(){
    var subscribe = function(channel, fn){
        if (!Dealer.channels[channel]) Dealer.channels[channel] = [];
        Dealer.channels[channel].push({ context: this, callback: fn });
        return this;
    },

    publish = function(channel){
        if (!Dealer.channels[channel]) return false;
        var args = Array.prototype.slice.call(arguments, 1);
        for (var i = 0, l = Dealer.channels[channel].length; i < l; i++) {
            var subscription = Dealer.channels[channel][i];
            subscription.callback.apply(subscription.context, args);
        }
        return this;
    };

    return {
        channels: {},
        publish: publish,
        subscribe: subscribe,
        installTo: function(obj){
            obj.subscribe = subscribe;
            obj.publish = publish;
        }
    };

}());

*/
