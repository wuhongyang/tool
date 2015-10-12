// 房间公告 用户输入 聊天信息板块集合
define([
    'backbone',
    'view/component/roomNoticeView',
    'view/component/chatInputView',
    'view/component/chatMessageView',
    'models/ktvModel'
], function(Backbone, RoomNoticeView, ChatInputView, ChatMessageView, KtvModel) {
    'use strict';

    var InteractionView = Backbone.View.extend({

        el: '.ktv-interaction-box',

        events: {
        },
        initialize: function() {

        },

        render: function() {
            this.renderUI();

            return this;
        },
        delegateEvent: function(){

        },
        renderUI: function(){
            var allViews = KtvModel.get('allViews');

            allViews.roomNoticeView = this.roomNoticeView = new RoomNoticeView().render();
            allViews.chatInputView = this.chatInputView = new ChatInputView().render();
            allViews.chatMessageView = this.chatMessageView = new ChatMessageView().render();

        }

    });

    return InteractionView;
});
