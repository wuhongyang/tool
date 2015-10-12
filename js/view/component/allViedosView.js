// 所有视频
define([
    'backbone',
    'view/component/viedoView',
    'models/ktvModel'
], function(Backbone, ViedoView, KtvModel) {
    'use strict';

    var AllViedosView = Backbone.View.extend({

        el: '.ktv-viedos',

        events: {
        },

        initialize: function() {
            
        },

        render: function() {
            this.renderUI();

            return this;
        },

        renderUI: function(){
            var allViews = KtvModel.get('allViews');

            allViews.viedo2 = this.viedo2 = new ViedoView({el: this.$('#viedo2')}).render();
            allViews.viedo3 = this.viedo3 = new ViedoView({el: this.$('#viedo3')}).render();
            allViews.viedo1 = this.viedo1 = new ViedoView({el: this.$('#viedo1')}).render();

            this.delegateEvent();
        },

        delegateEvent: function(){
            /*this.viedo1.on('pop-menu', this.popMenu.bind(this));
            this.viedo2.on('pop-menu', this.popMenu.bind(this));
            this.viedo3.on('pop-menu', this.popMenu.bind(this));*/
        }     
    });

    return AllViedosView;
});
