'use strict';

var Container = window.Container;

require.config({
    shim: {
        'jquery': {
            exports: '$'
        },
        'underscore': {
            exports: '_'
        },
        'backbone': {
            deps: [
                'underscore',
                'jquery'
            ],
            exports: 'Backbone'
        },
        'handlebars': {
            exports: 'Handlebars'
        },
        'boia': {

        },
        'bootstrap': {
            deps: ['jquery']
        }
    },
    paths: { 
        jquery: '../bower_components/jquery/jquery',
        underscore: '../bower_components/underscore/underscore',
        backbone: '../bower_components/backbone/backbone',
        handlebars: '../bower_components/handlebars/handlebars',
        bootstrap: '../bower_components/bootstrap/bootstrap'
    }
});

require(['view/ktvView', 'models/ktvModel','boia'], function(KtvView, KtvModel) {
    var allViews = KtvModel.get('allViews');

    allViews.ktvView = new KtvView({
        model: KtvModel
    }).render();

});
