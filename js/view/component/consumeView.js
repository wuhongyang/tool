// 视频
define([
    'backbone',
    'collections/otherserverlist',
    'models/ktvModel'
], function(Backbone, OtherServerList, KtvModel) {
    'use strict';

    var ConsumeView = Backbone.View.extend({

        el: '.ktv-consume-box',

        // 防止缓存
        flushParam: 0,

        events: {
            'click .pay-center': 'payCenter',
            'click .convert-center': 'convertCenter'
        },

        initialize: function() {
        },

        render: function() {
            return this;
        },

        payCenter: function(){
            console.log(OtherServerList)
        },

        convertCenter: function(){
            this.flushParam++;
            var uid = KtvModel.get('userInfo').uid;
            var roomId = KtvModel.get('roomId');
            var sessionKey = KtvModel.get('sessionKey');
            var exchangeServer = OtherServerList.findWhere({uin: Ktv.imConst.serverManager.SERVER_EXCHANGE_URL});
            var params = '?c=kmoney&a=userroomswitch&uin='+uid+'&style=mq&flushParam='+this.flushParam+'&roomId='+roomId+'&sessionKey='+sessionKey;

            var exchangePage = Container.createWebView(exchangeServer.get('webmanager')+params);

            exchangePage.show();
        }

    });

    return ConsumeView;
});
