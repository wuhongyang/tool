/**
用户列表数据
nick => 昵称
uid => 用户id
faceIndex => 用户头像索引
flag => 标识
order => 用户排序
wealthIconIndex => 财富图标索引
specialStatusIconIndex => vip 图标索引
moneyLevelIconIndex => 财富水平图标索引
consumeLevelIndex => 消费水平索引
singerIndex => 歌手索引
userNickColor => 用户昵称颜色
uktvStatue 
opFlag 
sealType => 印章类型
sealId => 印章id
titleImgIndex => 标题图片索引
loginEffectIndex => 登陆效果索引
roleName => 角色名        

node => 指向一个node节点
 */
define([
    'underscore',
    'backbone'
], function(_, Backbone) {
    'use strict';

    var User = Backbone.Model.extend({
        defaults: {
            nick: '',
            uid: 0,
            faceIndex: 0,
            flag: 0,
            order: 0,
            level: 0,
            wealthIconIndex: 0,
            specialStatusIconIndex: 0,
            moneyLevelIconIndex: 0,
            consumeLevelIndex: 0,
            singerIndex: 0,
            userNickColor: 0,
            uktvStatue: 0,
            opFlag: 0,
            sealType: 0,
            sealId: 0,
            titleImgIndex: 0,
            loginEffectIndex: 0,
            roleName: '',

            node: null
        }
    });

    return User;
});
