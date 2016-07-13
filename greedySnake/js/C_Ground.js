/**
 * Created by sy on 2016/7/3.
 * 这个类是一个操场类, 依赖类C_Yard, 整个操场由若干个小div构成,每个div的宽和高都为 20px
 * 该类 是 蛇和豆子赖以生存的环境
 * 属性：this.pointer : 间接在CYard上操作的一根指针，食物和蛇 需要它操作dom结构
 *      this.width : 每个小div的宽
 *      this.hight : 每个小div的高
 *      this.$odiv : 每个小div的dom节点
 * 方法：_init():私有方法，填充CYard
 *      getPointer(): 获取this.pointer，方便其余类通过Ground间接操作dom结构
 */
define(['jquery','C_Yard'], function ($,CYard) {

    var oCYard= new CYard();

    function CGRound(){

        this.pointer=oCYard;
        this.width=20;
        this.hight=20;
        this.$odiv=$('<div></div>');

        this._init();
    }

    CGRound.prototype._init= function () {
        for(var i=0;i<1000/this.width * 500/this.hight;i++){
            this.$odiv=$('<div></div>');
            this.$odiv.attr("class","block");
            this.$odiv.appendTo(this.pointer.$yard);
        }
    };

    CGRound.prototype.getPointer=function(){
        return this.pointer;
    };

    return CGRound;
});
