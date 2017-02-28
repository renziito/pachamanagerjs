var protoPage = require('../utils/protoPage.js');
var appShell = require('../modules/imageshell/index.js');
var contactForm = require('../modules/contactform/index.js');
var ds = require('domshaper');
var index = function() {
    //console.log(this)
    protoPage.call(this, arguments[0]);
    this.content = new ds.Shape(document.getElementsByTagName('body')[0]);
    this.startedModuleAt = 0;
    this.endedModuleAt = 0;
    //little trick >:)
    var html = new ds.Shape(document.getElementsByTagName('html')[0]);
    html.domElement.style.width = '100%';
    html.domElement.style.height = '100%';
};
/*OOP herency*/
index.prototype = Object.create(protoPage.prototype);
index.prototype.contructor = index;
/*OOP herency*/
index.prototype.init = function() {
    var addingpoint = this.addShellModule();
    this.addContactFormModule(addingpoint);
    this.content.buildDom();
    this.content.render();
    this.content.domElement.style.width = '100%';
    this.content.domElement.style.height = '100%';
    this.launchEvent('close');
};
index.prototype.addContactFormModule = function(moduleshape) {
    var cf = new contactForm(this.router);
    cf.activateModule();
    this.modules.push(cf);
    cf.build();
    moduleshape.appendShape(cf.container);
};
index.prototype.addShellModule = function() {
    var aShell = new appShell(this.router);
    aShell.activateModule();
    this.modules.push(aShell);
    aShell.build();
    this.content.appendShape(aShell.container);
    return aShell.bg;
};
index.prototype.onLoad = function() {
    //console.log( 'initial timer', Date.now() );
};
index.prototype.onClose = function() {
    //console.log( 'final timer', Date.now() );
};
index.prototype.onLoad = function() {
    //console.log('started modulec');
    this.startedModuleAt = Date.now();
};
index.prototype.onClose = function() {
    //console.log('loaded module');
    this.endedModuleAt = Date.now();
    console.log('this page loaded in', (this.endedModuleAt - this.startedModuleAt), 'ms');
};
module.exports = index;