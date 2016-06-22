var qSync = require('./qSync.js');

function start() {

    var commandStr = process.argv[2] || '';
    var dev = process.argv[3] || '';

    switch (commandStr) {

        case '-p':
            qSync.setDevHosts(dev);
            break;
        case '-h':
            console.log('');
            process.exit(0);
        case '-v':
            console.log('version is 1.0.0');
            process.exit(0);
        default:
            qSync.start();
    }
};

start();

