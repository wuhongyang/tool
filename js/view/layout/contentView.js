define([
    'underscore', 
    'backbone', 
    'handlebars',
    'view/component/interactionView',
    'view/component/allViedosView',
    'view/component/trackView',
    'models/ktvModel'
], function(_, Backbone, Handlebars, InteractionView, AllViedosView, TrackView, KtvModel) {
    'use strict';

    var ContentView = Backbone.View.extend({

        el: '.ktv-content',

        events: {
            // 'click .video-menu': 'videoMenu',
            'click .closeViedo': 'closeViedo',
            'click .closeAudio': 'closeAudio',
            'click .offViedo': 'offViedo',
            'click .photo': 'photo'
        },

        initialize: function() {
        },

        render: function() {
            var allViews = KtvModel.get('allViews');

            allViews.interactionView = this.interactionView = new InteractionView().render();
            allViews.allViedosView = this.allViedosView = new AllViedosView().render();
            allViews.trackView = this.trackView = new TrackView().render();
            return this;
        }

    });

    return ContentView;
});
