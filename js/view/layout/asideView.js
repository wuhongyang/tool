define([
    'underscore', 
    'backbone', 
    'handlebars',
    'collections/userlist',
    'collections/managelist',
    'collections/songlist',
    'view/component/everyListView',
    'view/component/userListView',
    'view/component/manageListView',
    'view/component/orderView',
    'view/component/noticeBoardView',
    'models/ktvModel'
], function(_, Backbone, Handlebars, UserList, ManageList, SongList,everyListView, UserListView, ManageListView, OrderView, NoticeBoardView, KtvModel) {
    'use strict';

    var AsideView = Backbone.View.extend({

        el: '.ktv-aside',

        events: {
        },
        initialize: function() {
            var instance = this;

            instance.$tab = instance.$('.ktv-tab');
        },

        // 监听aside事件
        delegateEvent: function(){

            this.listenTo(KtvModel, 'change:roomStatus', this.roomInit);

        },

        render: function() {
            var instance = this;

            instance.renderTab();
            instance.renderUl();

            instance.delegateEvent();

            return instance;            
        },

        renderTab: function(){
            var tab   = $("#aisde-tab-template").html();
            var template = Handlebars.compile(tab);

            this.$tab.prepend(template());
        },

        // 渲染用户列表
        renderUl: function(){
            var instance = this;
            var allViews = KtvModel.get('allViews');

            allViews.userListView = instance.userListView = new UserListView({ collection: UserList }).render();
            allViews.manageListView = instance.manageListView = new ManageListView({ collection: ManageList }).render();
            allViews.orderView1 = instance.orderView = new OrderView({ el: '.ktv-aside .order-list-box', collection: SongList }).render();
            allViews.noticeBoardView = instance.noticeBoardView = new NoticeBoardView().render();
        },

        // 房间号和房间名初始化
        roomInit: function(data){
            var roomStatus = data.changed.roomStatus;
console.log(roomStatus)
            this.$('.header .roomId').text(data.get('roomId'));
            this.$('.header .roomName').text(roomStatus.name);
        }
    });

    return AsideView;
});
