var express = require('express');
var execSync = require('child_process').execSync;
var http = require('http');
var path = require('path');

function startServer () {
    var app = express();
    app.use('/', express.static(__dirname + '/../target'));
    app.use('/', express.static(__dirname + '/../'));

    var server = http.createServer(app);
    server.on('error', _listen);
    _listen();

    function _listen() {
        var port = Math.floor(Math.random() * 50000);
        server.listen(port, function () {
            console.log('\n  Listening on port ' + port + '...\n');
            executeTests(port);
        });
    }
}

function executeTests(port) {
    var phantom = require('phantomjs-prebuilt');
    console.log('PhantomJS: ' + phantom.version);

    var program = phantom.exec('/bin/phantom-test-script.js', '--port=' + port);
    program.stdout.pipe(process.stdout);
    program.stderr.pipe(process.stderr);
    program.on('exit', code => {
        if (code === 0) {
            var istanbulPath = path.resolve(__dirname, '../node_modules/.bin/istanbul');
            execSync(istanbulPath + ' report --include target/coverage.json lcovonly cobertura --dir target');
        }
        process.exit(code);
    });
}

startServer();