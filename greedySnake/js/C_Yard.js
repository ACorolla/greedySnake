/**
 * Created by sy on 2016/7/3.
 * 这个类可以理解为一个画布
 * 用来动态生成dom结构
 * 是该游戏的每个对象（操场，蛇，豆子） 赖以生存的环境
 */
define(['jquery'],function ($) {

    function CYard(){

        this.$container=$('<div id="container"></div>');
        this.$yard=$('<div id="yard"></div>');
        this.$control=$('<div id="control"></div>');
        this.$brand=$('<div id="brand">贪吃蛇 By QQ4740721</div>');
        this.$buttons=$('<div id="buttons"></div>');
        this.$btn_start=$('<button id="btn-start">开始</button>');
        this.$btn_over=$('<button id="btn-over">暂停</button>');
        this.$btn_restart=$('<button id="btn_restart">重新开始</button>');

        this._init();

}

    CYard.prototype._init= function () {
        this.$btn_start.appendTo(this.$buttons);
        this.$btn_over.appendTo(this.$buttons);
        this.$btn_restart.appendTo(this.$buttons);
        this.$brand.appendTo(this.$control);
        this.$buttons.appendTo(this.$control);
        this.$control.appendTo(this.$container);
        this.$yard.appendTo(this.$container);
        $(document.body).append(this.$container);
    };


    return CYard;
});