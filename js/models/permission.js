/**
     managerRoomAdmin => 是否有管理房间的权限
     operateFlagString => 用户设置权限

     currentSong => 唱歌麦用户id
     currentPublicMikeUid => 公麦用户id
     currentPrivateMikeUid => 私麦用户id
 */
define([
    'backbone'
], function(Backbone) {
    'use strict';

    var Permission = Backbone.Model.extend({
        defaults: {
            managerRoomAdmin: false,
            operateFlagString: '',

            currentSong: null,
            currentPublicMikeUid: null,
            currentPrivateMikeUid: null,
            currentMikeList: []
        }
    });

    return new Permission();
});
