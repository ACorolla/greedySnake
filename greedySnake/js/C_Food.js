/**
 * Created by sy on 2016/7/4.
 * 这个类是一个 食物 类
 * 属性：this.oCGround : 食物生存环境
 *      this.width    : 食物的宽
 *      this.height   : 食物的高
 *      this.$FoodDiv : 食物实际是个div
 * 方法：createFood()  : 创建食物   参数：oCGround 实例化对象需要外界传来的，即 操场类实例化对象
 *      deleteFood()  : 删除食物
 *      getFoodDiv()  : 对外开放的方法，用来获取$FoodDiv属性，主要用来读坐标
 *
 */
define(['jquery'], function ($) {


    function CFood(oCGround){
        this.oCGround=oCGround;
        this.width=20;
        this.height=20;
        this.$FoodDiv=$('<div></div>');
    }
    
    CFood.prototype._init= function () {

    }
    //创建食物方法
    CFood.prototype.createFood= function (arrSnake) {

        var iLeft = parseInt(Math.random() * 50) * 20;
        var iTop = parseInt(Math.random() * 25) * 20;

        for(var i=0;i<arrSnake.length;i++){
            if (iLeft == parseInt(arrSnake[i].position().left)
                && iTop == parseInt(arrSnake[i].position().top) ){
                this.createFood(arrSnake);
                return;
            }
        }

        this.$FoodDiv = $('<div></div>');
        this.$FoodDiv.attr("class","block");
        this.$FoodDiv.addClass("food-block");
        this.$FoodDiv.css({
            left : iLeft,
            top : iTop
        });
        this.$FoodDiv.appendTo(this.oCGround.getPointer().$yard);
        return this.$FoodDiv;
};
    //对外开放的方法，用来获取$FoodDiv属性，主要用来读坐标
    CFood.prototype.getFoodDiv=function(){
        return this.$FoodDiv;
    };
    //删除食物
    CFood.prototype.deleteFood= function (){
        this.$FoodDiv.remove();
    };

    return CFood;
});