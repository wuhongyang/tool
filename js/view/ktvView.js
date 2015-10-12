// 最外层页面继承了信号view
define([
    'underscore',
    'backbone',
    'view/signalsView',
    'view/layout/headerView',
    'view/layout/asideView',
    'view/layout/cornerView',
    'view/layout/contentView',
    'view/component/permissionView',
    'models/permission',
    'bootstrap',
    'view/testData'
], function(_, Backbone, SignalsView, HeaderView, AsideView, CornerView, ContentView, PermissionView, Permission) {
    'use strict';

    var KtvView = SignalsView.extend({

        el: 'html',

        events: {
            'click body': 'documentClick'
        },

        initialize: function() {
            var instance = this;

            instance.delegateEvent();
            instance.delegateSignal();
        },

        render: function() {
            var allViews = this.model.get('allViews');

            allViews.headerView = this.headerView = new HeaderView().render();
            allViews.asideView = this.asideView = new AsideView().render();
            allViews.cornerView = this.cornerView = new CornerView().render();
            allViews.contentView = this.contentView = new ContentView().render();
            allViews.permissionView = new PermissionView({ model: Permission }).render();

            this.domContentLoaded();
            this.autoAdjustSize();
            this.handleViewsEvent();
            this.pageEvent();


// Container.SendBroadcast('广播', 20000)
// Container.SendTemporaryNotice('notice');

// this.asideView.trigger('add-user-list', testData.myInfo);
// this.asideView.trigger('add-user-list', testData.list);
/*allViews.userListView.addUserList(testData.list, false);
allViews.manageListView.addUserList(testData.list, true); */
// this.asideView.trigger('add-user-list', testData.list1);    
// this.asideView.orderView.collection.reset(testData.songList);
// this.asideView.trigger('user-exit',{uid: 1000001});
// this.contentView.interactionView.chatMessageView.trigger('show-chat-info',{srcUin: 1000,destUin: 0,msg: '12345'});
// this.contentView.interactionView.chatMessageView.trigger('show-good', {time:"22",srcnick: '测试1',actnick: '测试2',goodsname: '花', num: 20, goodsTypeName: '束', goodsid: 20});
// this.contentView.interactionView.roomNoticeView.trigger('show-notice', {notice: '测试1'});
// this.asideView.noticeBoardView.trigger('show-broadcast', {str: 'ceshi1'});

// this.contentView.interactionView.roomNoticeView.trigger('notice-msg', 2, {time:'19:20:30',srcnick: '测试1',actnick: '测试2',goodsname: '花', num: 20, goodsTypeName: '束', goodsid: 20});
// this.contentView.interactionView.roomNoticeView.trigger('notice-msg', 3, {time: '19:20:30', uid: 10001234, roleName: "普通用户", nick: '小白'});
// this.cornerView.prizeView.collection.reset(testData.goodsList);
// this.cornerView.prizeView.setUserMoney(50000, 700000);
            return this;
        },

        delegateEvent: function(){
            var instance = this;

            $(window).on('resize', $.proxy(instance.autoAdjustSize,instance));
            instance.on('close', instance.close);

        },

        // 处理各个view的消息
        handleViewsEvent: function(){
            var model = this.model;
        },

        // 根据屏幕大小调节元素
        autoAdjustSize: function(){
            var containerHeight = this.$('.ktv-container').outerHeight();
            var asideHeight = this.$('.ktv-aside').height();

            this.$('.ktv-wrap').height(containerHeight - 60);
            this.$('.ktv-interaction-box').height(containerHeight - 362);
            this.$('.ktv-chat-message').height((containerHeight - 530)*2/3);
            this.$('.notice-box').height((containerHeight - 530)/3);

            this.contentView.$('.type-area').width(this.contentView.$('.input-box').width()-100);
            this.asideView.$('.ktv-notice-board').height((containerHeight-155)/5);
            this.asideView.$('.ktv-tab').height((containerHeight-155)*4/5);
        },

        // 文档点击
        documentClick: function(event){
            var target = $(event.target);

            this.cornerView.$('.order-menu').hide();
            this.asideView.$('.dropdown-menu').hide();

            this.contentView.$('.dropdown-menu').hide();

            if(!target.hasClass('smilies-popover') && !target.parents('.smilies-popover').length){
                $('.smilies-popover').hide();
            }
        }

    });

    return KtvView;
});
