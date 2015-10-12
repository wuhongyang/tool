// 视频
define([
    'backbone',
    'models/ktvModel'
], function(Backbone, KtvModel) {
    'use strict';

    var ViedoView = Backbone.View.extend({

        el: '.ktv-viedo-box',

        events: {
            'click .video-menu': 'videoMenu',
            'click .viedo': 'handleViedo',
            'click .audio': 'handleAudio',
            'click .net': 'handleNet',
            'click .photo': 'photo',
            'click .marker': 'handleMarker',
            'click .master': 'handleMaster'
        },

        initialize: function() {
        },

        render: function() {
            return this;
        },

        delegateEvent: function(){
            this.on('open-viedo', this.openViedo);
            this.on('close-viedo', this.closeViedo);
            // this.on('go-marker', this.goMarker);
            this.on('leave-marker', this.leaveMarker);
        },

        // 弹出视频菜单
        videoMenu: function(event){
            var target = $(event.currentTarget);
            
            event.stopPropagation();
            event.preventDefault();

            this.$('.viedo-dropdown-menu').show()
                                .css('left', event.pageX-this.$('.dropdown-menu').width()*2-100)
                                .css('top', event.pageY-this.$('.dropdown-menu').height()+60);
        },

        // 处理上下麦
        handleMarker: function(event){
            var target = $(event.currentTarget);
            var roomSongInfo = KtvModel.get('roomSongInfo');

            if('上麦' === target.text()) {
                // this.goMarker();
                // this.trigger('go-my-marker');
                Container && Container.SendAddSong(roomSongInfo.songid, roomSongInfo.songname, roomSongInfo.songuserid, roomSongInfo.songusernick);
                roomSongInfo.songid++;
            }else {
                Container && Container.SendStopSong();
            }
        },

        // 处理上下管
        handleMaster: function(event){
            var target = $(event.currentTarget);

            if('上管' === target.text()) {
                // this.goMaster();
                Container && Container.SendMikeSendTo(parseInt($('.myUserId').text()), target.data('index'));
            }else {
                console.log(parseInt($('.myUserId').text()))
                // this.leaveMaster();
                Container && Container.SendMikeTakeBack(parseInt($('.myUserId').text()));
            }
        },

        // 处理视频
        handleViedo: function(event){
            var target = $(event.currentTarget);
            var num = target.parent('.viedo-dropdown-menu').data('menu');
            event.preventDefault();

            if(target.hasClass('clo')) {;
                this.openViedo();
            }else {
                this.closeViedo();
            }
            
        },

        // 处理音频
        handleAudio: function(event){
            var target = $(event.currentTarget);
            var num = target.parent('.viedo-dropdown-menu').data('menu');
            event.preventDefault();

            if(target.hasClass('clo')) {
                target.find('.link').text('关闭声音');
                this.openAudio(target);
            }else {
                target.find('.link').text('打开声音');
                this.closeAudio(target);
            }
            target.toggleClass('clo');
        },

        // 处理网络
        handleNet: function(event){
            var target = $(event.currentTarget);
            var num = target.parent('.viedo-dropdown-menu').data('menu');
            event.preventDefault();

            if(target.hasClass('off')) {
                target.find('.link').text('断开');
                this.onNet();
            }else {
                target.find('.link').text('连接');
                this.offNet();
            }
            target.toggleClass('off');
        },

        // 拍照
        photo: function(event){
            event.preventDefault();
            console.log('拍照')
        },

        // 设置麦序信息
        setSongInfo: function(){
            var obj = this.$('.viedo-object')[0];

            //alert("onBtnClicked");
            var m_strScheduleSvr = 'testrtmp.vvku.com:1966';
            var m_strPublishRoomInfo = 'live';
            var m_strPublishStageInfo = 'stream1';

            //@ video paragment
            var m_iVdFps = 10;
            var m_iVdBitRate = 160;
            var m_iVdWidth = 320;
            var m_iVdHeight = 240;
            var m_iVdQuality = 80;

            //@ audio para
            var m_iAdSampleRate = 44100;
            var m_iAdBitRate = 32;
            var m_iAdChannels = 2;
            var m_iAdBitPerSample = 16;
            var m_iAdVolum = 80;
            var m_bAdMute = false;
            console.log(m_iAdSampleRate,m_iAdBitRate,m_iAdChannels,m_iAdBitPerSample,m_iAdVolum,m_bAdMute);

            var capIndex = 0;
            var micIndex = 0;
            console.log(capIndex,micIndex);     
            
            if(obj.setCam) {
                obj.setCam(capIndex);
                obj.setMic(micIndex);
                obj.setPublishAudioPara(m_iAdSampleRate, m_iAdChannels, m_iAdBitPerSample, m_iAdBitRate, m_iAdVolum, m_bAdMute);
                obj.setPublishVideoPara(m_iVdWidth, m_iVdHeight, m_iVdFps, m_iVdBitRate);
                obj.setPublishStreamPara(m_strScheduleSvr, m_strPublishRoomInfo, m_strPublishStageInfo);
                obj.startPublish();
            }       
        },    

        // 上麦
        goMarker: function(songInfo){
            var viedoSongListInfo = KtvModel.get('viedoSongListInfo');
            var viedoSongInfo = KtvModel.get('viedoSongInfo');
            var allViews = KtvModel.get('allViews');

            viedoSongInfo.isOnline = true;
            viedoSongInfo.uid = songInfo.songuserid;
            viedoSongInfo.nick = songInfo.songusernick;

            $.each(viedoSongListInfo, function(index, item){
                if(item.isOnline && (item.uid === viedoSongInfo.uid)){

                    allViews['viedo'+(item+2)].leaveMaster();
                    console.log(allViews.viedo2)
                }
            });

            this.$('.viedo-info .viedo-status').text('下麦');
            // this.openViedo();
            this.setSongInfo();
        },

        // 下麦
        leaveMarker: function(){
            var obj = $('#viedo1 .viedo-market')[0];
            var viedoSongInfo = KtvModel.get('viedoSongInfo');

            viedoSongInfo.isOnline = false;

            $('#viedo1 .viedo-status').text('上麦');
            // this.closeViedo();
            obj.stopPublish && obj.stopPublish();
        },

        // 上管
        goMaster: function(songInfo, which){
            var presideSongInfo = KtvModel.get('viedoSongListInfo')[which];
            var viedoSongInfo = KtvModel.get('viedoSongInfo');

            presideSongInfo.isOnline = true;
            presideSongInfo.uid = songInfo.uin;
            presideSongInfo.nick = songInfo.name;

            if(viedoSongInfo.isOnline && (viedoSongInfo.uid === presideSongInfo.uid)){
                this.leaveMarker();
            }

            this.$('.viedo-info .viedo-status').text('下管');
            // this.openViedo();
            this.setSongInfo();
        },

        // 下管
        leaveMaster: function(which){
            var obj = this.$('.viedo-object')[0];
            var presideSongInfo = KtvModel.get('viedoSongListInfo')[which];

            presideSongInfo.isOnline = false;

            this.$('.viedo-info .viedo-status').text('上管');
            // this.closeViedo();
            obj.stopPublish && obj.stopPublish();
        },

        // 打开视频
        openViedo: function(){
            var obj = this.$('.viedo-object')[0];
            var m_strScheduleSvr = 'testrtmp.vvku.com:1966';
            var m_strPublishRoomInfo = 'live';
            var m_strPublishStageInfo = 'stream1';

            var addevIndex = 0;
            var m_iAdVolum = 80;
            var m_bAdMute = false;

            this.$('.viedo').toggleClass('clo').find('.link').text('关闭视频');

            if(obj.setStreamInfo) {
                obj.setStreamInfo(m_strScheduleSvr, m_strPublishRoomInfo, m_strPublishStageInfo);
                obj.setAudioPlayDev(addevIndex);
                obj.setAdPara(m_iAdVolum, m_bAdMute);
                obj.startPlay();                
            }
        },

        // 关闭视频
        closeViedo: function(){
            var obj = this.$('.viedo-object')[0];

            this.$('.viedo').toggleClass('clo').find('.link').text('打开视频');

            obj.stopPlay && obj.stopPlay();
        },

        // 打开音频
        openAudio: function(){

        },

        // 关闭音频
        closeAudio: function(){

        },

        // 断开连接
        offNet: function(){

        },

        // 打开连接
        onNet: function(){

        }

    });

    return ViedoView;
});
