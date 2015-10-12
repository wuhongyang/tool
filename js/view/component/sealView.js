/**
 * Created with JetBrains WebStorm.
 * User: why
 * Date: 14-4-29
 * Time: 下午3:57
 * To change this template use File | Settings | File Templates.
 */
//字体设置
define([
    'backbone',
    'collections/seallist'
], function(Backbone, SealList) {
    'use strict';

    var SealView = Backbone.View.extend({
        el: '#seal-box',
        events: {

        },
        initialize: function() {
            console.log(SealList)
            this.listenTo(SealList, 'reset', this.initSeal);
        },
        render: function() {
            return this;
        },
        initSeal:function(data){
            console.log(data);
            data.each(function(seal){

            });
        }
    });
    return SealView;
});

