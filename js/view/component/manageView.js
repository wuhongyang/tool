var Container  = window.Container;
var roomInfo = Container && Container.getValue('room-info') || {};
var roomNotice = Container && Container.getValue('room-notice') || {};

$(function() {

    // 拖动事件
    $('body').on('mousedown', function(event){
        if(event.button != 0) return;

        var target = $(event.target);

        if(target.hasClass('isDrag')) {
            Container && Container.startMove(event.screenX,event.screenY);
        }
    });

    var ManageView = Backbone.View.extend({
        el: '.manage-box',

        events: {
            'click .nav-tabs .link': 'renderTab',
            'change .passVerify': 'passVerify',
            'click .update-btn': 'updateRoomInfo',
            'click .tool-close': 'closePage',
            'click .user-list': 'userSelect',
            'click .add-btn': 'addMember',
            'click .delete-btn': 'deleteMember'
        },

        initialize: function() {
            this.initPage();
        },

        // 初始化页面数据
        initPage: function(){
            Container && Container.setSize(650,460);
            Container && Container.onDOMContentLoaded();
            this.initRoomData();
        },

        render: function() {

            return this;
        },

        // tab栏点击
        renderTab: function(event){

            event.preventDefault();
            $(event.currentTarget).parent().addClass("active").siblings().removeClass("active");
            $(event.currentTarget.hash).show().siblings().hide();            
        },

        // 初始化房间信息
        initRoomData: function(){
            $('#roomNotice').val(roomNotice.notice1);

            $('#roomName').val(roomInfo.name);
            $('#roomDescript').val(roomInfo.descript);
            $('.shieldPublicChat').attr('checked', !!roomInfo.publictalkstat);
            $('.shieldPrivateChat').attr('checked', !!roomInfo.privatetalkstat);
            $('.autoPlayMTV').attr('checked', !!roomInfo.aotuplaystat);
            $('.k-mic[value='+roomInfo.m_bUseGoldMikeGift+']').attr('checked', true);
            $('.songBaby[value='+roomInfo.m_bUseMikeGift+']').attr('checked', true);
            $('.isLockViedo[value='+roomInfo.m_bLockMike+']').attr('checked', true);
            $('.member[value='+roomInfo.member+']').attr('checked', true);
            $('.isOpenRoom[value='+roomInfo.flag+']').attr('checked', true);

            $('.personSongLimit').val(roomInfo.maxoneshowlist);
            $('.songLimit').val(roomInfo.songmaxnum);
            $('.frequency').val(roomInfo.mikedelay);
            $('.buffer').val(roomInfo.mediadelay);
            $('.mikeLimit').val(roomInfo.m_nNoticeStepTime);   

        },

        // 获得设置的数据  给roomInfo赋值
        getRoomData: function(){
            roomNotice.notice1 = $('#roomNotice').val();

            roomInfo.name = $('#roomName').val();
            roomInfo.descript = $('#roomDescript').val();
            roomInfo.publictalkstat = $('.shieldPublicChat:checked').length ? 1 : 0;
            roomInfo.privatetalkstat = $('.shieldPrivateChat:checked').length ? 1 : 0;
            roomInfo.aotuplaystat = $('.autoPlayMTV:checked').length ? 1 : 0;
            roomInfo.m_bUseGoldMikeGift = parseInt($('.k-mic:checked').val());
            roomInfo.m_bUseMikeGift = parseInt($('.songBaby:checked').val());
            roomInfo.m_bLockMike = parseInt($('.isLockViedo:checked').val());
            roomInfo.member = parseInt($('.member:checked').val());
            roomInfo.flag = parseInt($('.isOpenRoom:checked').val());

            roomInfo.maxoneshowlist = parseInt($('.personSongLimit').val());
            roomInfo.songmaxnum = parseInt($('.songLimit').val());
            roomInfo.mikedelay = parseInt($('.frequency').val());
            roomInfo.mikedelay = parseInt($('.buffer').val());
            roomInfo.m_nNoticeStepTime = parseInt($('.mikeLimit').val());

            return {
                roomInfo: roomInfo,
                roomNotice: {
                    notice1: roomNotice.notice1
                }
            }            
        },

        // 更新房间信息
        updateRoomInfo: function(){

            Container && Container.fire('room-data-updata', this.getRoomData());
        },

        // 添加成员
        addMember: function(event){
            var instance = this;
            var target = $(event.currentTarget);

            Boia.MessageBox.prompt({
                title: '成员操作',
                bodyContent: '<span class="">用户ID:</span><input type="number" oninput=(value=this.value.replace(/\D+/g,"")) class="input-style" />',
                buttons: [{
                    label: '确定(Y)',
                    on: function() {
                        var val = this.getInputVal();

                        if(val) {
                            target.parent().prev().append('<div class="list user-list">'+val+'</div>');
                        }

                        this.close();
                    }
                },{
                    label: '取消(N)',
                    on: function() {
                        this.close();
                    }
                }]
            });
        },

        // 删除成员
        deleteMember: function(event){
            var target = $(event.currentTarget);

            target.parent().prev().find('.list').each(function(idx, list) {
                if(list.hasClass('selected')) {
                    list.remove();
                }
            });
        },

        // 选择用户
        userSelect: function(event){
            var target = $(event.currentTarget);

             this.$('.user-list').not(target.addClass('selected')).removeClass('selected');
        },

        // 密码验证
        passVerify: function(event){
            if(event.currentTarget.checked) {
                $('.pass-input').removeAttr('disabled');
            }else {
                $('.pass-input').attr('disabled', true).val('');
            }            
        },

        // 关闭页面
        closePage: function(){
            Container && Container.close();
        }
    });

    var manageView = new ManageView();

});