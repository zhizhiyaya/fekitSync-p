var spawn  = require('child_process').spawn;
var fs = require("fs"),
    workPath = process.cwd();
var exec = require('child_process').exec;

module.exports = {
    start: function () {
        //exec('fekit pack && fekit sync', function(error, stdout, stderr) {
        //    console.log('stdout: ' + stdout);
        //    console.log('stderr: ' + stderr);
        //    if (error !== null) {
        //        console.log('exec error: ' + error);
        //    }
        //});
        var pack = spawn('fekit', ['pack'], {
            cwd: workPath,
            env: process.env
        });
        pack.stdout.on('data', function (data) {
            console.log('stdout: ' + data);
        });

        pack.stderr.on('data', function (data) {
            console.log('stderr: ' + data);
        });

        pack.on('close', function (code) {
            console.log('sync success');
        });

        var sync = spawn('fekit', ['sync'], {
            cwd: workPath,
            env: process.env
        });

        sync.stdout.on('data', function (data) {
            console.log('stdout: ' + data);
        });

        sync.stderr.on('data', function (data) {
            console.log('stderr: ' + data);
        });

        sync.on('close', function (code) {
            console.log('sync success');
        });
    },
    setDevHosts: function (devHosts) {
        if (!isNaN(devHosts) && devHosts < 10) {

            var text = fs.readFileSync('.dev', "utf8");
            var dev = JSON.parse(text).dev;
            dev.host = dev.host.slice(0, -1) + devHosts;
            fs.writeFileSync('.dev', JSON.stringify({'dev': dev}), 'utf8');
            console.log('.dev')
            this.start();
        }
    }
};
