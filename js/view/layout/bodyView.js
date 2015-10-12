define([
    'underscore', 
    'backbone', 
    'handlebars'
], function(_, Backbone, Handlebars) {
    'use strict';

    var BodyView = Backbone.View.extend({

        el: '#ktv_aside',

        events: {

        },

        initialize: function() {
        	console.log(Container)
        },

        render: function() {
            console.log(_.template(this.$('.tab').text())({
                user: 'dshj'
            }))
        }

    });

    return BodyView;
});
