/**
 * Created by sy on 2016/7/3.
 * 这个类是 蛇 类  需要依赖操场类 食物类
 * 属性：
 *      this.oCGround：需要依赖的操场 生活环境
 *      this.oCFood：需要依赖的食物 能吃的东西
 *      this.width：蛇宽
 *      this.height：蛇高
 *      this.len;//蛇的默认长度
 *      this.dir; //蛇移动的方向   37 38 39 40 左上右下
 *      this.arrSnakeBody=[]; 蛇节 数组里存的是$SnakeDiv对象
 *      this.$SnakeDiv=$('<div></div>'); 蛇的dom节点

 * 方法：_init()用来初始化 蛇
 *      _createBody(): 创建身体 即div  param i代表创建第几个(就是尾部的位置)
 *      _createSnake(): 创建整支蛇
 *      crawl(): 蛇的爬行方法
 *      setDirection(newDir): 设置蛇的行走方向方法this.dir  参数:newDir 新的方向
 *      eatFood(): 临界判断
 *      eat()://吃方法 尾插一个身体div 在dom中移除食物div 创建新的div
 *      edgeDeath():边界死
 *      hitSelf():撞到自己死
 *      getArrSnake():得到蛇节数组
 */
define(['jquery'], function ($) {


    function CSnake(oCGround, oCFood) {

        this.oCGround = oCGround;
        this.oCFood = oCFood;
        this.width = 20;
        this.hight = 20;
        this.len = 3;//蛇的默认长度
        this.dir = 39; //蛇移动的方向   37 38 39 40 左上右下
        this.arrSnakeBody = [];
        this.$SnakeDiv = $('<div></div>');
        //this.SnakeDiv=document.createElement('div');
        this._init();

    }

    CSnake.prototype._init = function () {
        this._createSnake();
    };

    //创建身体 即div  param i代表创建第几个(就是尾部的位置)
    CSnake.prototype._createBody = function () {

        this.$SnakeDiv = $('<div></div>');
        this.$SnakeDiv.attr("class", "block");
        this.$SnakeDiv.addClass("snake-block");
        this.$SnakeDiv.appendTo(this.oCGround.getPointer().$yard);
        this.arrSnakeBody.push(this.$SnakeDiv);

        //this.SnakeDiv=document.createElement('div');
        //this.SnakeDiv.className='block snake-block';
        //document.getElementById('yard').appendChild(this.SnakeDiv);
        //this.arrSnakeBody.push(this.SnakeDiv);
        //return this.SnakeDiv;

        return this.$SnakeDiv;

    };


    //创建整支蛇方法
    CSnake.prototype._createSnake = function () {
        for (var i = 0; i < this.len; i++) {
            this._createBody().css({
                left: (this.len - i) * this.width
            });
        }
    };

    //蛇爬行
    CSnake.prototype.crawl = function () {

        console.log('arrLength:' + this.arrSnakeBody.length);

        for (var i = this.arrSnakeBody.length - 1; i > 0; i--) {

            this.arrSnakeBody[i].css({
                left: parseInt(this.arrSnakeBody[i - 1].position().left),
                top: parseInt(this.arrSnakeBody[i - 1].position().top)
            });
            //console.log(parseInt(this.arrSnakeBody[i].position().left));
        }

        switch (this.dir) {
            case 39:
                this.arrSnakeBody[0].css({
                    left: parseInt(this.arrSnakeBody[0].position().left += 20)
                });
                break;
            case 38:
                this.arrSnakeBody[0].css({
                    top: parseInt(this.arrSnakeBody[0].position().top -= 20)
                });
                break;
            case 37:
                this.arrSnakeBody[0].css({
                    left: parseInt(this.arrSnakeBody[0].position().left -= 20)
                });
                break;
            case 40:
                this.arrSnakeBody[0].css({
                    top: parseInt(this.arrSnakeBody[0].position().top += 20)
                });
                break;
            default:
                break;
        }
    };

    //设置方向方法  para newDirection 代表方向
    CSnake.prototype.setDirection = function (newDir) {
        if (this.dir % 2 != newDir % 2)
            this.dir = newDir;
    };

    //吃方法
    CSnake.prototype.eat = function () {
        //创建身体
        this._createBody();
        //食物消失
        this.oCFood.deleteFood();
        //创建食物
        this.oCFood.createFood(this.getArrSnake());

    };

    //吃食物方法  临界判断
    CSnake.prototype.eatFood = function (arrSnake_0, oCFood) {
        if (arrSnake_0.position().left == oCFood.getFoodDiv().position().left &&
            arrSnake_0.position().top == oCFood.getFoodDiv().position().top) {
            return true;
        }
        return false;
    };

    //边缘死
    CSnake.prototype.edgeDeath = function () {

        //console.log(this.arrSnakeBody[0].position().left <= 0
        //    + ',' + this.arrSnakeBody[0].position().left >= 1000
        //    + ',' + this.arrSnakeBody[0].position().top <= 0
        //    + ',' + this.arrSnakeBody[0].position().top >= 500);

        if (this.arrSnakeBody[0].position().left < 0
            || this.arrSnakeBody[0].position().left > 1000
            || this.arrSnakeBody[0].position().top < 0
            || this.arrSnakeBody[0].position().top > 500) {
            return true;
        }
        return false;
    };

    //撞到自己死
    CSnake.prototype.hitSelf = function () {
        var head = this.arrSnakeBody[0];

        for (var i = 4; i < this.arrSnakeBody.length; i++) {
            var body = this.arrSnakeBody[i];

            if (parseInt(head[0].offsetLeft) == parseInt(body[0].offsetLeft)
                && parseInt(head[0].offsetTop) == parseInt(body[0].offsetTop)) {

                return true;
            }
            return false;
        }
    };

    CSnake.prototype.getArrSnake = function () {
        return this.arrSnakeBody;
    };


    return CSnake;
});