/*麦序用户*/
define([
    'backbone',
    'models/song'
], function(Backbone, Song) {
    'use strict';

    var SongList = Backbone.Collection.extend({
        model: Song
    });

    return new SongList();
});
