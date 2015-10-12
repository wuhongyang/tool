/*用户列表*/
define([
    'underscore',
    'backbone',
    'models/user'
], function(_, Backbone, User) {
    'use strict';

    var OtherServerList = Backbone.Collection.extend({
        model: User
    });

    return new OtherServerList();
});
