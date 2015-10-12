/**
    name => 礼物名称
    value = > 礼物价值
    img => 礼物路径
    tooltip => 礼物提示消息
 */
define([
    'backbone'
], function(Backbone) {
    'use strict';

    var Prize = Backbone.Model.extend({
        defaults: {
            name: '',
            value: '',
            img: '',
            tooltip: '',
            dynamicgift: '',
            showeffect: '',
            index: 0,

            ascription: 0
        }
    });

    return Prize;
});
