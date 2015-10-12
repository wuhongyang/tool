define([
    'backbone',
    'models/ktvModel'
], function(Backbone,KtvModel) {
    'use strict';

    var PrizeView = Backbone.View.extend({

        el: '.ktv-prize-box',

        giftTemplate: _.template('<span class="gift-box" data-index=<%= index %> name="<%= name %>" value="<%= value %>" title="<%= tooltip %>" >'+
            '<img  class="thumb-img" width="40" height="40" src="<%= img %>"" /></span>'),

        giftIndex: -1,

        events: {
            /*'mouseover .gift-box': 'viewPrizeInfo',
             'mouseout .gift-box': 'hidePrizeInfo',*/
            'click .gift-box': 'selectPrize',
            'click .send-gift': 'givePrize',
            'click .gift-toggle': 'showBathDrop'
            // 'mouseout .gift-box': 'hidePrizeInfo'
        },

        initialize: function() {
            this.boundingBox = $(this.el);
            this.giftInfo = this.$('.ktv-gift-detail');

            this.delegateEvent();
        },

        render: function() {
            this.renderUI();

            return this;
        },

        renderUI: function(){
            this.amountCombo = new Boia.Combobox({
                boundingBox: '.amount-select',
                onListClick: function(target){}
            });
        },

        delegateEvent: function(){
            this.listenTo(this.collection, 'reset', this.prizeListInit);
        },

        // 礼物列表初始化
        /**
         * prizeListInit 礼物列表初始化
         * @param  {[type]} goodsList 礼物列表
         */
        prizeListInit: function(goodsList){
            goodsList.each(function(good){
                var ascription = good.get('ascription');

                this.$('#'+ascription).append(this.giftTemplate(good.toJSON()));
            }, this);
        },

        // 设置用户Q币和金币
        setUserMoney: function(inmoney, money){
            this.$('.inmoney').text(inmoney);
            this.$('.money').text(money);
        },
        getUserMoney: function(){
            return {
                inmoney: parseInt(this.$('.inmoney').text()),
                money: parseInt(this.$('.money').text())
            };           
        },

        // 显示被送礼物用户
        showReceiveUser: function(userInfo){
            if(!userInfo){
                this.$('.receive-user').text("所有人").data('uid', 0);
            }else{
                this.changeUser(userInfo.toJSON());
            }
        },
        changeUser:function(userInfo){
            var nick = userInfo.nick;
            var uid = userInfo.uid;
            var myUid = KtvModel.get('userInfo').uid;

            if(uid === myUid) {
                nick = '自己';
            }
            this.$('.receive-user').text(nick).data('uid', uid);
        },
        //显示礼物信息
        viewPrizeInfo: function(event){
            var target = $(event.currentTarget);

            this.giftInfo.find('.img').attr('src', target.find('.thumb-img').attr('src'));
            this.giftInfo.find('.name').text(target.attr('name'));
            this.giftInfo.find('.val').text(target.attr('value'));
            this.giftInfo.find('.prizeContent').text(target.attr('prize'));
            this.giftInfo.removeClass('hide')
                .css('left', 25)
                .css('top', target.offset().top-35);
        },

        // 选择礼物
        selectPrize: function(event){
            var target = $(event.currentTarget);
            var index = target.data('index');

            this.giftIndex = index;
            if(target.hasClass('selected')) {
                this.giftIndex = -1;
            }
            this.$('.gift-box').not(target.addClass('selected')).removeClass('selected');
        },

        /**
         * @method givePrize 赠送礼物
         */
        givePrize: function(event){
            var instance = this;
            var num = parseInt(instance.$('#amount-combobox input').val());
            var giftIndex = this.giftIndex;
            var destUin = $('.receive-user').data('uid');
            var bIsStealth = this.$('#quietlyGive').prop('checked') ? 1 : 0;
            var allViews = KtvModel.get('allViews');
            var myUid = KtvModel.get('userInfo').uid;

            // 判断是否选择礼物
            if(giftIndex === -1) {
                Boia.MessageBox.alert({
                    bodyContent: '请选择一个礼物，总不能拿空气送人吧'
                });

                return;
            }

            // 判断是否选择数量
            if(!num) {
                Boia.MessageBox.alert({
                    bodyContent: '请选择礼物数量'
                });

                return;
            }

            num = isNaN(num) ? 1: num;

            if(destUin === 0) {
                allViews.roomNoticeView.showMsg('systemSimple', {
                    time: allViews.ktvView.getCurrentTime(),
                    msg: '不能对所有人赠送礼物'
                });
                return;
            }

            if(giftIndex !== -1){
                Container && Container.SendUseGoods(destUin, 1, giftIndex, num, bIsStealth);
            }
        },

        // 隐藏礼物盒子
        hidePrizeInfo: function(event){
            this.giftInfo.addClass('hide');
        },

        // 显示批量送出的信息
        showBathDrop: function(event){
            event.stopPropagation();

            this.$('.bath-dropdown').show();
        },

        // 通过索引获得礼物信息
        getPrizeByIndex: function(index){
            return this.collection.findWhere({index: index});
        }

    });

    return PrizeView;
});
