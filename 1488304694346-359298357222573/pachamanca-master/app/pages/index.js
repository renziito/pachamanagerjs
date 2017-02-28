var protoPage = require('../utils/protoPage.js');
var appShell = require('../modules/multishell/index.js');
var ds = require('domshaper');
var index = function() {
    //console.log(this)
    protoPage.call(this, arguments[0]);
    this.content = new ds.Shape(document.getElementsByTagName('body')[0]);
};
/*OOP herency*/
index.prototype = Object.create(protoPage.prototype);
index.prototype.contructor = index;
/*OOP herency*/
index.prototype.init = function() {
    var aShell = new appShell(this.router);
    aShell.activateModule();
    this.modules.push(aShell);
    aShell.build(null,null,null);
    this.content.appendShape(aShell.container);
    this.content.buildDom();
    this.content.render();
    this.launchEvent('close');
};
index.prototype.onLoad = function() {
    console.log('initial timer ', Date.now());
};
index.prototype.onClose = function() {
    console.log('final timer', Date.now());
};
module.exports = index;