define([
    'jquery', 
    'underscore', 
    'backbone',
    'models/ktvModel'
], function($, _, Backbone, KtvModel) {
    'use strict';

    var HeaderView = Backbone.View.extend({

        el: '#ktv_header',

        events: {
            'click .my_thing': 'viewMyThing',
            'click .tool-min': 'onMin',
            'click .tool-zoom': 'onZoom',
            'click .tool-close': 'onClose'
        },

        initialize: function() {
            this.boundingBox = $(this.el);

        },

        render: function() {
            var template   = _.template($("#header-template").html());

            this.delegateEvent();

            this.boundingBox.prepend(template({
                nick: '',
                roomId: ''
            }));

            // webkitRequestAnimationFrame(this.run.bind(this));

            return this;
        },

        viewMyThing: function(event) {
            console.log(111)
        },

        delegateEvent: function(){
            this.listenTo(KtvModel, 'change:roomNotice1', this.changeRoomNotice);
            this.listenTo(KtvModel, 'change:userInfo', this.userInit);

        },

        userInit: function(data){
            var userInfo = data.changed.userInfo;

            this.$('.nick').text(userInfo.nick);
            this.$('.num').text(userInfo.uid);
        },

        // 改变房间公告
        changeRoomNotice: function(model){
            var roomNotice1 = model.changed.roomNotice1;

            this.$('.track-text').text('【房间公告】：'+roomNotice1);
        },

        //跑道动画
        run: function(){

            var left = parseInt(this.$('.track-text').css('left'));

            left = (left < (-this.$('.track-text').width())) ? this.$('.track').width() : (left -= 2);

            this.$('.track-text').css('left',left + 'px')
            // webkitRequestAnimationFrame(this.run.bind(this));
        },

        onMin: function(){
            Container && Container.showMinimized();
        },

        onZoom: function(event){
            var target = $(event.currentTarget);
            var status = target.data('status');

            if(status == 0) {
                target.data('status', 1).addClass('min');

                Container && Container.showNormal();
                Container && Container.setSize(1028,715);
            }else {
                target.data('status', 0).removeClass('min');
                Container && Container.showMaximized();

            }
        },

        onClose: function(){
            Container && Container.close();
        }

    });

    return HeaderView;
});