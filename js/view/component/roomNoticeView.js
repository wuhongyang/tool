// 房间公告
define([
    'backbone',
    'collections/userlist',
    'models/ktvModel'
], function(Backbone, UserList, KtvModel) {
    'use strict';

    var RoomNoticeView = Backbone.View.extend({

        el: '.notice-box',

        systemSimpleTemplate: _.template('<div class="list"><span class="time">(<%= time %>)</span><span class="msg">【系统消息：<%= msg %>】</span></div>'),
        privateChatTemplate: _.template('<div class="list"><span class="time">(<%= time %>)</span><span class="se-user">[<%= srcNick %>]</span>对'+
                                    '<span class="re-user">[<%= destNick %>]</span>说:<span class="msg"><%= msg %></span></div>'),
        goodsTemplate: _.template('<div class="list"><span class="time">(<%= time %>)</span><span class="msg">【系统消息：'+
                                    '<span class="se-user"><a href="#" class="chatUser" style="text-decoration: none" uin="<%= uin %>" >[<%= srcnick %>]</a></span>赠送给<span class="re-user"><a href="#" class="chatUser" style="text-decoration: none" uin="<%= actuin %>" >[<%= actnick %>]</a></span>'+
                                    '<span class="count"><%= num %><%= goodsTypeName %><%= goodsname %></span>】</span></div>'),
        userEnterTemplate: _.template('<div class="list"><span class="time">(<%= time %>)</span><span class="msg">【系统消息：欢迎'+
                                            '<%= roleName %><span class="nick"><a href="#" class="chatUser" style="text-decoration: none" uin="<%= uid %>" ><%= nick %>(<%= uid %>)</a></span></span>进入房间】</span></div>'),
        provisionalNoticeTemplate: _.template('<div><span>【临时公告】：</span><span class="notice"><%= notice %></span><span><a href="#" class="chatUser" style="text-decoration: none" uin="<%= sendUin %>" >(<%= sendUserNick %>)<%= sendUin %></a>发布</span></div>'),

        colorBarTemplate:_.template('<div><span class="time">(<%= time %>)</span><span class="se-user"><a href="#" class="chatUser" style="text-decoration: none" uin="<%= srcUin %>">[<%= srcNick %>]</a></span>对<span class="re-user"><a href="#" uin="<%= desUin %>"class="chatUser" style="text-decoration: none"><%= desNick %></a></span>说:<%= html %></div>'),

        events: {
            'click .chatUser':'userClick'
        },

        initialize: function() {
        },

        render: function() {
            return this;
        },

        userClick: function(event){
            var target = $(event.currentTarget),uin=target.attr("uin");
            var userInfo = UserList.findWhere ({uid:parseInt(uin)});

            KtvModel.get("allViews").chatInputView.addChatUser(userInfo);
            KtvModel.get("allViews").prizeView.showReceiveUser(userInfo);
        },

        // 通过类型字符串显示不同的信息
        showMsg: function(typeStr, infoObj){
            console.log(typeStr, infoObj)
            var node = this[typeStr+'Template'](infoObj);

            this.$el.append(node);

            this.scrollBottom();
        },

        /**
         * scrollBottom 滚动到最底部
         */
        scrollBottom: function(){
            var top = this.$el[0].scrollHeight;

            this.$el[0].scrollTop = top;
        }

    });

    return RoomNoticeView;
});
