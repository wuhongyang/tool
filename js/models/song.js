/**
    songid => 歌曲id
    songname => 歌曲名字
    songuserid => 歌手id
    songusernick => 歌手昵称
    showVideo =>  是否显示视频,1：显示，0：关闭
 */
define([
    'underscore',
    'backbone'
], function(_, Backbone) {
    'use strict';

    var User = Backbone.Model.extend({
        defaults: {
            id: 0,
            songid: 0,
            songname: '',
            songuserid: 0,
            songusernick: '',
            songmanagerid: 0,
            songmanagernick: '',
            showVideo: 1,
            noMsgFlag: 0,

            node: null
        }
    });

    return User;
});
