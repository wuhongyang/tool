/**
    tip 
    path
    type
    id
    path2
 */
define([
    'backbone'
], function(Backbone) {
    'use strict';

    var Seal = Backbone.Model.extend({
        defaults: {
            tip: '',
            path: '',
            type: '',
            id: '',
            path2: '',
            ascription: ''
        }
    });

    return Seal;
});
