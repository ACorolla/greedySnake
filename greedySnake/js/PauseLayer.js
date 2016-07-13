/**
 * Created by sy on 2016/7/4.
 */
define(['jquery'], function($){
    function Pause(){

        this.$pcontainer = $('<div class="pause-container"></div>');
        this.$mask = $('<div class="pause-mask"></div>');
        this.$dialogBox = $('<div class="pause-box"></div>');
        this.$titleBox = $('<div class="pause-title-box"></div>');
        this.$title = $('<span class="pause-title"></span>');
        this.$btnClose = $('<span class="pause-close-btn">[X]</span>');
        this.$content = $('<div class="pause-content"></div>');

    }

    Pause.prototype.open=function(options){
        console.log("open()...");
        var settings={
            width: 400,
            height: 300
        };
        $.extend(settings,options);
        return settings;
    };

    Pause.prototype.init= function (options) {

        var pointer= this;
        var settings=this.open(options);

        this.$pcontainer.append(this.$mask);
        this.$dialogBox.css({
            width: settings.width,
            height: settings.height,
            marginLeft: -settings.width/2,
            marginTop: -settings.height/2
        }).appendTo(this.$pcontainer);
        this.$title.html(settings.title).appendTo(this.$titleBox);
        this.$btnClose.on('click', function(){
            pointer.close();
        }).appendTo(this.$titleBox)
        this.$titleBox.appendTo(this.$dialogBox);
        this.$content.load(settings.url).appendTo(this.$dialogBox);

        this.$mask.on('click', function(){
            pointer.close();
        });

        $(document.body).append(this.$pcontainer);
    };


    Pause.prototype.close= function () {
        this.$pcontainer.remove();
    };

    return Pause;
});