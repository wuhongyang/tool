// 房间用户权限
define([
    'backbone',
    'collections/userlist',
    'models/ktvModel'
], function(Backbone, UserList, KtvModel) {
    'use strict';

    var PermissionView = Backbone.View.extend({

        initialize: function() {
        },

        render: function() {
            return this;
        },

        /**
         * @method  判断是否为管理用户
         * @param  {uint} uid  用户id
         * @return {Boolean} 返回真假
         */
        isManageUser: function(uid){
            var userInfo, flag, IChatConnection;

            // 如果uid为空 那么用户就是自己
            if(!uid) {
                userInfo = KtvModel.get('userInfo');
            }else {
                userInfo = UserList.findWhere({uid: uid}).toJSON();
            }

            flag = userInfo.flag;
            IChatConnection = Ktv.imConst.userRghtFlag;

            return ((flag & IChatConnection.USER_FLAG_MANAGER) || (flag & IChatConnection.USER_FLAG_OWNER) || (flag & IChatConnection.USER_FLAG_ROOT));
        },

        /**
         * isCanManageRoom 是否可以管理房间
         * @return {Boolean} 
         */
        isCanManageRoom: function(){
            return this.model.get('managerRoomAdmin');    
        },

        /**
         * isCanSetRoom 是否可以设置房间
         * @param  {int}  op 角色操作索引
         * @return {Boolean}    
         */
        isCanSetRoom: function(op){
            var operateFlagString = this.model.get('operateFlagString');

            // 因为op是从0开始的，所以要减1
            return operateFlagString.charAt(operateFlagString.length-op-1) === '1';
        },

        /**
         * isCanSendPrivateMike 是否可以上主持麦
         * @param  {int}  uin 对方id
         * @return {Boolean}     [description]
         */
        isCanSendMike: function(uin){
            var currentMikeList = this.model.get('currentMikeList');

            // 如果主持麦上有人了我抱上去干嘛
            if(currentMikeList.length && (currentMikeList[0].uin === uin || currentMikeList[1].uin === uin)) return false;

            return this.isCanSetRoom(Ktv.imConst.operateType.indexOf('OPERATE_TYPE_SEND_BACK_MIKE'));
        },

        /**
         * isCanStopMike 是否可以抱下主持麦
         * @param  {int}  uin 对方id
         * @return {Boolean}     
         */
        isCanStopMike: function(uin){
            var currentMikeList = this.model.get('currentMikeList');

            // 主持麦上没人
            if(!currentMikeList.length || (currentMikeList[0].uin === -1 && currentMikeList[1].uin === -1)) return false;

            // 主持麦上没有uin
            if(currentMikeList[0].uin !== uin && currentMikeList[1].uin !== uin) return false;

            return this.isCanSetRoom(Ktv.imConst.operateType.indexOf('OPERATE_TYPE_SEND_BACK_MIKE'));            
        },

        /**
         * isCanStopMike 是否可以抱别人下麦
         * @param  {Int}  uin 对方id
         * @return {Boolean}     
         */
        isCanStopSong: function(uin){
            var currentSong = this.model.get('currentSong');

            // 如果麦上没人或者 该用户不在麦上抱下来干嘛
            if(!currentSong || (uin !== currentSong.songuserid)) return false;

            return this.isCanSetRoom(Ktv.imConst.operateType.indexOf('OPERATE_TYPE_STOP_SONG'));
        },

        /**
         * isCanSendSong 是否可以抱别人上麦
         * @param  {int}  uin 对方id
         * @return {Boolean}   
         */
        isCanSendSong: function(uin){
            var currentSong = this.model.get('currentSong');

            // 如果麦上就是该用户我抱上去做什么
            if(currentSong && uin === currentSong.songuserid) return false;

            return this.isCanSetRoom(Ktv.imConst.operateType.indexOf('OPERATE_TYPE_SEND_SONG'));
        },

        /**
         * isCanForbidChat 是否可以禁言
         * @return {Boolean} 
         */
        isCanForbidChat: function(){
            console.log(Ktv.imConst.operateType.OPERATE_TYPE_FORBID_CHAT)
            return this.isCanSetRoom(Ktv.imConst.operateType.indexOf('OPERATE_TYPE_FORBID_CHAT'));
        },

        /**
         * isCanKickUser 是否可以将用户踢出房间
         * @return {Boolean} 
         */
        isCanKickUser: function(){
            return this.isCanSetRoom(Ktv.imConst.operateType.indexOf('OPERATE_TYPE_KICK_USER'));
        },

        /**
         * isCanForceOut 是否可以封杀IP
         * @return {Boolean} 
         */
        isCanForceOut: function(){
            return this.isCanSetRoom(Ktv.imConst.operateType.indexOf('OPERATE_TYPE_FORCE_OUT'));
        },

        /**
         * isCanTopSong 是否可以置顶麦序
         * @return {Boolean} 
         */
        isCanTopSong: function(){
            return this.isCanSetRoom(Ktv.imConst.operateType.indexOf('OPERATE_TYPE_TOP_SONG'));
        },

        /**
         * isCanControlSong 是否可以暂停或开启麦序
         * @return {Boolean} 
         */
        isCanControlSong: function(){
            return this.isCanSetRoom(Ktv.imConst.operateType.indexOf('OPERATE_TYPE_CONTROL_SONG_LIST'));
        },

        /**
         * isCanDeleteSong 是否可以取消别人的麦序
         * @return {Boolean} 
         */
        isCanDeleteSong: function(){
            return this.isCanSetRoom(Ktv.imConst.operateType.indexOf('OPERATE_TYPE_DELETE_SONG'));
        }
    });

    return PermissionView;
});
