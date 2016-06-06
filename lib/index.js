#!/usr/bin/env node

var program = require('commander');
var request = require('request');
var chalk = require('chalk');
var spawn  = require('child_process').spawn;
var fs = require("fs"),
    workPath = process.cwd();


program
    .version('0.0.1')
    .usage('[options] <keywords>')
    //.option('-o, --owner [name]', 'Filter by the repositories owner')
    //.option('-l, --language [language]', 'Filter by the repositories language')
    //.option('-f, --full', 'Full output without any styling')
    .option('-p, --pointDev [point dev machine]', 'point dev machine')
    .parse(process.argv);
console.log(process.argv);

var run = function (obj) {

    var fekitArgs = Array.prototype.slice.call(program.args, 3);
    //console.log(JSON.stringify(obj));
    spawn('fekit', ['sync'].concat(fekitArgs), {
        cwd: workPath,
        env: process.env
    });

    if(obj[0] === '-v'){
        console.log('version is 1.0.0');
    }else if(obj[0] === '-h'){
        console.log('Useage:');
        console.log('  -v --version [show version]');
    }else{
        //fs.readdir(path, function(err, files){
        //    if(err){
        //        return console.log(err);
        //    }
        //    for(var i = 0; i < files.length; i += 1){
        //        console.log(files[i]);
        //    }
        //});
        var text = fs.readFileSync('.dev', "utf8");

        var dev = JSON.parse(text).dev;
        console.log(dev.host)
        process.exit(0);
    }
};
//获取除第一个命令以后的参数，使用空格拆分
run(process.argv.slice(2));


//if(!program.args.length) {
//    program.help();
//} else {
//    var keywords = program.args;
//    var url = 'https://api.github.com/search/repositories?  sort=stars&order=desc&q='+keywords;
//
//    request({
//        method: 'GET',
//        headers: {
//            'User-Agent': 'yourGithubUsername'
//        },
//        url: url
//    }, function(error, response, body) {
//
//        if (!error && response.statusCode == 200) {
//            var body = JSON.parse(body);
//            if(program.full) {
//                console.log(body);
//            } else {
//                for(var i = 0; i < body.items.length; i++) {
//                    console.log(chalk.cyan.bold('Name: ' + body.items[i].name));
//                    console.log(chalk.magenta.bold('Owner: ' + body.items[i].owner.login));
//                    console.log(chalk.grey('Desc: ' + body.items[i].description + '\n'));
//                    console.log(chalk.grey('Clone url: ' + body.items[i].clone_url + '\n'));
//                }
//                process.exit(0);
//            }
//        } else if (error) {
//            console.log(chalk.red('Error: ' + error));
//            process.exit(1);
//        }
//    });
//}
//
