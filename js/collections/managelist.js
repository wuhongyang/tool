/*用户列表*/
define([
    'underscore',
    'backbone',
    'models/user'
], function(_, Backbone, User) {
    'use strict';

    var ManageList = Backbone.Collection.extend({
        model: User,

        // 按order逆序排序
        comparator: function (model) {
            return -model.get('order');
        }
    });

    return new ManageList();
});
