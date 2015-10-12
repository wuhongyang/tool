/**
            uin => 链接服务id,
            webmanager => 链接
            name => 名称
 */
define([
    'backbone'
], function(Backbone) {
    'use strict';

    var OtherServer = Backbone.Model.extend({
        defaults: {
            uin: 0,
            webmanager: '',
            name: ''
        }
    });

    return OtherServer;
});
