#!/usr/bin/env node

var program = require('commander');
var fs = require('fs');
var promptly = require('promptly');
var ASCII_ART = `--------------------------------------------------------------
  _____           _                                           
 |  __ \\         | |                                          
 | |__) |_ _  ___| |__   __ _ _ __ ___   __ _ _ __   ___ __ _ 
 |  ___/ _\` |/ __| '_ \\ / _\` | '_ \` _ \\ / _\` | '_ \\ / __/ _\` |
 | |  | (_| | (__| | | | (_| | | | | | | (_| | | | | (__|(_| |
 |_|   \\__,_|\\___|_| |_|\\__,_|_| |_| |_|\\__,_|_| |_|\\___\\__,_|
--------------------------------------------------------------
 \n`;
var hr = "-------------------------------------------------------------"
var current_dir = __dirname;
var current_dir_string = 'Current Directory : ' + current_dir
var main_opt = "\n1. Create new Pachamanca Application \n2. Select an existing Pachamanca Application \n3. Exit the awesome Pachamanager\n"
var sec_opt = "\n1. Create a brand new page \n2. Create a brand new module \n3. Back to Main Menu \n4. Exit the awesome Pachamanager\n"
init();

function init() {
    promptly.choose(ASCII_ART + current_dir_string + main_opt + hr + '\n>>', [1, 2, 3], function(err, value) {
        switch (value) {
            case 1:
                newPachamanca();
                break;
            case 2:
                second();
                break;
            case 3:
                goodBye();
                break;
        }
    });
}

function second() {
    promptly.prompt('Insert the current path of the project (absolute path needed): \n>>', function(err, route) {
        var path = route + (route.slice(-1) == '/' ? '' : '/');
        existingPachamanca(path);
    });
}

function existingPachamanca(path) {
    console.log('\nTrying to use [' + path + ']');
    fs.exists(path, function(exists) {
        if (!exists) {
            console.error("Path does not exists!!!!!!!!!!");
            second();
        } else {
            if (validatePachamanca(path)) {
                promptly.choose(sec_opt + hr + '\n>>', [1, 2, 3, 4], function(err, value) {
                    switch (value) {
                        case 1:
                            newPage(path);
                            break;
                        case 2:
                            newModule(path);
                            break;
                        case 3:
                            init();
                            break;
                        case 4:
                            goodBye();
                            break;
                    }
                });
            } else {
                console.error("Not a Valid Pachamanca Application!!!!!!!!!!");
                second();
            }
        }
    });
}

function goodBye() {
    console.log("Goodbye! =D See you soon");
    process.exit();
}

function newPachamanca() {
    var title = "Indicate the absolute path where we're gonna deploy your new pachamanca application\n";
    promptly.prompt(title + 'New project path: ', function(err, route) {
        var path = route + (route.slice(-1) == '/' ? '' : '/');
        console.log('\nTrying to use [' + path + ']');
        fs.exists(path, function(exists) {
            if (!exists) {
                promptly.confirm('No such directory, Want us to create it? [Y/N] \n>>', function(err, value) {
                    if (value == false) {
                        init();
                    } else {
                        fs.mkdir(path, 0777, function(err) {
                            if (err) {
                                console.log("Something happen, please try again or elevate your ki");
                            }
                        });
                        getPachamanca(path);
                    }
                });
            } else {
                getPachamanca(path);
            }
        });
    });
}

function getPachamanca(path) {
    var text = "Sure that you want us to deploy a Pachapp on ";
    promptly.confirm(text + path + '? [Y/N] \n>>', function(err, value) {
        if (value == false) {
            init();
        } else {
            var URL = "https://github.com/j0t3x/pachamanca.git",
                ghdownload = require('github-download'),
                exec = require('child_process').exec;
            ghdownload(URL, path).on('dir', function(dir) {}).on('end', function() {
                var actualLoc = __dirname;
                console.log(hr);
                console.log(">Downloading and Initializating your Pachamanca Application");
                console.log(">>This may take a while, sit back and relax");
                console.log(">>>Don't close this terminal until We tell you to");
                exec('cd ' + path + ' && npm install && cd ' + actualLoc, (error, stdout, stderr) => {
                    if (error) {
                        console.log(`Oops something happen, please try again \n ${error}`);
                        return;
                    }
                }).on('close', function() {
                    console.log(hr);
                    console.log("Okey.... Your Pachamanca application is ready to use");
                    console.log("Just go to" + path + " and npm start it!");
                    var text = "Maybe, wanna create new pages and modules?";
                    promptly.confirm(text + '? [Y/N] \n>>', function(err, value) {
                        if (value == false) {
                            goodBye();
                        } else {
                            existingPachamanca(path);
                        }
                    });
                }).on('error', function(err) {
                    console.log(`Oops something happen, please try again \n ${err}`);
                });
            });
        }
    });
}

function validatePachamanca(path) {
    var package = require(path + 'package.json');
    if (typeof package.framework != "undefined" && package.framework == "pachamanca") {
        return true;
    } else {
        return false;
    }
}

function newPage(path) {
    promptly.prompt('Insert the name of new page (please something cool): \n>>', function(err, page) {
        var pathPage = path + "app/pages/" + page + '.js';
        fs.exists(pathPage, function(exists) {
            if (!exists) {
                getPage(path, pathPage, page);
            } else {
                console.error("That pages's name is already in use .. in your own proyect!!!");
                newModule(path);
            }
        });
    });
}

function newModule(path) {
    promptly.prompt('Insert the name of new module (please something cool): \n>>', function(err, module) {
        var pathModule = path + "app/modules/" + module + '/';
        fs.exists(pathModule, function(exists) {
            if (!exists) {
                fs.mkdir(pathModule, 0777, function(err) {
                    if (err) {
                        console.log("Something happen, please try again or elevate your ki");
                    }
                    getModule(path,pathModule, module);
                });
            } else {
                console.error("That module's name is already in use .. in your own proyect!!!");
                newModule(path);
            }
        });
    });
}

function getModule(path,pathModule, module) {
    var request = require('request');
    var urlModule = "https://raw.githubusercontent.com/j0t3x/pachamanca/master/app/modules/multishell/index.js";
    var file = fs.createWriteStream(pathModule + 'index.js');
    request({
        url: urlModule,
        json: true
    }, function(error, response, body) {
        if (!error && response.statusCode === 200) {
            fs.writeFile(pathModule + 'index.js', body, function(err) {
                if (err) {
                    console.log(`Oops something happen, please try again \n ${err}`);
                }
                console.log(hr);
                console.log("Awesome module " + module + " created succesfully");
                console.log(hr);
                existingPachamanca(path);
            });
        }
    })
}

function getPage(path, pathPage, page) {
    var request = require('request');
    var urlPage = "http://raw.githubusercontent.com/j0t3x/pachamanca/master/app/pages/index.js";
    request({
        url: urlPage,
        json: true
    }, function(error, response, body) {
        if (!error && response.statusCode === 200) {
            var res = body.split('index.prototype').join(page + '.prototype');
            res = res.replace('index = function()', page + ' = function()');
            res = res.replace('exports = index', 'exports = ' + page);
            res = res.replace('constructor = index', 'constructor = ' + page);
            res = res.replace('contructor = index', 'contructor = ' + page);
            fs.writeFile(pathPage, res, function(err) {
                if (err) {
                    console.log(`Oops something happen, please try again \n ${err}`);
                }
                var route = {
                    "name": page,
                    "route": "/" + page,
                    "path": "./pages/" + page + ".js"
                };
                var routesFile = fs.readFileSync(path + 'app/routes.json');
                var routes = JSON.parse(routesFile);
                routes.push(route);
                var routesJSON = JSON.stringify(routes);
                fs.writeFileSync(path + 'app/routes.json', routesJSON);
                console.log(hr);
                console.log("Awesome page " + page + " created succesfully");
                console.log(hr);
                existingPachamanca(path);
            });
        }
    })
}