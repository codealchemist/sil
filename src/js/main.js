require.config({
    paths: {
        jquery: '../vendor/jquery/jquery',
        lodash: '../vendor/lodash/lodash.compat',
        'underscore.string': '../vendor/underscore.string/dist/underscore.string.min',
        tpl: '../vendor/requirejs-tpl/tpl',
        bootstrap: '../vendor/bootstrap/bootstrap',
        'bootstrap-slider': '../vendor/seiyria-bootstrap-slider/bootstrap-slider',
        text: '../vendor/requirejs-plugins/text',
        json: '../vendor/requirejs-plugins/json',
        templates: '../templates',
        data: '../data',
        soundmanager: '../vendor/soundmanager/script/soundmanager2-nodebug-jsmin',
        syllables: '../vendor/syllables/bundle'
    },
    shim: {
        'handlebars': {
            exports: 'Handlebars'
        },
        'bootstrap': {
            deps: ['jquery'],
            exports: 'bootstrap'
        },
        'bootstrap-slider': {
            deps: ['bootstrap'],
            exports: 'slider'
        },
        'soundmanager': {
            exports: 'soundManager'
        },
        'syllables': {
            exports: 'Syllables'
        }
    },
    waitSeconds: 30 //default = 7
});

require([
    'jquery',
    'app', 
    'bootstrap',
    'bootstrap-slider'
], function($, App) {
    'use strict';
    
    console.log('MAIN loaded');
    $('document').ready(function(){
        App.init();
    });
});
