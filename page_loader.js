/**
 * Documentation: http://phantomjs.org/documentation/
 * Quick Start: http://phantomjs.org/quick-start.html
 * 
 */
"use strict";
var fs = require('fs');

/**
 * Execute onReady only after testFx condition is true, 
 * and check the condition every timeOutMillis.
 * 
 * @param testFx
 * @param onReady
 * @param timeOutMillis
 * @returns
 */
function waitFor(testFx, onReady, timeOutMillis) {
    var maxtimeOutMillis = timeOutMillis ? timeOutMillis : 3000, //< Default Max Timout is 3s
        start = new Date().getTime(),
        condition = false,
        interval = setInterval(function() {
            if ( (new Date().getTime() - start < maxtimeOutMillis) && !condition ) {
                // If not time-out yet and condition not yet fulfilled
                condition = (typeof(testFx) === "string" ? eval(testFx) : testFx()); //< defensive code
            } else {
                if(!condition) {
                    // If condition still not fulfilled (timeout but condition is 'false')
                    console.error("'waitFor()' timeout");
                }
                
                // Condition fulfilled (timeout and/or condition is 'true')
                //console.log("'waitFor()' finished in " + (new Date().getTime() - start) + "ms.");
                typeof(onReady) === "string" ? eval(onReady) : onReady(); //< Do what it's supposed to do once the condition is fulfilled
                clearInterval(interval); //< Stop this interval
            }
        }, 250); //< repeat check every 250ms
};

/**
 * Used to print error log on syserr
 */
console.error = function () {
    require("system").stderr.write(Array.prototype.join.call(arguments, ' ') + '\n');
};

var page = require('webpage').create(),
    system = require('system'),
    host = system.args[1];

if (system.args.length === 1) {
    console.log('Try to pass some args when invoking this script!');
} else {
    system.args.forEach(function (arg, i) {
        console.log(i + ': ' + arg);
    });
}
    
//page.viewportSize = { width: 900 };
page.paperSize = { 
    format: 'A4', 
    orientation: 'portrait', 
    margin: {
        top: '10mm',
        bottom: '10mm',
        left: '10mm',
        right: '10mm'
    }
};
page.paperSize = { width: '595px', height: '842px', margin: {
    top: '10mm',
    bottom: '10mm',
    left: '0',
    right: '0'
} };

page.onResourceRequested = function(requestData, request) {
    console.log('CONSOLE: loading', requestData['url']);  // this does get logged now
};

page.onConsoleMessage = function(msg, lineNum, sourceId) {
    console.log('CONSOLE: ' + msg + ' (from line #' + lineNum + ' in "' + sourceId + '")');
};

page.onError = function(msg, trace) {
    var msgStack = ['ERROR: ' + msg];

    if (trace && trace.length) {
    msgStack.push('TRACE:');
    trace.forEach(function(t) {
        msgStack.push(' -> ' + t.file + ': ' + t.line + (t.function ? ' (in function "' + t.function +'")' : ''));
    });
    }

    console.error(msgStack.join('\n'));
};

page.open(host, function(status) {
    page.evaluate(function() {
        var onLoadComplete = function(){
            window._finishedCall = true;
        }

        var elements = document.getElementsByTagName('aside');
        for (var i = 0; i < elements.length; i++) { 
            elements[i].parentNode.removeChild(elements[i]);
        }

        // stupid 11st right bar
        var _t = document.getElementById('wingBnr2');
        _t.parentNode.removeChild(_t);

        var maxh = 0;
        var id = setInterval(function(){
            if(maxh == document.body.scrollHeight) {
                clearInterval(id);
                onLoadComplete();
            };
            maxh = document.body.scrollHeight;
            window.scrollTo(0, document.body.scrollHeight);
        }, 1000);
    });
    
    waitFor(function check(){
        return page.evaluate(function(){
            return window._finishedCall;
        });
    }, function onReady(){
        var output = "/tmp/marketbest/output.html";
        output && fs.write(output, page.content, 'w');
    
        //page.render('/tmp/output.png');

        phantom.exit();
    }, 10000); // 20 seconds maximum timeout
});
