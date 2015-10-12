define([
    'backbone',
    'collections/songlist',
    'view/component/prizeView',
    'view/component/orderView',
    'view/component/consumeView',
    'collections/prizelist',
    'models/ktvModel'
], function(Backbone, SongList,PrizeView, OrderView, ConsumeView, PrizeList, KtvModel) {
    'use strict';

    var CornerView = Backbone.View.extend({

        el: '.ktv-corner-box',

        events: {
        },
        initialize: function() {
        },

        render: function() {
            var allViews = KtvModel.get('allViews');

            allViews.orderView2 = this.orderView = new OrderView({ el: '.ktv-corner-box .ktv-order-box', collection: SongList }).render();
            allViews.prizeView = this.prizeView = new PrizeView({ collection: PrizeList }).render();
            allViews.consumeView = new ConsumeView().render();

            return this;            
        }

    });

    return CornerView;
});
