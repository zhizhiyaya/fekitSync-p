var fekitSync = require('./fekitSync.js');

function start() {

    var commandStr = process.argv[2] || '';
    var dev = process.argv[3] || '';

    switch (commandStr) {

        case '-p':
            fekitSync.setDevHosts(dev);
            break;

        default:
            fekitSync.start();
    }
};

start();

