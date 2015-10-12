define([
    'backbone', 
    'models/ktvModel'
], function(Backbone, KtvModel) {
    'use strict';

    var TrackView = Backbone.View.extend({

        el: '.ktv-track',

        descript: '',

        events: {
        },

        initialize: function() {
            this.listenTo(KtvModel, 'change:roomStatus', this.changeDescript);
        },

        render: function() {

            // webkitRequestAnimationFrame(this.runTrack.bind(this));

            return this;
        },

        changeDescript: function(model){
            var changeInfo = model.changed;
            var roomStatus = changeInfo.roomStatus;

            if(this.descript !== roomStatus.descript){
                this.descript = roomStatus.descript;

                this.$('.track-text').text(this.descript);
            }

        },

        runTrack: function(){
            var left = parseInt(this.$('.track-text').css('left'));

            left = (left < (-this.$('.track-text').width())) ? this.$('.ktv-track').width() : (left -= 2);

            this.$('.track-text').css('left',left + 'px');
            // webkitRequestAnimationFrame(this.runTrack.bind(this));            
        }

    });

    return TrackView;
});
