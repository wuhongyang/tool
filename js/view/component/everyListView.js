define([
    'backbone'
], function(Backbone) {
    'use strict';

    var EveryListView = Backbone.View.extend({

        el: '<li class="list" data-target="#context-menu" data-toggle="context"></li>',
        template: _.template($('#aisde-tab-list-template').html()),

        events: {
            'click img': function(){
                console.log('elclick')
            }
        },

        initialize: function() {
            this.on('change-model', this.render);
            // this.listenTo(this.model, 'change', this.changeModel);	
        },

        render: function() {
            console.log(this.model.toJSON())
            this.$el.html(this.template(this.model.toJSON()));

            return this;
        },

        changeModel: function(userInfo){
            this.model.set(userInfo);
            this.render();
        }   

    });

    return EveryListView;
});
