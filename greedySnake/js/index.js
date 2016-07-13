/**
 * Created by sy on 2016/7/3.
 * 这个类是一个入口类
 *
 */
require(['jquery','C_Snake','C_Ground','C_Food','PauseLayer'], function ($,CSnake,CGround,CFood,Pause) {

    var flag=true; //控制开始和暂停 开始后 变为false 暂停后 变为true
    var timer=null;//定时器
    var oCGround=new CGround();//实例化操场类对象
    var oCFood=new CFood(oCGround);//实例化食物对象
    var oCSnake=new CSnake(oCGround,oCFood);//实例化蛇对象
    var oPauseLayer=new Pause();//弹层 点击暂停 或者 gameover 弹出



    oCFood.createFood(oCSnake.getArrSnake());

    $('#btn_restart').on('click', function () {
        window.location.reload();
    });

    $('#btn-start').focus();

    $('#btn-start').on('click',function(){
        oPauseLayer.close();
        console.log(flag);
        if(flag){
        timer=setInterval(function () {
            //坐标相同 吃
            if(oCSnake.eatFood(oCSnake.arrSnakeBody[0],oCFood)){
                oCSnake.eat();
            };
            //撞到边缘 死
            if(oCSnake.edgeDeath()){
                clearInterval(timer);
                oPauseLayer.init({
                    title:'温馨提示',
                    width:200,
                    height:100,
                    url:'over_prompt.html'
                });
            };
            //撞到自己 死
            if(oCSnake.hitSelf()) {
                clearInterval(timer);
                oPauseLayer.init({
                    title:'温馨提示',
                    width:200,
                    height:100,
                    url:'over_prompt.html'
                });
            };
            // 否则 爬
            oCSnake.crawl();
        },100);
        }

        flag=false;

    } );

    $('#btn-over').on('click', function () {

        clearInterval(timer);
        oPauseLayer.init({
            title:'温馨提示',
            width:200,
            height:100,
            url:'pause_prompt.html'
        });
        flag=true;
    });

    $(document).on('keydown', function (event) {
        event= event.which||window.event;
        switch (event){
            case 37:
                oCSnake.setDirection(37);
                console.log('37');
                break;
            case 38:
                oCSnake.setDirection(38);
                console.log('38');
                break;
            case 39:
                oCSnake.setDirection(39);
                console.log('39');
                break;
            case 40:
                oCSnake.setDirection(40);
                console.log('40');
                break;
            case 96:
                clearInterval(timer);
                oPauseLayer.init({
                    title:'温馨提示',
                    width:200,
                    height:100,
                    url:'pause_prompt.html'
                });
                flag=true;
            default:
                break;
        }});

});