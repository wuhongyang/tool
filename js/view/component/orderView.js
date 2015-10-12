define([
    'backbone',
    'models/ktvModel'
], function(Backbone, KtvModel) {
    'use strict';

    var OrderView = Backbone.View.extend({

        el: '.order-list-box',

        events: {
            'contextmenu .order-list': 'orderContextMenu',
            'click .stick': 'stickOrder',
            'click .cancelOrder': 'cancelOrder',
            'click .moveUpOrder': 'moveUpOrder',
            'click .moveDownOrder': 'moveDownOrder',
            'click .pause-order': 'pauseOrder'
        },

        initialize: function() {
            this.listenTo(this.collection, 'reset', this.render);
        },

        render: function() {
            this.renderList();

            return this;            
        },

        renderList: function(){
            var listNodeCompiled = _.template('<li class="order-list" data-id="<%= id %>"><%= songusernick %>(<span class="songUserId"><%= songuserid %></span>)</li>');

            this.$('.orders').empty();

            this.collection.each(function(song){

                this.$('.orders').append(listNodeCompiled(song.toJSON()));

            }, this);
        },

        // 麦序暂停开启初始化
        orderInit: function(isPause){

            if(isPause) {
                this.$('.pause-order').data('ispause', 0).text('开启麦序');
            }else {
                this.$('.pause-order').data('ispause', 1).text('暂停麦序');
            }
        },

        //麦序右键
        orderContextMenu: function(event){
            var target = $(event.currentTarget);
            var permissionView = KtvModel.get('allViews').permissionView;

            event.stopPropagation();
            event.preventDefault();

            this.currentIndex = this.$('.order-list').index(target);
            this.currentList = target;

            // 判断是否有权限
            if(permissionView.isCanTopSong()) {
                this.$('.order-menu').show()
                    .css('left', 30)
                    .css('top', event.pageY-55);
            }

            return false;
        },

        // 置顶
        stickOrder: function(){
            var id = this.currentList.data('id');

            if(this.currentIndex !== 0) {
                /*this.currentList.remove();
                this.$('.orders').prepend(this.currentList);    */        
                Container && Container.SendFirstSong(id);
            }
        },

        // 取消麦序
        cancelOrder: function(){
            var id = this.currentList.data('id');

            Container && Container.SendDelSong(id);
        },

        // 上移麦序
        moveUpOrder: function(){
            if(this.currentIndex !== 0) {
                this.currentList.insertBefore(this.$('.order-list').eq(this.currentIndex-1));
            }
        },

        // 下移麦序
        moveDownOrder: function(){
            this.currentList.insertAfter(this.$('.order-list').eq(this.currentIndex+1));
        },

        // 通过uin获得麦序信息
        getSongByUin: function(uid){
            return this.collection.findWhere({songuserid: uid});
        },

        // 暂停麦序
        pauseOrder: function(event){
            var isPause = $(event.currentTarget).data('ispause');
            var allViews = KtvModel.get('allViews');
            var permissionView = allViews.permissionView;
            var roomNoticeView = allViews.roomNoticeView;
console.log(isPause)
            if(permissionView.isCanControlSong()) {
                Container.SendPauseSong(isPause);
            }else {
                roomNoticeView.showMsg('systemSimple', {
                    time: allViews.ktvView.getCurrentTime(),
                    msg: '您没有权限，详情请咨询房间室主、管理或<a>客服</a>'
                });
            }
        }

    });

    return OrderView;
});
