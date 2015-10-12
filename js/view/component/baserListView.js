// 列表基类
define([
    'backbone',
    'view/component/everyListView',
    'collections/userlist',
    'collections/managelist',
    'models/ktvModel'
], function(Backbone, EveryListView, UserList, ManageList, KtvModel) {
    'use strict';

    var BaseListView = Backbone.View.extend({

        currentNode: null,

        events: {
            'click  .list': 'listSelect',
            'contextmenu  .list': 'listContextMenu',
            'click .menuList': 'menuClick',
            'click .search-icon': 'popSearchInput',
            'click .position-icon': 'positionSelf',
            'click .help-icon': 'helpUser',
            'click .header .icon': 'iconClick',
            'input .search-text': 'searchUser' 
        },

        initialize: function() {

            this.delegateEvent();
        },

        render: function() {

            return this;            
        },

        delegateEvent: function(){

            this.listenTo(this.collection, 'add', this.addOne);
            this.listenTo(this.collection, 'remove', this.removeOne);
        },

        //选择用户
        listSelect: function(event){
            var target = $(event.currentTarget);

            this.selectNode(target);
        },
        selectNode: function(node){
            var allViews = KtvModel.get('allViews');
            var uid = parseInt(node.find('.num').text());
            var nick = node.find('.nick').text();

            this.$('.list-wrap .list').not(node.addClass('selected')).removeClass('selected');

            // $('.ktv-handle-box .combobox-drop').append('<li class="combobox-result" data-value="'+uid+'">'+nick+'</li>');
            // this.trigger('user-select', this.collection.findWhere({uid: uid}));
            allViews.prizeView.showReceiveUser( this.collection.findWhere({uid: uid}) );
            allViews.chatInputView.addChatUser(this.collection.findWhere({uid: uid}));
        },

        // 右键菜单
        listContextMenu: function(event){
            var target = $(event.currentTarget);

            event.preventDefault();

            this.currentNode = target;
            // this.$('.dropdown-menu').html('');

            this.addRightMenuBtn();

            this.$('.user-list-menu').show()
                                .css('left', event.pageX)
                                .css('top', event.pageY-55);
        },

        /**
         * @method addOne 在页面上将增加的用户加到列表
         * @param {Model} model 
         */
        addOne: function(model){
            var view = new EveryListView({ model: model}).render();
            var listEl = view.el;
            var index = this.collection.indexOf(model);
            var modelAbove, beforeNode;

            model.set('node', view.$el);
            model.set('view', view);

            if(index > 0) {
                modelAbove = this.collection.at(index-1);
                beforeNode = modelAbove.get('node');
                beforeNode.after(listEl);
            }else {
                this.$('.list-wrap').prepend(listEl);
            }
        },

        /**
         * @method  增加用户
         * @param {[Array]} userList 用户列表
         */
        /**
         * @method addUserList 增加用户
         * @param {Array}  userList  userList 用户列表
         * @param {Boolean} isDisplayManage 是否是管理区
         */
        addUserList: function(userList, isDisplayManage){
            var permissionView = KtvModel.get('allViews').permissionView;

            _.each(userList, function(list){

                // 如果是用户区，不用判断权限
                if(!isDisplayManage || permissionView.isManageUser(list.uid) ) {
                    this.addOneUser(this.collection, list);
                }
            }, this);

        },

        /**
         * isUserExist   判断用户是否已经存在
         * @param  {Collection}  collection 用户集合
         * @param  {Object}  userInfo 用户信息
         */
        addOneUser: function(collection, userInfo){
            var userObj = collection.findWhere({uid: userInfo.uid});

            if(!userObj) {
                collection.add(userInfo);
            }else {
                // 改变model数据
                userObj.set(userInfo);
                // 发送改变的数据到EveryListView
                userObj.get('view').trigger('change-model');
            }
        },

        /**
         * @method removeOne 从页面上把退出用户的dom删除
         * @param  {Model} model 
         */
        removeOne: function(model){
            model.get('node').remove();
        },

        /**
         * @method 用户退出房间
         * @param  {uint} uid  退出房间用户id
         */
        removeUser: function(uid){
            var child = this.collection.where({uid: uid});

            this.collection.remove(child);
        },

        /**
         * addRightMenuBtn 判断右键菜单权限
         */
        addRightMenuBtn: function(){
            var destUid = parseInt(this.currentNode.find('.num').text());
            var srcUid = KtvModel.get('userInfo').uid;
            var permissionView = KtvModel.get('allViews').permissionView;

            this.$('.user-list-menu').find('.menuList').show();

            // 右键用户是否为自己
            if(destUid === srcUid) {
                this.$('.user-list-menu').find('.voidSelf').hide();
                this.$('.user-list-menu').find('.setAdmin').hide();
            }

            // 抱上主持麦
            if(!permissionView.isCanSendMike(destUid)) {
                this.$('.user-list-menu').find('.holdMike').hide();
            }

            // 抱下主持麦
            if(!permissionView.isCanStopMike(destUid)) {
                this.$('.user-list-menu').find('.stopMike').hide();
            }            

            // 抱上演唱麦
            if(!permissionView.isCanSendSong(destUid)) {
                this.$('.user-list-menu').find('.holdSong').hide();
            }

            // 抱下演唱麦
            if(!permissionView.isCanStopSong(destUid)) {
                this.$('.user-list-menu').find('.stopSong').hide();
            }

            // 设置权限 诸如禁言...
            if(!permissionView.isCanForbidChat()) {
                this.$('.user-list-menu').find('.setAdmin').hide();
            }
        },

        // 查看资料
        menuClick: function(event){
            var target = $(event.currentTarget);
            var index = target.data('index');
            var destUid = parseInt(this.currentNode.find('.num').text());
            var roomSongInfo = KtvModel.get('roomSongInfo');

            switch(index){
                case 1: 
                    console.log('查看资料');
                    break;
                case 2: 
                    console.log('加为好友');
                    break;                
                case 3: 
                    console.log('报上主持麦1');
                    Container && Container.SendMikeSendTo(destUid);
                    break;
                case 4: 
                    console.log('报上主持麦2');
                    // Container && Container.SendAddSong(roomSongInfo.songid, roomSongInfo.songname, roomSongInfo.songuserid, roomSongInfo.songusernick);
                    break;
                case 5: 
                    console.log('报下主持麦');
                    Container && Container.SendMikeTakeBack(destUid);
                    break;    
                case 8: 
                    console.log('禁言用户')
                    Container && Container.SendForbidChat(destUid);
                    break; 
                case 9: 
                    console.log('解除禁言');
                    Container && Container.SendReleaseForbidChat(destUid);
                    break;      
                case 10:
                    console.log('踢出房间')
                    Container && Container.SendKickUser(destUid, 30);
                    break; 
                case 11: 
                    console.log('封杀Ip');
                    Container && Container.SenForceOutIP(destUid);
                    break;
                case 12: 
                    console.log('永封Ip');
                    Container && Container.SendForceOutIPForever(destUid);
                    break;
                case 13: 
                    console.log('封杀PC');
                    Container && Container.SendForceOutMachine(destUid);
                    break;
                case 14: 
                    console.log('永封PC');
                    Container && Container.SendForceOutMachineForever(destUid);
                    break;
            }
        },  

        /**
         * popSearchInput 弹出搜索框
         * @param  {Object} event 事件对象
         */
        popSearchInput: function(event){
            var target = $(event.target);

            if(target.hasClass('selected')) {
                this.$('.search-box').addClass('hide');
            }else {
                this.$('.search-box').removeClass('hide');
            }
        },

        /**
         * searchUser 搜索用户
         * @param  {Event} event 用户输入事件
         */
        searchUser: function(event){
            var target = $(event.currentTarget);
            var uid = target.val();

            // 让用户只能输入数字
            target.val(uid.replace(/\D/g, ''));

            // 查找匹配搜索id的用户名
            this.collection.each(function(model){
                model.get('node').show();
                if(model.get('uid').toString().indexOf(uid) !== 0 && uid){
                    model.get('node').hide();
                }
            });
        },

        /**
         * positionSelf 定位自己
         * @param  {[type]} event [description]
         * @return {[type]}       [description]
         */
        positionSelf: function(event){
            var target = $(event.target);
            var myModel = this.collection.findWhere({isMyself: true});
            var myNode = null;

            if(myModel) {
                myNode = myModel.get('node');

                this.positionOne(myNode);
            }
        },

        helpUser: function(event){
            console.log(event)
        },

        iconClick: function(event){
            var target = $(event.target);

            target.toggleClass('selected');
        },

        /**
         * positionOne 定位到某人
         * @param  {Node} node 用户dom节点
         */
        positionOne: function(node){
            var top = node.position().top;

            this.selectNode(node);
            this.$('.list-wrap').scrollTop(top - 110);
        },

        // 通过uin获得用户信息
        getUserByUin: function(uid){
            return this.collection.findWhere({uid: uid});
        }
    });

    return BaseListView;
});
