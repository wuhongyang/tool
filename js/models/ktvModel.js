/**
 KTV 房间数据

 roomId => 房间id
 roomNotice1 => 房间公告
 userInfo => 用户信息
 isLogined => 是否为本用户登陆

 */
define([
    'backbone'
], function(Backbone) {
    'use strict';

    var KtvModel = Backbone.Model.extend({
        defaults: {
            roomId: 0,
            sessionKey: '',
            isLogined: false,
            roomNotice1: '',
            roomNotice2: '',
            roomNotice3: '',
            
            userInfo: {
                nick: '王XX',
                uid: 2000000,
                faceIndex: 10,
                flag: 0,
                order: 0,
                opFlag: 0,
                wealthIconIndex: 0,
                specialStatusIconIndex: 0,
                moneyLevelIconIndex: 0,
                level: 0,
                myFamilyId: 0,
                loginEffectIndex: 0,
                consumeLevelIndex: 0,
                userListNickClr: 0,
                carIndex: 0,
                roleName: '',
                singerIndex: 0,
                titleImgIndex: 0,
                bInvisible: false
            },
            roomStatus: {
                name: '',
                descript: '',
                maxUserNum: 0,
                maxMicNum: 0,
                maxPrivateNum: 0,
                textPort: 0,
                audioPort: 0,
                videoPort: 0,
                flag: 0,
                mediaflag: 0,
                audioquality: 0,
                videoquality: 0,
                channelip: '',
                channelport: 0,
                mikedelay: 0,
                mediadelay: 0,
                songmaxnum: 0,
                maxshowtime: 0,
                aotuplaystat: 0,
                publictalkstat: 0,
                privatetalkstat: 0,
                maxoneshowlist: 0,
                isCompeter: 0,
                salutatory: '',
                autoGuahaoCount: 0,
                useAACPlus: 0,
                videoDecoderType: 0,
                videoEncoderType: 0,
                m_nNoticeStepTime: 10,
                m_bLockMike: 1,
                familyRank: 0,
                isFamily: 0
            },
            roomInfo: {
                name: "",                         //名称
                descript: "",                     //描述  
                passwd: "",                     //房间进入密码
                //salutatory: "",                // 欢迎词
                member: 0,                     //会员登陆标志
                manager: 0,                    //管理员
                flag: 0,                           //房间标志
                validcode: 0,                   //房间验证码
                ownuin: 0,                       //室住
                permitknock: 0,                 //敲门标志
                idauth: 0,                         //房间是否认证
                mikedelay: 0,                   //主持人延迟
                mediadelay: 0,                 //流媒体延迟
                songmaxnum: 0,              //列表最多的点播数量
                maxshowtime: 0,             //最长的修改时间
                aotuplaystat: 0,                //自动点播状态
                publictalkstat: 0,              //屏蔽公聊状态
                privatetalkstat: 0,             //屏蔽私聊状态
                maxoneshowlist: 0,          //
                isCompeter: 0,                  // 是不是比赛房间 
                  
                m_bUseGoldMikeGift: 0,      //是否开启金麦克功能
                m_uMaxAddTimeUseGoldMike: 0,     //使用金麦克最大延长时间
                m_uAddTimePerTimeUseGoldMike: 0,    //使用金麦克每次增加时间
                m_bUseMikeGift: 0,                               //是否开启点歌娃娃
                m_nNoticeStepTime: 10,                        // 上麦限制         
                m_bLockMike: 1,                                  //是否锁定视频 1开启，0关闭 
            },
            roomSongInfo: {
                id: 0,
                songid: 900000,
                songname: '',
                songuserid: 0,
                songusernick: '',
                songmanagerid: 0,
                songmanagernick: '',
                showVideo: 1,
                noMsgFlag: 0
            },
            otherServerInfo: {
                uin: 0,
                name: '',
                webmanager: ''
            },
            competerInfo: {
                comid: 0,
                roomid: 0,
                comname: '',
                Regulation: '',
                bmstarttime: 0,
                bmendtime: 0,
                starttime: 0,
                closetime: 0,
                stat: 0
            },
            mikeInfo: {
                uin: 0,
                name: '',
                showVideo: 1,
                PriMikeType: 0
            },
            // 唱歌麦信息
            viedoSongInfo: {
                isOnline: false,
                uid: 0,
                nick: 0
            },
            viedoSongListInfo: [{
                isOnline: false,
                uid: 0,
                nick: ''
            },{
                isOnline: false,
                uid: 0,
                nick: ''
            }],
            globleData: {
                html: '',
                sealList: []
            },
            // 所有的view
            allViews: {
                headerView: null,
                asideView: null,
                cornerView: null,
                contentView: null,
                userListView: null,
                manageListView: null,
                orderView1: null,
                orderView2: null,
                noticeBoardView: null,
                interactionView: null,
                allViedosView: null,
                prizeView: null,
                viedo1: null,
                viedo2: null,
                viedo3: null,
                roomNoticeView: null,
                chatInputView: null,
                chatMessageView: null,
                permissionView: null,
                ktvView: null
            }
        }
    });

    return new KtvModel();
});
