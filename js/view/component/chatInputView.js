// 聊天用户输入
define([
    'backbone',
    'collections/emotionlist',
    'collections/userlist',
    'models/ktvModel'
], function(Backbone, EmotionList, Userlist, KtvModel) {
    'use strict';

    var ChatInputView = Backbone.View.extend({

        el: '.ktv-handle-box',

        options:{
            colorBars : {},
            selectUin:"",
            flag:false,
            dealFlag:true,
            media:$(".media"),
            mediaConfig:$("#mediaConfig").find("span")
        },
        emotionTemplate: _.template('<span class="thumb-box"><img class="thumb-img" width="24" height="24"  src="<%= path %>" title="<%= tooltip %>"></span>'),

        events: {
            'click .smilies-box': 'popoverSmile',
            'click .broadcast-icon': 'popBrodcastMenu',
            'click .sendBtn': 'sendMsg',
            'click .markerBtn': 'beginMarker',
            'click .thumb-box': 'selectFace',
            'click .seal-box': 'sealDialog',
            'click .voiceSetBtn': 'setVoiceDialog',
            'click .system-broadcast': 'publishBroadcastDialog',
            'click .temp-notice': 'tempNoticeDialog',
            'click .font-box': 'fontBoxDialog',
            //'click .colour-bar-box':'colorBarManager',
            'click .colour-bar-icon': 'popColourMenu',
            'click .system-color': 'colorBarManager',
            'click .manage-icon-box': 'manageDialog',
            'click .vote-icon': 'sendVote',
            'click .set-icon-box': "popSetMenu",
            'click .setDeal': "setManager",
            'mouseover .sub':"showMenu",
            'mouseleave .sub':"hideMenu",
            'click .calm':"calmDown",
            'change :radio[name="audioMix"]':"isMic",            
            'click .bgmusicBtn':"isBgMusic",
            'click .voiceBtn':"audioManager"
            
        },

        initialize: function() {
            this.typeBox = this.$('.type-area');

            this.delegateEvent();
        },

        render: function() {

            // this.renderDialog();
            this.renderUI();
            this.macVoiceListen();
            return this;
        },

        renderUI: function(){

            // 渲染用户框
            this.sendUser = new Boia.Combobox({
                boundingBox: '.send-user',
                onListClick: function(target){
                    var value = $(target).data('value');
                    $(this.contentBox).data('uid', value);

                    $('.ktv-prize-box .receive-user').text($(target).text()).data('uid', value);
                }
            });
        },

        delegateEvent: function(){
            this.listenTo(EmotionList, 'reset', this.emotionListInit);
        },

        // 表情图片初始化
        emotionListInit: function(emotionList){
            console.log(emotionList)
            emotionList.each(function(emotion){
                // console.log(emotion.get('type'), emotion.toJSON())
                // console.log(this.emotionTemplate(emotion.toJSON()))
                this.$('.emotion-box'+emotion.get('type')).append(this.emotionTemplate(emotion.toJSON()));
            }, this);
        },

        /**
         * addChatUser 增加聊天用户
         * @param {Model} userInfo 用户信息
         */
        addChatUser: function(userInfo){
            if(!userInfo){
                this.$('.combobox-input').val("所有人");
                $(this.sendUser.contentBox).data('uid', 0);
            }else{
                this.changeUser(userInfo);
            }
        },
        changeUser:function(userInfo){
            var compiledLiNode = _.template('<li class="combobox-result" data-value="<%= uid %>"><%= nick %></li>');
            var uid = this.options.selectUin  = parseInt(userInfo.get('uid'));
            var myUid = KtvModel.get('userInfo').uid;
            var nick = userInfo.get('nick');
            var array = [], index;

            _.each(this.$('.combobox-drop .combobox-result'), function(item){
                array.push($(item).data('value'));
            });

            if(uid !== myUid) {
                if(_.lastIndexOf(array, uid) === -1) {
                    this.$('.combobox-drop').append(compiledLiNode({uid: uid, nick: nick}));
                }
            }else {
                nick = '自己';
            }

            this.$('.combobox-input').val(nick);
            $(this.sendUser.contentBox).data('uid', uid);
        },
        // 弹出表情框
        popoverSmile: function(event){
            event.stopPropagation();

            this.$('.smilies-popover').show();
        },

        // 弹出广播菜单
        popBrodcastMenu: function(){
            event.stopPropagation();

            this.$('.broadcast-dropdown-menu').show();
        },
        // 弹出彩条菜单
        popColourMenu: function(){
            this.setColorBars();
            event.stopPropagation();
            this.$('.color-dropdown-menu').show();
        },
        // 弹出设置菜单
        popSetMenu: function(){
            event.stopPropagation();
            var rootFlag = KtvModel.get("allViews").permissionView.isCanForbidChat();
            if(rootFlag){
                $(".root").removeClass("root");
            }
            var $set =$('.set-dropdown-menu');
            $set.show();
        },
        // 选择表情
        selectFace: function(event){
            var target = $(event.currentTarget);

            this.typeBox.append($.trim(target.html()));
            this.$('.smilies-popover').hide();
        },

        // 弹出设置音频框
        setVoiceDialog: function(event){
            // $('#voiceSetDialog').dialog('open').removeClass('hide');
        },

        // 弹出发布广播消息框
        publishBroadcastDialog: function(event){
            var allViews = KtvModel.get('allViews');
            event.preventDefault();
            // $('#publishBroadcastDialog').dialog('open').removeClass('hide');
            var publishPage = Container.createView('/public/html/assets/publishBroadcast.html');

            publishPage.show();
        },

        // 弹出临时公告对话框
        tempNoticeDialog: function(event){
            event.preventDefault();
            // $('#tempAnnouncementDialog').dialog('open').removeClass('hide');
            var tempAnnouncementPage = Container.createView('/public/html/assets/tempAnnouncement.html');

            tempAnnouncementPage.show();
        },

        // 弹出印章对话框
        sealDialog: function(event){
            event.preventDefault();
            var uin =$(this.sendUser.contentBox).data('uid');
            uin = uin==1? KtvModel.get('userInfo').uid : uin;
            var sealPage = Container.createView('/public/html/assets/seal.html',{sealList: KtvModel.get('globleData').sealList,selectUin:uin});
            sealPage.setModal();
            sealPage.show();
        },
        //音频设置
        audioManager:function(event){
            event.preventDefault();
            var audioPage = Container.createView('/public/html/assets/audio.html');
            //sealPage.setModal();
            audioPage.show();
        },
        //打开字体设置
        fontBoxDialog:function(event){
            event.preventDefault();
            var sealPage = Container.createView('/public/html/assets/fontSet1.html');
            sealPage.setModal();
            sealPage.show();
        },
        //set字体
        setFont:function(){
            var instance = this;
            $.each($.parseJSON(Container && Container.ReadFile('public/config_file/font.json')),function(k,v){
                console.log(k,v)
                "bold" == v ? k ="font-weight":k;
                "normal" == v ? instance.typeBox.css("font-weight",""):"";
                v = "color" == k ?"#"+parseInt(v,10):v;
                k="Underline"==k?"text-decoration":k;
                v="text-decoration"==k && v==true?"underline":v;
                v="text-decoration"==k && v==false?"none":v;
                instance.typeBox.css(k,v);
            });

            return this;
        },
        /**
         * manageDialog 管理对话框
         */
        manageDialog: function(event){
            var roomInfo = KtvModel.get('roomInfo');
            var roomNotice1 = KtvModel.get('roomNotice1');
            var managePage;

            if(KtvModel.get('allViews').permissionView.isCanManageRoom()) {
                managePage = Container.createView('/public/html/assets/manage.html');

                managePage.setValue('room-info', roomInfo);
                managePage.setValue('room-notice', {notice1: roomNotice1});

                managePage.setModal();
                managePage.show();                
            }
        },

        /**
         * sendVote 给用户投票
         * @return {[type]} [description]
         */
        sendVote: function(){
            var userInfo = KtvModel.get('userInfo');
            var destUin = $(this.sendUser.contentBox).data('uid'), destInfo;

            if(destUin === 0) {
                this.showSysMsg("不能对所有人投票!");               
                return;
            }
            if(destUin === 1 || (userInfo.uid === destUin)) {
                this.showSysMsg("不能对自己投票!");                
                return;                
            }
            destInfo = Userlist.findWhere({uid: destUin});
            if(destInfo) {
                if(!(destInfo.flag&Ktv.imConst.userRghtFlag.USER_FLAG_CONTRACT_SINGER || destInfo.flag&Ktv.imConst.userRghtFlag.USER_FLAG_STAR_SINGER)) {
                    this.showSysMsg("您选择的用户不是艺人无法进行赠送!");                    
                    return;
                }
            }
            Container && Container.SendVote(destUin);
        },

        /**
         * 获取彩条
         */
        setColorBars:function(data){
            //index html name
            var _this=this,bars = data||[];
            $(bars).each(function(i, item){
                var listNode = _.template('<li class="system-color" data-index="<%= index %>" data-html="<%= html %>">"<%= name %>"</li>');
                $('.color-dropdown-menu').append(listNode(item));
            });

            return this;
        },
        // 发送消息
        sendMsg: function(){
            var instance = this;
            var userInfo = KtvModel.get('userInfo');
            var msg = instance.typeBox.html();
            var destUin = $(this.sendUser.contentBox).data('uid');
            var bIsStealth = this.$('#isQuietly').prop('checked') ? 1 : 0;

            instance.typeBox.empty();

            if(msg) {
                if(userInfo.uid !== destUin) {
                    // 发信息
                    var fontConfig = $.parseJSON(Container && Container.ReadFile('public/config_file/font.json'));
                    Container && Container.SendChatText(true, userInfo.uid, 0, this.fomartMsg({
                        msg: msg, Bold: fontConfig.Bold, Italic: fontConfig.Italic, Underline: fontConfig.Underline ,
                        FontColor: fontConfig.color,
                        FontSize: parseInt(fontConfig["font-size"].substring(0,fontConfig["font-size"].length-2)),
                        FontName: fontConfig["font-name"],
                        SendUIN: userInfo.uid, ReceiveUIN: destUin, IsStealth: bIsStealth, Action: ''}), 0);                    
                }else {
                    this.showSysMsg("不能向自己发送讯息!");                   
                }
            }
        },

        /**
         * parseMsg 解析聊天信息字符串
         * @param  {string} msg 聊天
         */
        parseMsg: function(msg){
            var FmtHead = '#<FMT_HEAD';
            var FmtEnd = '\\FMT_END#>';
            var spiltArray = [], str = '';
            // 判断是否是聊天
            if(msg.substr(0, 6) === '$CHAT$') {
                // 删除字符头
                msg = msg.substring(17);

                spiltArray = msg.split(FmtEnd);

                str = spiltArray[0].replace(/\s/g, '","').replace(/=/g, '":"');

                return JSON.parse('{"'+str+'","msg":"'+spiltArray[1]+'"}');
            }

            return false;
        },

        /**
         * fomartMsg 格式化聊天信息
         * @param  {Object} msgObj 聊天对象
         * @return {String}        格式化好的字符串
         */
        fomartMsg: function(msgObj){
            var TEXT_PROTOCAL_CHAT = '$CHAT$';
            var FmtHead = '#<FMT_HEAD';
            var FmtEnd = '\\FMT_END#>';
            var fomartedString = '', str = '';

            for(var prop in msgObj) {
                if(prop !== 'msg') {
                    str += ' '+prop+'='+msgObj[prop];
                }
            }

            fomartedString = TEXT_PROTOCAL_CHAT+FmtHead+str+FmtEnd+msgObj.msg;
            console.log(fomartedString)
            return fomartedString;
        },

        // 开始排麦
        beginMarker: function(){
            var roomSongInfo = KtvModel.get('roomSongInfo');

            Container && Container.SendAddSong(roomSongInfo.songid, roomSongInfo.songname, roomSongInfo.songuserid, roomSongInfo.songusernick);
            roomSongInfo.songid++;
        },
        //发送彩条
        colorBarManager:function(event){
            var target = $(event.currentTarget);
            var text = $(".combobox-input").val();
            if("自己" == text){
                this.showSysMsg("不能向自己发送彩条!")                
            }else{
                var desUin = $(this.sendUser.contentBox).data('uid');
                KtvModel.get('globleData').html = target.data('html');
                Container && Container.SendChatFlower(true, desUin,0  ,target.data('index'));
            }
        },
        //系统消息显示 监听
        showSysMsg:function(msg){
             var allViews = KtvModel.get("allViews");
             allViews.roomNoticeView.showMsg('systemSimple',{
                time: allViews.ktvView.getCurrentTime(),
                msg: msg
            });
        },
        //设置菜单点击事件
        setManager:function(event){
            var $target = $(event.currentTarget),dealFlag = $target.attr("deal");

            this.options.dealFlag  == dealFlag  ? ($target.removeClass("check"),this.options.dealFlag  = true):($target.addClass("check"),this.options.dealFlag  = dealFlag);

            console.log(dealFlag);

        },
        //显示子菜单
        showMenu:function(e){
            var $menu =  $(e.currentTarget),el = $menu.attr("call"),$subMenu=$("#"+el),$set =$('.set-dropdown-menu'),offset=$menu.offset();
            var left = offset.left+$set.width()- $(this.el).offset().left+ 2,top=offset.top-2*($menu.height());
            $subMenu.css("position","absolute");
            $subMenu.css("left",left);
            $subMenu.css("top",top);
            $subMenu.show();
            this.dealSubMenu($subMenu);
        },
        //隐藏
        hideMenu:function(e){
            var $menu =  $(e.currentTarget),el = $menu.attr("call"),$subMenu=$("#"+el);
            if(!this.options.flag){
                $subMenu.hide();
            }
        },
        dealSubMenu:function($subMenu){
            var _this = this;
            $subMenu.mouseover (function(){
                $subMenu.show();
                _this.options.flag = true;
            }).mouseleave (function(){
                $subMenu.hide();
                _this.options.flag = false;
            });
        },
        //麦克风&音量 监听
        macVoiceListen:function(){
           var self=this,$media = this.options.media,$range = $media.find("input"),pkt={};
           $($range).each(function(idx,range){
               range.addEventListener("mouseup",function(){
                  var type = $(this).attr("id"),value = $(this).val();
                  $("#"+type+"Config").attr("value",value);
                  self.saveMacVoice();    
               });
           });                    
        },
        //静音&闭麦 监听
        calmDown:function(e){
            var target = e.currentTarget,type=target.getAttribute("name"),value=target.getAttribute("value"),flag="0";
            var num = $.parseJSON(Container && Container.ReadFile('public/config_file/mediaConfig.json'))[type+"Config"];
            flag = "1"==value ? "0":"1"; 
            this.setCalmDown(target,type,flag,num);
            
        },
        //设置静音闭麦
        setCalmDown:function(target,type,flag,num){
           var $type = $("#"+type);
           target.setAttribute("value",flag);
           $("#"+type+"Press").attr("value",flag);  
           "0" == flag ? $(target).removeClass(type+"-icon").addClass(type+"-icon-press"):$(target).removeClass(type+"-icon-press").addClass(type+"-icon");          
           "1" == flag ? $type.attr("disabled",false) : $type.attr("disabled",true);         
           "0" == flag ? document.getElementById(type).value=flag: document.getElementById(type).value=num;
           this.saveMacVoice();
        },
        //麦克风&混音 监听
        isMic:function(e){
           var target = e.currentTarget,value=target.getAttribute("value");
           this.$("#isMic").attr("value",value);
           this.saveMacVoice();
        },
        //是否显示背景音乐
        isBgMusic:function(e){
           var target = e.currentTarget,value=target.getAttribute("value");
           console.log(value);
           "1" == value ? (target.addClass("no-music"),value="0") : (target.removeClass("no-music"),value="1");
           target.setAttribute("value",value);
           $("#isBgMusic").attr("value",value);
           this.saveMacVoice();
        },
        //获取并保存mediaConfig信息
        saveMacVoice:function(){
           var $mediaConfig = this.options.mediaConfig,pkt={};
            $($mediaConfig).each(function(idx,config){
                pkt[config.id] = config.getAttribute("value");
            });
          Container && Container.WriteFile('public/config_file/mediaConfig.json',JSON.stringify(pkt));
        }
    });

    return ChatInputView;
});
