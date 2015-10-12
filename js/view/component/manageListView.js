define([
    'backbone',
    'view/component/baserListView'
], function(Backbone, BaseListView) {
    'use strict';

    var ManageListView = BaseListView.extend({

        el: '.manage-list-box',

        events: {
        },
        initialize: function() {
            var instance = this;
            
            // 调用父类initialize方法
            BaseListView.prototype.initialize.call(this);

            // 手动将父类的events添加到子类中
            _.extend(this.events, BaseListView.prototype.events);
        },

        render: function() {
            // 调用父类render方法
            BaseListView.prototype.render.call(this);
            
            return this;            
        }
    });

    return ManageListView;
});
