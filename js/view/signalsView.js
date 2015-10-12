var Container  = window.Container;

// 信号层
define([
    'backbone',
    'collections/emotionlist',
    'collections/userlist',
    'collections/prizelist',
    'collections/songlist',
    'collections/otherserverlist',
    'models/permission',
    'models/ktvModel'
], function(Backbone, EmotionList, UserList, PrizeList, SongList, OtherServerList, Permission, KtvModel) {
    'use strict';

    var SignalsView = Backbone.View.extend({

        initialize: function() {
            console.log(this);
        },

        render: function() {

            return this;
        },

        delegateSignal: function(){
            var instance = this;
            console.log(Container);

            /*房间相关开始*/

            //打开房间的信号
            Container && Container.sig_OpenRoom.connect(instance.sig_OpenRoom.bind(instance));

            // 进入KTV界面之前从服务端获得信息
            Container && Container.onRoomMessage.connect(instance.onRoomMessage.bind(instance));

            // 登陆成功返回房间信息
            Container && Container.onRcvRoomParam.connect(instance.onRcvRoomParam.bind(instance));
            
            // 房间公告
            Container && Container.onRecvSalutatoryInfo.connect(instance.onRecvSalutatoryInfo.bind(instance));

            // 接收房间公告信号
            // notice , sendUin , sendUserNick
            Container && Container.onRecvTemporaryNotice.connect(instance.onRecvTemporaryNotice.bind(instance));

            // 管理允许房间成员或者黑名单
            Container && Container.onRcvGetMemberOrDeny.connect(instance.onRcvGetMemberOrDeny.bind(instance));

            // 房间打开信号
            Container && Container.onRcvRoomOpen.connect(instance.onRcvRoomOpen.bind(instance));

            // 房间关闭信号
            Container && Container.onRcvRoomClose.connect(instance.onRcvRoomClose.bind(instance));

            // 登陆成功返回用户金币和Q豆
            Container && Container.onOnRecvNewMoney.connect(instance.onOnRecvNewMoney.bind(instance));

            // 登陆成功返回其他服务链接列表  如兑换链接
            Container && Container.onRcvOtherServerInfo.connect(instance.onRcvOtherServerInfo.bind(instance));

            /*房间相关结束*/

            /*用户相关开始*/

            // 登陆成功返回用户信息  每一个用户登录都会提醒消息
            Container && Container.onUserEnterRoom.connect(instance.onUserEnterRoom.bind(instance));

            // 用户离开房间 
            Container && Container.onUserLeaveRoom.connect(instance.onUserLeaveRoom.bind(instance));

            // 用户下线
            Container && Container.onRcvUserOffline.connect(instance.onRcvUserOffline.bind(instance));

            // 登陆成功返回用户列表
            // 用户信号分批接收，如果接收的用户存在，更新该用户的信息，如果不存在，添加用户
            Container && Container.onRcvUserList.connect(instance.onRcvUserList.bind(instance));

            /*用户相关结束*/

            /* 权限有关的信号*/

            Container && Container.onRecvOperateFlag.connect(instance.onRecvOperateFlag.bind(instance));

             // 给拥有管理房间权限的用户发送房间信号
            Container && Container.onRcvGetRoomInfo.connect(instance.onRcvGetRoomInfo.bind(instance));

            /*权限信号结束*/

            /*麦序相关开始*/

            // 麦序列表信号
            Container && Container.onRcvSongList.connect(instance.onRcvSongList.bind(instance));

            // 添加麦序
            Container && Container.onRcvAddSong.connect(instance.onRcvAddSong.bind(instance));

            // 上唱歌麦
            Container && Container.onRcvStartSong.connect(instance.onRcvStartSong.bind(instance));

            // 下唱歌麦
            Container && Container.onRcvStopSong.connect(instance.onRcvStopSong.bind(instance));

            // 删除麦序 
            Container && Container.onRcvDelSong.connect(instance.onRcvDelSong.bind(instance));                                                                                                                                                                                    

            // 置顶麦序
            Container && Container.onRcvFirstSong.connect(instance.onRcvFirstSong.bind(instance));

            // 上主持麦  根据传进来的uid是否为-1判断上麦或者下麦
            Container && Container.onRcvMikeStatus.connect(instance.onRcvMikeStatus.bind(instance));

            // 暂停麦序、开启麦序
            Container && Container.onRcvPauseSong.connect(instance.onRcvPauseSong.bind(instance));

            // 是否锁定视频
            Container && Container.onRcvLockMikeStatus.connect(instance.onRcvLockMikeStatus.bind(instance));

            /*麦序相关结束*/

            /*用户交互相关开始*/

            // 聊天返回信息
            Container && Container.onRcvChatText.connect(instance.onRcvChatText.bind(instance));

            // 获取礼物信息
            // uin, actuin, goodstype, goodsid, goodsname, num, srcnick, actnick,
            // bShowOnPrivateChat, goodsTypeName, goldMikeCount, bIsStealth
            Container && Container.onRcvUseGoods.connect(instance.onRcvUseGoods.bind(instance));

            // 接收广播信号
            // str, uin, nick, roomid, sendTime, roomType
            Container && Container.onOnRecvAddBroadcast.connect(instance.onOnRecvAddBroadcast.bind(instance));

            // 彩条
            Container && Container.onRcvChatFlower.connect(instance.onRcvChatFlower.bind(instance));

            // 接收印章信号 ，uin, actuin, goodsType,goodsId,goodsName
            Container && Container.onRecvUseStamp.connect(instance.onRecvUseStamp.bind(instance));

            // 投票
            Container && Container.onOnRecvVote.connect(instance.onOnRecvVote.bind(instance));

            // 禁言
            // Container && Container.onRecvForbidChat.connect(instance.onRecvForbidChat.bind(instance));

            // 解除禁言
            // Container && Container.onRcvReleaseForbitChat.connect(instance.onRcvReleaseForbitChat.bind(instance));

            // 踢出用户
            Container && Container.onRcvKickUser.connect(instance.onRcvKickUser.bind(instance));

            // 封杀IP
            // Container && Container.onRecvForceOutIP.connect(instance.onRecvForceOutIP.bind(instance));

            /*用户交互相关结束*/

            /* 视频监听信号*/
            $('.viedo-object').onRtmpPublishManagerMsg && $('.viedo-object').onRtmpPublishManagerMsg.connect(instance.onRtmpPublishManagerMsg.bind(instance));
            $('.viedo-object').onRtmpPublishManagerNetInfo && $('.viedo-object').onRtmpPublishManagerNetInfo.connect(instance.onRtmpPublishManagerNetInfo.bind(instance));
            $('.viedo-object').onRtmpPublishManagerComputerStatusInfo && $('.viedo-object').onRtmpPublishManagerComputerStatusInfo.connect(instance.onRtmpPublishManagerComputerStatusInfo.bind(instance));
            $('.viedo-object').onRtmpPlayManagerMsg && $('.viedo-object').onRtmpPlayManagerMsg.connect(instance.onRtmpPlayManagerMsg.bind(instance));
            $('.viedo-object').onRtmpPlayManagerNetInfo && $('.viedo-object').onRtmpPlayManagerNetInfo.connect(instance.onRtmpPlayManagerNetInfo.bind(instance));
            $('.viedo-object').onRtmpPlayManagerComputerStatusInfo && $('.viedo-object').onRtmpPlayManagerComputerStatusInfo.connect(instance.onRtmpPlayManagerComputerStatusInfo.bind(instance));
            $('.viedo-object').onRtmpPlayManagerAVInfo && $('.viedo-object').onRtmpPlayManagerAVInfo.connect(instance.onRtmpPlayManagerAVInfo.bind(instance));
        },

        // 不同页面事件
        pageEvent: function(){
            // 保存一份全局数据
            window.globalKtvModel = KtvModel;

            // 接收广播
            Container && Container.listen('publish-broadcast', function(data){
                Container && Container.SendBroadcast(data.content, 2000);
            });

            // 接收临时公告
            Container && Container.listen('send-announce', function(data){
                /*console.log(data,KtvModel)
                 var userInfo = KtvModel.get('userInfo');

                 console.log(userInfo)*/
                Container && Container.SendTemporaryNotice(data.content, 465516, '456');
            });
            //接收印章信息
            Container && Container.listen('seal-set', function(data){
                var ktvModel = window.globalKtvModel,allViews=ktvModel.get("allViews");
                

                var money = parseInt(data.money),total= allViews.prizeView.getUserMoney().money;
                if(money>total){
                   allViews.roomNoticeView.showMsg("systemSimple",{
                        time:allViews.ktvView.getCurrentTime(),
                        msg:"金币不足，请充值!"
                    });
                   return;
                }
                if(0==data.selectUin){
                    allViews.roomNoticeView.showMsg("systemSimple",{
                        time:allViews.ktvView.getCurrentTime(),
                        msg:"不能给所有人盖章!!"
                    });
                    return;
                }
                Container&&Container.SendUseStamp(data.selectUin,parseInt(data.type),parseInt(data.id));
                
            });
            //接收字体设置信息
            Container && Container.listen('font-set', function(data){
                var $font =  $(".type-area");
                var ktvModel = window.globalKtvModel,allViews=ktvModel.get("allViews");
                var pkt = {
                    "font-name": data["font-name"],
                    "Bold":"bold"==data["font-weight"] ? 1:0,
                    "Italic": "italic"==data["font-style"]?1:0,
                    "font-size": data["font-size"],
                    "color": parseInt(data.color,16),
                    "Underline": data["Underline"]==true?1:0
                };
                Container && Container.WriteFile('public/config_file/font.json',JSON.stringify(pkt));

                allViews.chatInputView.setFont();
                
            });

            // 房间信息数据更新
            Container && Container.listen('room-data-updata', function(data){
                console.log(data.roomInfo)
                window.globalKtvModel.set('roomInfo', data.roomInfo)
                Container && Container.SendUpdateRoomInfo(data.roomInfo);
                Container && Container.SendUpdateSalutatory(data.roomNotice.notice1, 1);
                Container && Container.SendSetMikeLockStatus(data.roomInfo.m_bLockMike);

                // 打开房间
                if(data.roomInfo.flag) {
                    Container && Container.SendOpenRoom();
                } else {
                    Container && Container.SendCloseRoom();
                }
            });
            //接收音频设置信息
            Container && Container.listen('audio-set', function(data){
                console.log(data)
                $.each(data,function(k,v){
                    $("#"+k+"Drive").attr("value",v);
                });
               var ktvModel = window.globalKtvModel,allViews=ktvModel.get("allViews");
               allViews.chatInputView.saveMacVoice();
            });    
        },

        // 所有view render完成
        domContentLoaded: function(){
            Container && Container.onDOMContentLoaded();
        },

        // 关闭客户端
        close: function(){
            Container && Container.close();
        },

        // 初始化配置文件数据
        initConfigData: function(){

            var goodsList = this.xml2Json(Container && Container.ReadFile('public/config_file/goods.data'), ['emotion', 'wealth', 'gift', 'tab4', 'tab5']);
            var emotionList = this.xml2Json(Container && Container.ReadFile('public/config_file/emotion.xml'), ['default', 'emotion_tab2', 'emotion_tab3', 'emotion_tab4', 'emotion_tab5', 'emotion_tab6']);
            // var colorBarList = this.xml2Json(Container && Container.ReadFile('public'))
            var colorBarList = this.xml2Json(Container && Container.ReadFile('public/config_file/colorBar.xml'), ['colorBar']);
            var sealList = this.xml2Json(Container && Container.ReadFile('public/config_file/seal.xml'), ['page1','page2','page3','page4','page5']);

            KtvModel.get('allViews').chatInputView.setColorBars(colorBarList).setFont();
            KtvModel.get('globleData').sealList = sealList;
            PrizeList.reset(goodsList);
            EmotionList.reset(emotionList);
        },

        // 获得系统当前时间
        getCurrentTime: function(){
            var now = new Date();
            var hours = now.getHours() < 10 ? '0'+now.getHours() : now.getHours();
            var minutes = now.getMinutes() < 10 ? '0'+now.getMinutes() : now.getMinutes();
            var seconds = now.getSeconds() < 10 ? '0'+now.getSeconds() : now.getSeconds();

            return hours+':'+minutes+':'+seconds;
        },

        // 将xml字符串转化为json对象
        xml2Json: function(xml, array){

            var jsonObj = [];

            $.each(array, function(index, ascription){

                $(xml).find(ascription).find('item').each(function(idx, item){
                    var itemObj = {};

                    itemObj['ascription'] = ascription;
                    $.each(item.attributes, function(i, str){
                        itemObj[str.name] = str.value;
                    });
                    jsonObj.push(itemObj);
                });

            });

            return jsonObj;
        },

        sig_OpenRoom: function(m_roomId, sessionKey){

            this.model.set('roomId', m_roomId);
            this.model.set('sessionKey', sessionKey);
            Container && Container.open(m_roomId, '');
            this.initConfigData();
        },

        onRoomMessage: function(msgCode,exParam){
            var loginBackMsg = Ktv.imConst.loginBackMsg;

            switch(msgCode){
                case loginBackMsg.LOGON_SUCCESS:
                    Container && Container.showKtvView();
                    break;
                case loginBackMsg.LOGON_INVALID_UIN:
                    this.trigger('close');
                    break;
                case loginBackMsg.LOGON_WRONG_PASSWD:
                    this.trigger('close');
                    break;
                case loginBackMsg.LOGON_WRONG_ROOM_PASSWD:
                    this.trigger('close');
                    break;
                case loginBackMsg.LOGON_NO_THIS_ROOM:
                    this.trigger('close');
                    break;
                case loginBackMsg.LOGON_ROOM_IS_FULL:
                    this.trigger('close');
                    break;
                case loginBackMsg.LOGON_ROOM_IS_CLOSED:
                    this.trigger('close');
                    break;
                case loginBackMsg.LOGON_ALREADY_IN_ROOM:
                    this.trigger('close');
                    break;
                case loginBackMsg.LOGON_ROOM_IS_BUSY:
                    this.trigger('close');
                    break;
                case loginBackMsg.LOGIN_NO_ROOM_MEMBER:
                    this.trigger('close');
                    break;
                case loginBackMsg.LOGON_ROOM_IS_FREEZED:
                    this.trigger('close');
                    break;
                case loginBackMsg.LOGON_ROOM_IS_DELETED:
                    this.trigger('close');
                    break;
                case loginBackMsg.LOGON_AUTHUSER_TIMEOUT:
                    this.trigger('close');
                    break;
                case loginBackMsg.LOGON_ROOM_KNOCKING:
                    this.trigger('close');
                    break;
                case loginBackMsg.LOGON_SYSTEM_IS_BUSY:
                    this.trigger('close');
                    break;
                case loginBackMsg.LOGON_ROOM_IS_FORCEOUT_IP:
                    this.trigger('close');
                    break;
                case loginBackMsg.LOGON_ROOM_IS_FORCEOUT_IP_FOREVER:
                    this.trigger('close');
                    break;
                case loginBackMsg.LOGON_ROOM_IS_FORCEOUT_PC:
                    this.trigger('close');
                    break;
                case loginBackMsg.LOGON_ROOM_IS_FORCEOUT_PC_FOREVER:
                    this.trigger('close');
                    break;
                case loginBackMsg.LOGON_LOGIN_TOO_MANY_UIN_EACH_IP:
                    this.trigger('close');
                    break;
                case loginBackMsg.LOGON_TOO_FREQUENTLY:
                    this.trigger('close');
                    break;
                case loginBackMsg.LOGON_LOGIN_TOO_MANY_UIN_EACH_MAC:
                    this.trigger('close');
                    break;
                case loginBackMsg.LOGON_LOGIN_HIDE_FAIL:
                    this.trigger('close');
                    break;
            }
        },

        // 用户进入房间
        onUserEnterRoom: function(userInfoObj){
            var allViews = KtvModel.get('allViews');

            userInfoObj.time = this.getCurrentTime();

            var array = [];
            array.push(userInfoObj);
            // this.model.set('userInfo', _.extend(this.model.get('userInfo'), userInfoObj));
            // 判断用户是否已经登陆
            if(!this.model.get('isLogined')) {
                array[0].isMyself = true;
                this.model.set('userInfo', userInfoObj);
                this.model.get('roomSongInfo').songuserid = userInfoObj.uid;
                this.model.get('roomSongInfo').songusernick = userInfoObj.nick;
            }

            this.model.set('isLogined', true);

            allViews.userListView.addUserList(array, false);
            allViews.manageListView.addUserList(array, true);

            // 欢迎用户进入房间
            allViews.roomNoticeView.showMsg('userEnter', userInfoObj);
        },

        onUserLeaveRoom: function(uid, opFlag){
            var allViews = KtvModel.get('allViews');

            allViews.userListView.removeUser(uid);
            allViews.manageListView.removeUser(uid);
        },

        onRcvUserOffline: function(uid){
            console.log(uid)
        },

        onRcvUserList: function(userList){
            var allViews = KtvModel.get('allViews');

            // 用户列表增加用户
            allViews.userListView.addUserList(userList, false);
            allViews.manageListView.addUserList(userList, true); 
        },

        // 金币 Q豆
        // money => Q豆,inmoney => 金币,relayTime,nFlag
        onOnRecvNewMoney: function(money, inmoney, relayTime, nFlag){
            var allViews = KtvModel.get('allViews');
            allViews.prizeView.setUserMoney(inmoney, money);
        },

        onRcvOtherServerInfo: function(otherServerInfo){
            console.log(otherServerInfo)
            OtherServerList.reset(otherServerInfo);
        },

        onRcvRoomParam: function(roomStatus){
            console.log('房间信息',roomStatus)
            // this.model.set('roomStatus', _.extend(this.model.get('roomStatus'), roomStatus));
            // this.model.set('roomStatus', _.extend(this.model.get('roomStatus'), roomStatus));
            this.model.set('roomStatus', roomStatus);

        },

        onRecvSalutatoryInfo: function(salutatory, curIndex){
            console.log(salutatory,curIndex)
            this.model.set('roomNotice'+curIndex, salutatory);
        },

        onRecvOperateFlag: function(uin, operateFlagString){
            Permission.set('operateFlagString', operateFlagString);

            console.log('option',operateFlagString)
        },

        onRcvGetRoomInfo: function(roomInfo){
            console.log('onRcvGetRoomInfo', roomInfo);
            this.model.set('roomInfo', roomInfo);
            Permission.set('managerRoomAdmin', true)
        },

        onRcvSongList: function(songList){
            console.log('获取整个麦序列表')
            // 获取整个麦序列表
            SongList.reset(Container.GetSongVector());
        },

        onRcvAddSong: function(songInfo){
            console.log(songInfo);
            SongList.reset(Container.GetSongVector());
        },

        onRcvStartSong: function(songInfo, voteCount){
            console.log('开始上麦',songInfo, voteCount);
            this.contentView.allViedosView.viedo1.goMarker(songInfo);
            SongList.reset(Container.GetSongVector());
            Permission.set('currentSong', songInfo);
        },

        onRcvStopSong: function(songInfo){
            console.log('下麦',songInfo);
            this.model.get('allViews').viedo1.leaveMarker(songInfo);
            // 当前用户设为空
            Permission.set('currentSong', null);
        },

        onRcvDelSong: function(){
            SongList.reset(Container.GetSongVector());
        },

        onRcvFirstSong: function(songInfo) {
            console.log(songInfo)
            SongList.reset(Container.GetSongVector());
        },

        onRcvMikeStatus: function(songList, voteCount){
            console.log(songList, voteCount)

            if(songList[0].uin !== -1) {
                this.model.get('allViews').viedo2.goMaster(songList[0], 0);
            } else {
                this.model.get('allViews').viedo2.leaveMaster(0);
            }

            if(songList[1].uin !== -1) {
                this.model.get('allViews').viedo3.goMaster(songList[1], 1);
            } else {
                this.model.get('allViews').viedo3.leaveMaster(1);
            }

            Permission.set('currentMikeList', songList);
            SongList.reset(Container.GetSongVector());
        },

        /**
         * [onRcvPauseSong 是否暂停麦序
         * @param  {Uint} wParam 1: 暂停麦序 0: 开启麦序
         */
        onRcvPauseSong: function(wParam){
            
            this.model.get('allViews').orderView1.orderInit(wParam);
            this.model.get('allViews').orderView2.orderInit(wParam);
        },

        onRcvLockMikeStatus: function(isLockMike){
            this.model.get('roomInfo').m_bLockMike = isLockMike;
            this.model.get('roomStatus').m_bLockMike = isLockMike;
        },

        onRcvChatText: function(srcUin,destUin,msg,topflag,type,thirdIconIndex,consumeLevelPicIndex){
            var allViews = KtvModel.get('allViews');
            var myUid = this.model.get('userInfo').uid;
            // 获得用户昵称
            var srcNick = allViews.userListView.getUserByUin(srcUin).get('nick');
            var chatObj;

            var msgObj = allViews.chatInputView.parseMsg(msg);
            var ReceiveUin = parseInt(msgObj.ReceiveUIN);
            var bIsStealth = parseInt(msgObj.IsStealth);

            chatObj = {
                time: this.getCurrentTime(),srcUin: srcUin,destUin: ReceiveUin,msg: msgObj.msg,topflag: topflag,type: type,
                thirdIconIndex: thirdIconIndex,consumeLevelPicIndex: consumeLevelPicIndex,srcNick: srcNick
            };
            if(ReceiveUin === 0) {
                chatObj.destNick = '所有人';
                allViews.chatMessageView.showMsg('chatMsg', chatObj);
            }else if(ReceiveUin === 1) {
                allViews.roomNoticeView.showMsg('systemSimple',{
                    time: this.getCurrentTime(),
                    msg: '不能向自己发送讯息!'
                });
            }else if(ReceiveUin === myUid || srcUin === myUid) {

                chatObj.destNick = this.asideView.userListView.getUserByUin(ReceiveUin).get('nick');
                // ReceiveUin == myUid ? chatObj.destNick = "我":chatObj.destNick = this.asideView.userListView.getUserByUin(ReceiveUin).get('nick');
                //srcUin == myUid ? chatObj.srcNick = "我":chatObj.srcNick = this.asideView.userListView.getUserByUin(srcUin).get('nick');

                chatObj.destNick = allViews.userListView.getUserByUin(ReceiveUin).get('nick');
                console.log(chatObj)
                allViews.roomNoticeView.showMsg('privateChat',chatObj);
            }else if(1 !== bIsStealth) {

                // 既不是发送者也不是接受者，消息显示在公聊区
                allViews.chatMessageView.showMsg('chatMsg', chatObj);
            }

        },

        onRcvUseGoods: function(goodInfo){
            var allViews = KtvModel.get('allViews');
            var myUid = KtvModel.get('userInfo').uid;

            goodInfo.img = allViews.prizeView.getPrizeByIndex(goodInfo.goodsid.toString()).get('img');
            goodInfo.time = this.getCurrentTime();

            allViews.chatMessageView.showMsg("goodMsg",goodInfo);
            allViews.roomNoticeView.showMsg('goods', goodInfo);
        },

        onOnRecvAddBroadcast: function(str, uin, nick, roomid, sendTime, roomType){
            var allViews = KtvModel.get('allViews');

            console.log(str, uin, nick, roomid, sendTime, roomType)
            allViews.noticeBoardView.trigger('show-broadcast', {
                str: str, uin: uin, nick: nick, roomid: roomid, sendTime: sendTime, roomType: roomType
            });
        },

        onRecvTemporaryNotice: function(notice , sendUin, sendUserNick){
            var allViews = KtvModel.get('allViews');

            console.log(notice , sendUin , sendUserNick);
            allViews.roomNoticeView.showMsg('provisionalNotice', {
                notice: notice, sendUin: sendUin, sendUserNick: sendUserNick
            });
        },

        onRcvGetMemberOrDeny: function(isMember,uinCount,uinList) {
            console.log(isMember,uinCount,uinList);
        },

        onRcvRoomOpen: function() {
            console.log('房间打开');
            var allViews = this.model.get('allViews');

            this.model.get('roomInfo').flag = 1;
            this.model.get('roomStatus').flag = 1;

            allViews.roomNoticeView.showMsg('systemSimple', {
                time: this.getCurrentTime(),
                msg: '房间被打开'
            });
        },

        onRcvRoomClose: function(){
            console.log('房间关闭');
            var allViews = this.model.get('allViews');
            
            this.model.get('roomInfo').flag = 0;
            this.model.get('roomStatus').flag = 0;

            allViews.roomNoticeView.showMsg('systemSimple', {
                time: this.getCurrentTime(),
                msg: '房间被关闭'
            });
        },

        onRcvChatFlower: function(colorObj){
            var allViews = KtvModel.get('allViews');
            var srcUin = colorObj["srcUin"],desUin=colorObj["destUin"],srcNick="",desNick="",desUser;
            var myUid = this.model.get('userInfo').uid;
            desNick = desUin==0?"所有人":"";
            var srcUser = UserList.findWhere({uid:srcUin});
            if(colorObj["destUin"]!=0){
                desUser=UserList.findWhere({uid:desUin});
                desNick = desUser.get('nick');
            }
            var data = {
                time:srcUser.get("time"),
                srcNick:srcUin==myUid?"我":srcUser.get('nick'),
                srcUin:srcUin,
                desNick:desNick,
                desUin:desUin,
                html: KtvModel.get('globleData').html
            }
            srcUin==myUid ? allViews.roomNoticeView .showMsg("colorBar",data):allViews.chatMessageView.showMsg("colorBar",data);

        },

        onRecvUseStamp: function(srcUin,desUin,sealType,sealId,sealName){
            console.log(arguments)
            //[123456, 123456, 1, 1, "լ��"] 
            var allViews = KtvModel.get('allViews'),myUid = this.model.get('userInfo').uid,srcNick="",desNick="",info="";
            var desnick = allViews.chatInputView.$('.combobox-input').val();
            srcNick = myUid==srcUin?"我":srcUin;
            desNick = myUid==desUin ?"我":desnick;
            info=srcNick+"给"+desNick+"("+ desUin +")"+"刻上了 ["+ sealName + "] 的印章"
            allViews.roomNoticeView.showMsg('systemSimple',{time:this.getCurrentTime(),msg:info});
        },

        onOnRecvVote: function(voteInfo){
            var allViews = this.model.get('allViews');
            var myUid = this.model.get('userInfo').uid;
            var step = voteinfo.step;
            var remainBallot = voteinfo.remainBallot;
            var inOneHundred = voteinfo.inOneHundred;
            var distance = voteinfo.distance;
            var order = voteinfo.order;
            var uin = voteinfo.uin;
            var actUin = voteinfo.actuin;
            var roomId = voteinfo.roomid;
            var actUinBallot = voteinfo.actuinBallot;

            var userInfo = UserList.findWhere({ uid: uin });
            var actUserInfo = UserList.findWhere({ uid: actuin });
            var currentSong;

            if(!userInfo || !actUserInfo ) return;

            currentSong = allViews.permissionView.get('currentSong');

            if( currentSong ) {
                if(currentSong.songuserid === actUin) {
                    if(actUserInfo.flag & Ktv.imConst.userRghtFlag.USER_FLAG_CONTRACT_SINGER || actUserInfo.flag & Ktv.imConst.userRghtFlag.USER_FLAG_STAR_SINGER) {
                        console.log(actUinBallot)
                    }
                }
            }

            // 判断是否为自己
            if(myUid === uin) {
                allViews.roomNoticeView.showMsg('systemSimple', {
                    time: this.getCurrentTime(),
                    msg: '您成功投票给'+actUin+'('+actUserInfo.nick+')1票'
                });
            }
        },

        onRecvForbidChat: function(actuin, uin){
            console.log(actuin, uin)
        },

        onRcvReleaseForbitChat: function(actuin, uin){
            console.log(actuin, uin)
        },

        onRcvKickUser: function(uid, kickReason, uinMag, bShowIfNotSelf, index, bShowNotifyDlg){
            console.log(uid, kickReason, uinMag, bShowIfNotSelf, index, bShowNotifyDlg)
            var myUid = this.model.get('userInfo').uid;
            var allViews = this.model.get('allViews');

            if(uid === myUid) {
                this.trigger('close');
                return;
            }

            if(uinMag === myUid) {
                allViews.roomNoticeView.showMsg
                return;
            }
        },

        onRecvForceOutIP: function(actuin, uin){
            console.log(actuin, uin)
        },

        onRtmpPublishManagerMsg: function(){

        },

        onRtmpPublishManagerNetInfo: function(){

        },

        onRtmpPublishManagerComputerStatusInfo: function(){

        },

        onRtmpPlayManagerMsg: function(){

        },

        onRtmpPlayManagerNetInfo: function(){

        },

        onRtmpPlayManagerComputerStatusInfo: function(){

        },

        onRtmpPlayManagerAVInfo: function(){

        }
    });

    return SignalsView;
});
