/*表情列表*/
define([
    'backbone',
    'models/emotion'
], function(Backbone, Emotion) {
    'use strict';

    var EmotionList = Backbone.Collection.extend({
        model: Emotion,

    });

    return new EmotionList();
});
