'use strict';
var path                = require("path"),
    loaderUtils         = require('loader-utils'),
    assign              = require('object-assign'),
    riotCompiler        = require('riot-compiler');

var setParsers = function(configPath){
    var configObj           = {},
        availableOptsName   = [
            'compact',
            'whitespace',
            'expr',
            'type',
            'template'
            //'parser' to process in a different
        ],
        availableOpts       = {},
        parsers             = {};

    try{
        configObj = require(configPath);

        availableOptsName.forEach(function(optsName) {
            if(configObj[optsName] != null){
                availableOpts[optsName] = configObj[optsName];
            }
        });

        //Processing of the parser
        if(configObj.parsers != null){
            parsers = {};
            Object.keys(configObj.parsers).forEach(function(x) {
                if(/js|css|html/.test(x)){
                    Object.keys(configObj.parsers[x]).forEach(function(y) {
                        parsers[x][y] = configObj.parsers[x][y];
                    });
                }
                else{
                    emitWarning('It is only js,css,html that I can have a parser');
                }
            });
            availableOpts.parsers = parsers;
        }
        return availableOpts;
    }
    catch(e){
        emitWarning('wrong config path')
    }
};

var compiler = function(src,opts){
    try{
        return riotCompiler.compile(src,opts);

    }
    catch (e) {
        if(e instanceof Error){
            throw e;
        }else{
            throw new Error(e);
        }
    }
};

module.exports = function(src) {
    var loaderOpts  = loaderUtils.parseQuery(this.query),
        opts        = {},
        configPath  = '';

    if (this.cacheable) this.cacheable();

    if(loaderOpts.config != null){
        configPath = path.resolve(loaderOpts.config);
        delete loaderOpts.config;
        opts = assign({},setParsers(configPath),loaderOpts);
    }
    else{
        opts = assign({},loaderOpts);
    }

    return compiler(src,opts);
};
