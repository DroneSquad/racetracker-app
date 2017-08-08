'use strict';

const exec = require('child_process').exec;
const animateProgress = require('./helpers/progress');
const addCheckMark = require('./helpers/checkmark');
const readline = require('readline');

process.stdin.resume();
process.stdin.setEncoding('utf8');

process.stdout.write('\n');
let interval = animateProgress('Configuring repository');
process.stdout.write('Configuring repository');

configRepo(function () {
    clearInterval(interval);
    process.stdout.write('\nInstalling dependencies');
    setTimeout(function () {
        readline.cursorTo(process.stdout, 0);
        interval = animateProgress('Installing dependencies');
    }, 500);
    installDeps();
});

/**
 * update the .gitkeep file to assume unchanged
 */
function configRepo(callback) {
    exec('git update-index --assume-unchanged build/.gitkeep', addCheckMark.bind(null, callback));
}

/**
 * install react dependencies
 */
function installDeps() {
    exec('node --version', function (err, stdout, stderr) {
        const nodeVersion = stdout && parseFloat(stdout.substring(1));
        if (nodeVersion < 5 || err) {
            installDepsCallback(err || 'Unsupported node.js version, make sure you have the latest version installed.');
        } else {
            exec('yarn --version', function (err, stdout, stderr) {
                if (parseFloat(stdout) < 0.15 || err || process.env.USE_YARN === 'false') {
                    exec('npm install', addCheckMark.bind(null, installDepsCallback));
                } else {
                    exec('yarn install', addCheckMark.bind(null, installDepsCallback));
                }
            });
        }
    });
}

/**
 * callback function after installing dependencies
 */
function installDepsCallback(error) {
    clearInterval(interval);
    if (error) {
        process.stderr.write(error);
        process.stdout.write('\n');
        process.exit(1);
    }

    clearInterval(interval);
    process.stdout.write('\nInstalling cordova');
    setTimeout(function () {
        readline.cursorTo(process.stdout, 0);
        interval = animateProgress('Installing cordova');
    }, 500);
    installCordovaDeps();
}

/**
 * install cordova dependencies
 */
function installCordovaDeps() {
    process.chdir('cordova');
    exec('node --version', function (err, stdout, stderr) {
        const nodeVersion = stdout && parseFloat(stdout.substring(1));
        if (nodeVersion < 5 || err) {
            installDepsCallback(err || 'Unsupported node.js version, make sure you have the latest version installed.');
        } else {
            exec('yarn --version', function (err, stdout, stderr) {
                if (parseFloat(stdout) < 0.15 || err || process.env.USE_YARN === 'false') {
                    exec('npm install', addCheckMark.bind(null, installCordovaDepsCallback));
                } else {
                    exec('yarn install', addCheckMark.bind(null, installCordovaDepsCallback));
                }
            });
        }
    });
}


/**
 * callback function after installing cordova
 */
function installCordovaDepsCallback(error) {
    clearInterval(interval);
    process.stdout.write('\n');
    if (error) {
        process.stderr.write(error);
        process.stdout.write('\n');
        process.exit(1);
    }

    clearInterval(interval);
    process.stdout.write('\nDone!');
    process.exit(0);
}
