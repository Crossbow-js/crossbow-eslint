var cli    = require("./index");
var crossbowCli = require('/Users/shakyshane/crossbow/crossbow-cli');
var del  = require('rimraf').sync;
var prom = require('prom-seq');

var task    = prom.create(cli.tasks);
var pk      = require("./package.json");

crossbowCli({input: ['watch']});

//var context = crossbowCli.ctx(pk);

//task('', context)
//    .then(function () {
//        console.log('Build complete');
//    }).done();