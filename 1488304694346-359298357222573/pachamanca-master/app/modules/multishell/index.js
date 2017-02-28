var ds = require('domshaper');
var styles = require('./styles/index.css');
var protoModule = require('../../utils/protoModule.js');
var appShell = function(router) {
    protoModule.call(this);
    //added methods for mediation
    this.router = router;
    this.dealer = this.router.getLib('dealer');
    this.war = this.router.getLib('war');
    this.dealer.subscribe(this, 'changeTitleOnAnswer', this.magicTitle);
    this.container;
    //header group
    this.header;
    this.header_icon;
    this.header_title;
    //footer group
    this.footer;
    this.footer_list = [];
    //content group
    this.content;
};
/*OOP herency*/
appShell.prototype = Object.create(protoModule.prototype);
appShell.prototype.contructor = appShell;
/*OOP herency*/
appShell.prototype.init = function() {
    this.container = new ds.Shape('div', 'app-index');
    this.container.setClass('');
    this.initHeader(arguments[0]);
    this.initContent(arguments[1]);
    this.initFooter(arguments[2]);
    this.launchEvent('load');
};
appShell.prototype.initHeader = function(shapeToAppend) {
    if (shapeToAppend !== false) {
        this.header = new ds.Shape('nav', 'header');
        this.header.setClass('navbar navbar-light navbar-static-top bg-faded');
        if (shapeToAppend instanceof ds.Shape) {
            this.header = shapeToAppend;
            this.header_content = false;
        } else if (typeof shapeToAppend === 'string') {
            this.header_content = new ds.TextShape('a', 'header-title');
            this.header_content.updateText(shapeToAppend);
            this.header_content.setClass('navbar-brand');
        } else {
            this.header_content = new ds.TextShape('a', 'header-title');
            this.header_content.updateText('It Works, Pachamanca Works!!!!!');
            this.header_content.setClass('navbar-brand');
        }
        if (this.header_content instanceof ds.Shape) {
            this.header.appendShape(this.header_content);
        }
        this.container.appendShape(this.header);
    }
};
appShell.prototype.initFooter = function(shapeToAppend) {
    if (shapeToAppend !== false) {
        this.footer = new ds.Shape('footer');
        this.footer.setClass(styles.footer);
        if (shapeToAppend instanceof ds.Shape) {
            this.footer = shapeToAppend;
            this.footer_content = false;
        } else if (typeof shapeToAppend === 'string') {
            this.footer_content = new ds.TextShape('span');
            this.footer_content.updateText(shapeToAppend);
            this.footer_content.setClass('container text-muted');
        } else {
            this.footer_content = new ds.TextShape('span');
            this.footer_content.updateText('Copyright \u00A9 2017 - Pachamanca ');
            this.footer_content.setClass('container text-muted');
        }
        if (this.footer_content instanceof ds.Shape) {
            this.footer.appendShape(this.footer_content);
        }
        this.container.appendShape(this.footer);
    }
};
appShell.prototype.initContent = function(shapeToAppend) {
    this.content = new ds.Shape('div', 'main');
    if (shapeToAppend instanceof ds.Shape) {
        this.custom_content = shapeToAppend;
        this.content.appendShape(this.custom_content);
    } else if (typeof shapeToAppend === 'string') {
        this.content.setClass('container');
        this.title = new ds.TextShape('h1');
        this.title.updateText(shapeToAppend);
        this.title.setClass('container text-muted');
        this.content.appendShape(this.title)
    } else {
        this.content.setClass('container');
        this.title = new ds.TextShape('h1');
        this.congrats = new ds.TextShape('p');
        this.instruction = new ds.TextShape('p');
        this.title.updateText("Welcome to Pachamanca");
        this.congrats.updateText("Congratulations! You have successfully created");
        this.congrats.updateText(" your Pachamanca application", "append");
        this.instruction.updateText("You may change the content of this page ");
        this.instruction.updateText("by sending a Shapes o Text ", "append");
        this.instruction.updateText("in the init method <br>", "append");
        this.content.appendShape(new ds.TextShape('hr'));
        this.content.appendShape(this.title);
        this.content.appendShape(this.congrats);
        this.content.appendShape(this.instruction);
    }
    this.container.appendShape(this.content);
};
appShell.prototype.appendContent = function(module) {
    this.container.appendShape(module.container);
};
appShell.prototype.magicTitle = function(newtitle) {
    this.header_title.updateText(newtitle);
    this.header_title.render();
};
appShell.prototype.onLoad = function() {
    this.url = "http://api.giphy.com/v1/gifs/random?tag=win&api_key=dc6zaTOxFJmzC";
    var c = this.war.confConnection(this.url);
    this.war.GET(c.id);
    c.response = function(data) {
        var dato = JSON.parse(data);
        var div = new ds.Shape('div');
        var img = new ds.ImageShape(dato.data.image_url);
        div.setClass('text-center');
        div.appendShape(img);
        this.content.appendShape(div);
        this.content.buildDom();
        //this.content.render();
    }.bind(this);
    console.log('loaded module');
}
appShell.prototype.onStart = function() {
    console.log('start module');
};
module.exports = appShell;