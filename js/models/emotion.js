/**
type
tooltip
preview_diffrent_path
path
 */
define([
    'backbone'
], function(Backbone) {
    'use strict';

    var Emotion = Backbone.Model.extend({
        defaults: {
            type: '',
            tooltip: '',
            preview_diffrent_path: '',
            path: ''
        }
    });

    return Emotion;
});
