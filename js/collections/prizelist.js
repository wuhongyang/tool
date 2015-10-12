/*用户列表*/
define([
    'backbone',
    'models/prize'
], function(Backbone, Prize) {
    'use strict';

    var PrizeList = Backbone.Collection.extend({
        model: Prize,

    });

    return new PrizeList();
});
