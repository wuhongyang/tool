/**
 * Created with JetBrains WebStorm.
 * User: why
 * Date: 14-4-29
 * Time: 下午3:57
 * To change this template use File | Settings | File Templates.
 */
//字体设置
define([
    'backbone'
], function(Backbone, ViedoView) {
    'use strict';

    var FontView = Backbone.View.extend({
        el: '#fontDialog',
        _options :{
            isUnderline:"",
            $fontFamily:$("#font-family"),
            $fontStyle:$("#font-style"),
            $fontSize:$("#font-size"),
            $fontColor:$("#font-color"),
            $underline:$("#underline"),
            $fontCharacter:$("#fontCharacter"),
            $demonstration:$("#demonstration")
        },
        events: {
            'click #btn_sure': 'fontSet',
            'click #btn_cancel': 'cancelFontSet',
            'change .set':'demonstration'
        },
        initialize: function() {
            this.initStyle ($(this.el).find("option"));
        },
        render: function() {
            this.initialize();
            return this;
        },
        open: function(){
            //$(this.el).dialog("open").removeClass('hide');
        },
        close:function(){
            //$(this.el).dialog("close");
        },
        fontSet:function(){
            var pkt = {};
            pkt.fontFamily = this._options.$fontFamily.val();
            pkt.fontStyle = this._options.$fontStyle.val();
            pkt.fontSize = this._options.$fontSize.val();
            pkt.fontColor = this._options.$fontColor.val();
            pkt.underline = this._options.isUnderline;
            pkt.fontCharacter = this._options.$fontCharacter.val();
            this.callC(pkt);
            this.close();
        },
        cancelFontSet:function(){
            this.close();
        },
        demonstration:function(event){
            var type="",currentTarget=event.currentTarget,value = currentTarget.value,underline;
              underline = this._options.isUnderline = this._options.$underline.is(":checked");
             "bold" == value ? (type = "font-weight") : ("on"==value ? type="text-decoration" : type=currentTarget.id);
             value = "text-decoration" == type ? (true == underline ? "underline" : "none") : value;
            this._options.$demonstration.css(type,value);
            this.inputShowStyle(type,value);
        },
        initStyle:function(options){
            $(options).each(function(i){
                switch(this.value){
                    case "宋体":
                    case "微软雅黑":
                    case "新宋体":
                        $(this).css("font-family",this.value);
                        break;
                    case "normal":
                    case "italic":
                        $(this).css("font-style",this.value);
                        break;
                    case "bold":
                        $(this).css("font-weight",this.value);
                        break;
                    case "1":
                    case "2":
                    case "3":
                        $(this).css("font-size",this.value);
                        break;
                    default:
                        break;
                }
            });
        },
        inputShowStyle:function(type,value){
            var $input = $("#"+type+"-show");
            switch (value){
                case"italic":
                    value = "斜体";
                    break;
                case"normal":
                    value = "常规";
                    break;
                case"bold":
                    value = "粗体";
                    $input = $("#font-style-show");
                    break;
                default:
                    value = value;
                    break;
            }
            $input.val(value);
        },
        callC:function(pkt){

        }
    });
    return FontView;
});

