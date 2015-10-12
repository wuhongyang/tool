/*印章列表*/
define([
    'backbone',
    'models/seal'
], function(Backbone, Seal) {
    'use strict';

    var SealList = Backbone.Collection.extend({
        model: Seal,

    });

    return new SealList();
});
