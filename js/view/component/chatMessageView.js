// 用户交互信息显示
define([
    'backbone',
    'collections/userlist',
    'models/ktvModel'
], function(Backbone, UserList, KtvModel) {
    'use strict';

    var ChatMessageView = Backbone.View.extend({

        el: '.ktv-chat-message',
        options:{
            colorBars :{}
        },
        chatMsgTemplate: _.template('<li class="list"><span>（<%= time %>）&nbsp;</span><span class="se-user"><a href="#" class="chatUser" style="text-decoration: none" uin="<%= srcUin %>" >[<% print(srcNick) %>]</a></span>对'+
            '<span class="re-user"><a href="#" class="chatUser" style="text-decoration: none" uin="<%= destUin %>" >[<% print(destNick) %>]</a></span>说:'+
            '<span class="msg"><% print(msg) %></span></li>'),

        goodMsgTemplate: _.template('<li class="list"><span class="time">(<%= time %>)</span><span class="se-user"><a href="#" class="chatUser" style="text-decoration: none" uin="<%= uin %>" >[<%= srcnick %>]</a></span>送给'+
            '<span class="re-user"><a href="#" class="chatUser" style="text-decoration: none" uin="<%= actuin %>" >[<%= actnick %>]</a></span><%= num %><%= goodsTypeName %><%= goodsname %>'+
            '<img src="<%= img %>" width="60" height="60">,共<span class="count"><%= num %><%= goodsTypeName %></span></li>'),
        colorBarTemplate:_.template('<div>（<%= time %>）&nbsp;<span><a href="#" class="chatUser" style="text-decoration: none" uin="<%= srcUin %>" ><%= srcNick %>(<%= srcUin %>)</a></span><span>对</span><a href="#" uin="<%= desUin %>"class="chatUser" style="text-decoration: none"><%= desNick %>(<%= desUin %>)</a><span>说:&nbsp;</span><%= html %></div>'),

        events: {
            'click .chatUser':'userClick'
        },

        initialize: function() {
            this.infoUl = this.$('.info-ul');

            this.delegateEvent();
        },

        render: function() {
            this.scrollBottom();

            return this;
        },

        // 分发事件
        delegateEvent: function(){

        },
        /**
         * 公聊区信息显示
         * @param data
         */
        showMsg:function(tempString,data){
            var listNode = this[tempString+"Template"](data);
            this.infoUl.append(listNode);
            this.scrollBottom();
        },

        //点击用户通信
        userClick:function(event){
            var target = $(event.currentTarget),uin=target.attr("uin");
            var userInfo = UserList.findWhere ({uid:parseInt(uin)});
            KtvModel.get("allViews").chatInputView.addChatUser(userInfo);
            KtvModel.get("allViews").prizeView.showReceiveUser(userInfo);
        },
        /**
         * scrollBottom 滚动到最底部
         */
        scrollBottom: function(){
            var top = this.$el[0].scrollHeight;

            this.$el[0].scrollTop = top;
        }

    });

    return ChatMessageView;
});
