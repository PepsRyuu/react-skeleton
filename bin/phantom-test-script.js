var page = require('webpage').create();
var system = require('system');
var fs = require('fs');
var port;

for (var i = 0; i < system.args.length; i++) {
    if (system.args[i].indexOf('--port=') === 0) {
        port = system.args[i].substring(7);
    }
}

page.onConsoleMessage = function (msg, lineNum, sourceId) {
    if (msg === '---TEST END---') {

        var fails = page.evaluate(function() {
            return window.ConsoleReporterResults.fails;
        });

        if (fails > 0) {
            phantom.exit(1);
        } else {
            var report = page.evaluate(function () {
                return window.__coverage__;
            });

            // Don't output source code for covered files since we don't need it.
            for (var file in report) {
                delete report[file].code;
            }

            fs.write('target/coverage.json', JSON.stringify(report), 'w');

            phantom.exit();
        }
        
    } else {
        console.log(msg);
    }
};

console.log('        Opening ' + 'http://127.0.0.1:' + port + '/test/\n');
page.open('http://127.0.0.1:' + port + '/test/', function(status) {
});