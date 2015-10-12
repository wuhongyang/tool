define([
    'backbone'
], function(Backbone) {
    'use strict';

    var NoticeBoardView = Backbone.View.extend({

        el: '.ktv-notice-board',

        events: {
        },

        initialize: function() {
            this.delegateEvent();
        },

        render: function() {       
            // var noticeList   = $("#aisde-notice-list-template").html();
            // var temp_li = Handlebars.compile(noticeList);

            // this.$el.append(temp_li());

            return this;            
        },

        delegateEvent: function(){
            this.on('show-broadcast', this.showBroadcast);
            
        },

        /**
         * showBroadcast 显示广播信息
         * @param  {Object} broadcastInfo 广播信息
         */
        showBroadcast: function(broadcastInfo){
            var template = _.template($("#aisde-notice-list-template").html());

            this.$el.append(template(broadcastInfo));
        }

    });

    return NoticeBoardView;
});
