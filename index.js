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
var main_opt = "\n\n1. Create new Pachamanca Application \n2. Select an existing Pachamanca Application \n3. Exit the awesome Pachamanager\n"
init();

function init() {
    promptly.choose(ASCII_ART + current_dir_string + main_opt + hr + '\n>>', [1, 2, 3], function(err, value) {
        switch (value) {
            case 1:
                newPachamanca();
                break;
            case 2:
                existingPachamanca();
                break;
            case 3:
                goodBye();
                break;
        }
    });
}

function goodBye() {
    console.log("Goodbye! =D See you soon");
    process.exit();
}

function newPachamanca() {
    var title = "Indicate the absolute path where we're gonna deploy your new pachamanca application\n";
    promptly.prompt(title + 'New project path: ', function(err, path) {
        console.log('Trying to use [' + path + ']');
        fs.access(path, fs.constants.F_OK, (error) => {
            if (error) {
                promptly.confirm('No such directory, Want us to create it? [Y/N] \n >>', function(err, value) {
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
                fs.access(path, fs.constants.R_OK | fs.constants.W_OK, (error) => {
                    if (error) {
                        console.log("Error, no priviliges of writing or reading, please try again with another path or elevate your ki");
                    } else {
                        getPachamanca(path);
                    }
                });
            }
        });
    });
}

function getPachamanca(path) {
    var text = "Sure that you want us to deploy a Pachapp on ";
    promptly.confirm(text + path + '? [Y/N] \n >>', function(err, value) {
        if (value == false) {
            init();
        } else {
            downloadPachamanca(path)
        }
    });
}

function downloadPachamanca(path) {
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
            finishPachamanca(path);
        }).on('error', function(err) {
        	console.log(`Oops something happen, please try again`);
            console.log(err);
        });
    });
}

function finishPachamanca(path) {
    console.log(hr);
    console.log("Okey.... Your Pachamanca application is ready to use");
    console.log("Just go to" + path + " and npm start it!");
    var text = "Maybe, you want us to start your application now"
    promptly.confirm(text + '? [Y/N] \n >>', function(err, value) {
        if (value == false) {
            init();
        } else {
            var exec = require('child_process').exec;
            console.log(hr);
            console.log("Your Pachamanca application is runnin on localhost:8181 by default");
            console.log("We strongly recommend that close pachamanager and run the app on your own");
            exec('cd ' + path + ' && npm start', (error, stdout, stderr) => {
                if (error) {
                    console.log(`Oops something happen, please try again \n ${error}`);
                    return;
                }
            });
        }
    });
}