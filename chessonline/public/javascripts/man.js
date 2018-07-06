//获取棋盘左上坐标
var plain=document.getElementById('plain');
var p_left=plain.offsetLeft;
var p_top=plain.offsetTop;

//获取棋盘每个格子的边长  也是棋子的边长
var length=parseInt(document.getElementById('plain').width/8);

var array=['ju','ma','xiang','shi','jiang','shi','xiang','ma','ju','pao','pao',
            'bing','bing','bing','bing','bing'];
var up=0;
var down=6;

//存储点击棋子对象
var clickChessMan;
//用户
var user='red';

//对手
var opponent;
if(user=='red')
    opponent='black';
else
    opponent='red';

//确定起手
var active;
if(user=='red')
    active=true;
else
    active=false;

var now=user;
//初始布局
function initUp(color){
    var content=document.getElementById('content');

        for(var i=0;i<array.length;i++){
            var img=document.createElement("img");
            img.setAttribute('class',color+' '+array[i]+' chessman');
            img.src="/images/"+color+"_"+array[i]+".png";
            img.style.setProperty('width',length+'px');
            img.style.setProperty('height',length+'px');
            img.addEventListener('click',clickJudge);
            //赋予初始坐标
            if(i<9){
                img.style.setProperty('position','absolute');
                img.style.setProperty('left',p_left+i*length-length/2+'px');
                img.style.setProperty('top',p_top+up*length-length/2+'px');
            }else if(i>=9&&i<11){//炮的排法
                var p;
                if(i==9)
                    p=1;
                else
                    p=7;
                img.style.setProperty('position','absolute');
                img.style.setProperty('left',p_left+p*length-length/2+'px');
                img.style.setProperty('top',p_top+(2+up)*length-length/2+'px');
            }else{//兵的排法
                img.style.setProperty('position','absolute');
                img.style.setProperty('left',p_left+(i-11)*2*length-length/2+'px');
                img.style.setProperty('top',p_top+(3+up)*length-length/2+'px');
            }
            content.appendChild(img);

        }
    
        
    
}
function initDown(color){
var content=document.getElementById('content');
for(var i=array.length-1;i>=0;i--){
    var img=document.createElement("img");
    img.setAttribute('class',color+' '+array[i]+' chessman');
    img.src="/images/"+color+"_"+array[i]+".png";
    img.style.setProperty('width',length+'px');
    img.style.setProperty('height',length+'px');
    img.addEventListener('click',clickJudge);
    //赋予初始坐标
    if(i>10){//兵的排法             
        img.style.setProperty('position','absolute');
        img.style.setProperty('left',p_left+(i-11)*2*length-length/2+'px');
        img.style.setProperty('top',p_top+(down)*length-length/2+'px');
        }else if(i>8&&i<=10){//炮的排法
            var p;
            if(i==9)
                p=1;
            else
            p=7;
            img.style.setProperty('position','absolute');
            img.style.setProperty('left',p_left+p*length-length/2+'px');
            img.style.setProperty('top',p_top+(1+down)*length-length/2+'px');
        }else{
            img.style.setProperty('position','absolute');
            img.style.setProperty('left',p_left+i*length-length/2+'px');
            img.style.setProperty('top',p_top+(3+down)*length-length/2+'px');
    }
        content.appendChild(img);
}
}

initUp(opponent);
initDown(user);

//点击棋子
function clickJudge(e){
//是否是本方回合
//if(active)
//判断是否是自己的棋子
if(e.target.getAttribute('class').indexOf(now)>-1){
    //清除之前提示点
    clearCircle();
    clickChessMan=e.target;
    //判断调用哪个棋子的移动逻辑
    if(e.target.getAttribute('class')){//判断class中是否存在对应的标签
        if(e.target.getAttribute('class').indexOf('bing')>-1)
            showpath_bing(e);
        else if(e.target.getAttribute('class').indexOf('pao')>-1)
            showpath_pao(e);
        else if(e.target.getAttribute('class').indexOf('ju')>-1)
            showpath_ju(e);
        else if(e.target.getAttribute('class').indexOf('jiang')>-1)
            showpath_jiang(e);
        else if(e.target.getAttribute('class').indexOf('shi')>-1)
            showpath_shi(e);
        else if(e.target.getAttribute('class').indexOf('xiang')>-1)
            showpath_xiang(e);
        else if(e.target.getAttribute('class').indexOf('ma')>-1)
            showpath_ma(e);   
    }
}else{//是否是来吃掉对方棋子
    //通过提示点来判断是否之前点击了本方旗子
    if(document.getElementsByClassName('circle').length>0)
        if(canEat(e.target.offsetLeft,e.target.offsetTop)){
            //播放音效
            playAudio();
            //判断吃掉的是否是将帅
            if(e.target.getAttribute('class').indexOf('jiang')>-1){
                e.target.remove();
                alert('game over,'+user+' win');
            }else{
                e.target.remove();
            }
            //清除之前提示点
            clearCircle();
            if(now==user)
                now=opponent;
            else
                now=user;
        }
}
}
//兵的移动逻辑
function showpath_bing(e){
    clearCircle();
    //获取坐标点
    var x=e.target.offsetLeft+length/2;
    var y=e.target.offsetTop+length/2;
    if(now==user){
        if(y>(4*length+p_top)){//未过河 只能前进一格
            addCircle(x,y-length);
    }else{//已过河 三个方向前进一格           
            addCircle(x,y-length);
            addCircle(x-length,y);
            addCircle(x+length,y);
    }
    }else{
        if(y<=(4*length+p_top)){
            addCircle(x,y+length);
        }else{
            addCircle(x,y+length);
            addCircle(x-length,y);
            addCircle(x+length,y);
        }
    }
    
}
//炮的移动逻辑
function showpath_pao(e){
clearCircle();
//获取坐标点
var x=e.target.offsetLeft+length/2;
var y=e.target.offsetTop+length/2;
//横向
var i=1;
var flag=1;
while(1){
    if(hasChessMan(x-i*length,y)==false&&flag==1)
        addCircle(x-i*length,y);
    else if(hasChessMan(x-i*length,y)==true){
        if(flag==1)
            flag=2;
        else{
            addCircle(x-i*length,y);
            flag=1;
            break;
        }
    }
    if(x-i*length<p_left)
        break;
    i++;
}
i=1;
flag=1;
while(1){
    if(hasChessMan(x+i*length,y)==false&&flag==1)
        addCircle(x+i*length,y);
    else if(hasChessMan(x+i*length,y)==true){
        if(flag==1)
            flag=2;
        else{
            addCircle(x+i*length,y);
            flag=1;
            break;
        }
    }
    if(x+i*length>p_left+8*length)
        break;
    
    i++;
}
//纵向
i=1;
flag=1;
while(1){
    if(hasChessMan(x,y-i*length)==false&&flag==1)
        addCircle(x,y-i*length);
    else if(hasChessMan(x,y-i*length)==true){
        if(flag==1)
            flag=2;
        else{
            addCircle(x,y-i*length);
            flag=1;
            break;
        }
    }
    if(y-i*length<p_top)
        break;
    i++;
}
i=1;
flag=1;
while(1){
    if(hasChessMan(x,y+i*length)==false&&flag==1)
        addCircle(x,y+i*length);
    else if(hasChessMan(x,y+i*length)==true){
        if(flag==1)
            flag=2;
        else{
            addCircle(x,y+i*length);
            flag=1;
            break;
        }
    }
    if(y+i*length>p_top+9*length)
        break;
    i++;
}
}
//车的移动逻辑
function showpath_ju(e){
clearCircle();
//获取坐标点
var x=e.target.offsetLeft+length/2;
var y=e.target.offsetTop+length/2;
//横向
var i=1;
while(1){
    if(hasChessMan(x-i*length,y)==false)
        addCircle(x-i*length,y);
    else{
        addCircle(x-i*length,y);
        break;
    }
    if(x-i*length<p_left)
        break;
    i++;
}
i=1;
while(1){
    if(hasChessMan(x+i*length,y)==false)
        addCircle(x+i*length,y);
    else{
        addCircle(x+i*length,y);
        break;
    }
    if(x+i*length>p_left+8*length)
        break;
    
    i++;
}
//纵向
i=1;
while(1){
    if(hasChessMan(x,y-i*length)==false)
        addCircle(x,y-i*length);
    else{
        addCircle(x,y-i*length);
        break;
    }
    if(y-i*length<p_top)
        break;
    i++;
}
i=1;
while(1){
    if(hasChessMan(x,y+i*length)==false)
        addCircle(x,y+i*length);
    else{
        addCircle(x,y+i*length);
        break;
    }
    if(y+i*length>p_top+9*length)
        break;
    i++;
}
}
//马的移动逻辑
function showpath_ma(e){
clearCircle();
//获取坐标点
var x=e.target.offsetLeft+length/2;
var y=e.target.offsetTop+length/2;
//左
if(hasChessMan(x-length,y)==false){
        addCircle(x-2*length,y-length);
        addCircle(x-2*length,y+length);
}
//右
if(hasChessMan(x+length,y)==false){
        addCircle(x+2*length,y-length);
        addCircle(x+2*length,y+length);
}
//下
if(hasChessMan(x,y-length)==false){
        addCircle(x-length,y-2*length);
        addCircle(x+length,y-2*length);
}
//上
if(hasChessMan(x,y+length)==false){
        addCircle(x-length,y+2*length);
        addCircle(x+length,y+2*length);
}
}
//相的移动逻辑
function showpath_xiang(e){
clearCircle();
//获取坐标点
var x=e.target.offsetLeft+length/2;
var y=e.target.offsetTop+length/2;
if(now==user){
    //左上
    if(hasChessMan(x-length,y-length)==false){
        if((y-2*length)>p_top+4*length)
            addCircle(x-2*length,y-2*length);
    }
    //右上
    if(hasChessMan(x+length,y-length)==false){
        if((y-2*length)>p_top+4*length)
            addCircle(x+2*length,y-2*length);
    }
    //左下
    if(hasChessMan(x-length,y+length)==false){
        if((y+2*length)>p_top+4*length)
            addCircle(x-2*length,y+2*length);
    }
    //右下
    if(hasChessMan(x+length,y+length)==false){
        if((y+2*length)>p_top+4*length)
            addCircle(x+2*length,y+2*length);
    }
}else{
    //左上
    if(hasChessMan(x-length,y-length)==false){
        if((y-2*length)>=p_top)
            addCircle(x-2*length,y-2*length);
    }
    //右上
    if(hasChessMan(x+length,y-length)==false){
        if((y-2*length)>=p_top)
            addCircle(x+2*length,y-2*length);
    }
    //左下
    if(hasChessMan(x-length,y+length)==false){
        if((y+2*length)<p_top+5*length)
            addCircle(x-2*length,y+2*length);
    }
    //右下
    if(hasChessMan(x+length,y+length)==false){
        if((y+2*length)<p_top+5*length)
            addCircle(x+2*length,y+2*length);
    }
}

}
//士的移动逻辑
function showpath_shi(e){
clearCircle();
//获取坐标点
var x=e.target.offsetLeft+length/2;
var y=e.target.offsetTop+length/2;
if(now==user){
    //左边
    if(x-length>=p_left+3*length){
        if(y-length>=p_top+7*length){
            if(hasChessMan(x-length,y-length)==false)
                addCircle(x-length,y-length);
        }
        if(p_top+9*length>=y+length){
            if(hasChessMan(x-length,y+length)==false){
                addCircle(x-length,y+length);
            }
                
        }
    }
    //右边
    if(x+length<=p_left+5*length){
        if(y-length>=p_top+7*length){
            if(hasChessMan(x+length,y-length)==false)
                addCircle(x+length,y-length);
        }
        if(y+length<=p_top+9*length){
            if(hasChessMan(x+length,y+length)==false)
                addCircle(x+length,y+length);
        }
    }
}else{
    //左边
    if(x-length>=p_left+3*length){
        if(y-length>=p_top){
            if(hasChessMan(x-length,y-length)==false)
                addCircle(x-length,y-length);
        }
        if(p_top+2*length>=y+length){
            if(hasChessMan(x-length,y+length)==false){
                addCircle(x-length,y+length);
            }
                
        }
    }
    //右边
    if(x+length<=p_left+5*length){
        if(y-length>=p_top){
            if(hasChessMan(x+length,y-length)==false)
                addCircle(x+length,y-length);
        }
        if(y+length<=p_top+2*length){
            if(hasChessMan(x+length,y+length)==false)
                addCircle(x+length,y+length);
        }
    }
}


}
//将的移动逻辑
function showpath_jiang(e){
clearCircle();
//获取坐标点
var x=e.target.offsetLeft+length/2;
var y=e.target.offsetTop+length/2;
if(now==user){
    if(x-length>=p_left+3*length){        
            addCircle(x-length,y);
    }
    if(x+length<=p_left+5*length){
            addCircle(x+length,y);
    }
    if(y-length>=p_top+7*length){       
            addCircle(x,y-length);
    }
    if(y+length<=p_top+9*length){
            addCircle(x,y+length);
    }
    //飞将
    var i=1;
    while(y-i*length>=p_top){
        if(hasChessMan(x,y-i*length)){
            var array=document.getElementsByClassName('chessman');
            for(var j=0;j<array.length;j++){
                if(Math.abs(array[j].offsetLeft+length/2-x)<5&&
                    Math.abs(array[j].offsetTop+length/2-(y-i*length))<5){
                        if(array[j].getAttribute('class').indexOf('jiang')>-1){
                            addCircle(x,y-i*length);
                            break;
                        }
                }
            }
            break;
        }
        i++;            
    }
}else{
    if(x-length>=p_left+3*length){
            addCircle(x-length,y);
    }
    if(x+length<=p_left+5*length){
            addCircle(x+length,y);
    }
    if(y-length>=p_top){
            addCircle(x,y-length);
    }
    if(y+length<=p_top+2*length){
            addCircle(x,y+length);
    }
    //飞将
    var i=1;
    while(y+i*length<=p_top+9*length){
        if(hasChessMan(x,y+i*length)){
            var array=document.getElementsByClassName('chessman');
            for(var j=0;j<array.length;j++){
                if(Math.abs(array[j].offsetLeft+length/2-x)<5&&
                    Math.abs(array[j].offsetTop+length/2-(y+i*length))<5){
                        if(array[j].getAttribute('class').indexOf('jiang')>-1){
                            addCircle(x,y+i*length);
                            break;
                        }
                }
            }
            break;
        }
        i++;            
    }
}



}

//判断输入位置是否有棋子
function hasChessMan(x,y){
var array=document.getElementsByClassName('chessman');
for(var i=0;i<array.length;i++){
    if(array[i].offsetLeft<x&&(array[i].offsetLeft+length)>x&&
        array[i].offsetTop<y&&(array[i].offsetTop+length)>y)
        return true;
}
return false;
}

//画出提示点
function addCircle(x,y){
    //棋盘外不画点
    if(x>=p_left&&x<=(p_left+8*length)&&y>=p_top&&y<=(p_top+9*length)){
        var circle=document.createElement("div");
        circle.style.setProperty('left',x-10+'px');
        circle.style.setProperty('top',y-10+'px');
        circle.setAttribute('class','circle');
        circle.addEventListener('click',move);
        content.appendChild(circle);
    } 
}

//清除提示点
function clearCircle(){
    //清理两次才能清除干净，？
    var array=document.getElementsByClassName('circle');
    while(1){
        for(var i=0;i<array.length;i++)
            content.removeChild(array[i]);
        array=document.getElementsByClassName('circle');
        if(array.length==0)
            break;
    }
}

//点击提示点后移动
function move(e){
    //提示点上没有棋子
    if(e.target.getAttribute('class').indexOf('circle')>-1){
        //opponentMove(clickChessMan.offsetLeft,clickChessMan.offsetTop,e.target.offsetLeft+10-length/2,e.target.offsetTop+10-length/2);
        clickChessMan.style.setProperty('left',e.target.offsetLeft+10-length/2+'px');
        clickChessMan.style.setProperty('top',e.target.offsetTop+10-length/2+'px');
        clearCircle();
        if(now==user)
            now=opponent;
        else
            now=user;
    } 
}
//收到对方下子的信息来移动对方的棋子
function opponentMove(fromX,fromY,toX,toY){
//坐标换算
var maxX=8*length;
var maxY=9*length;
var newFromX,newFromY,newToX,newToY;
newFromX=maxX-(fromX-p_left)+p_left-length;
newFromY=maxY-(fromY-p_top)+p_top-length;
newToX=maxX-(toX-p_left)+p_left-length;
newToY=maxY-(toY-p_top)+p_top-length;

var opponentChessMan=document.getElementsByClassName(opponent);
var userChessMan=document.getElementsByClassName(user);
//若目的点有我方棋子，要移除
for(var i=0;i<userChessMan.length;i++){
    if(Math.abs(userChessMan[i].offsetLeft-newToX)<5&&
        Math.abs(userChessMan[i].offsetTop-newToY)<5){
            if(userChessMan[i].getAttribute('class').indexOf('jiang')>-1){
                alert('game over'+opponent+' win');
            }  
            userChessMan[i].remove();
            break;
        }
}
//移动对方棋子
for(var i=0;i<opponentChessMan.length;i++){
    if(Math.abs(opponentChessMan[i].offsetLeft-newFromX)<5&&
        Math.abs(opponentChessMan[i].offsetTop-newFromY)<5){
            opponentChessMan[i].style.setProperty('left',newToX+'px');
            opponentChessMan[i].style.setProperty('top',newToY+'px');
            break;
        }
}
active=true;

}

//能否吃掉x,y的棋子
function canEat(x,y){       
var array=document.getElementsByClassName('circle');
for(var i=0;i<array.length;i++){
    if(array[i].offsetLeft>=x&&array[i].offsetLeft<=x+length
        &&array[i].offsetTop>=y&&array[i].offsetTop<=y+length){
            //opponentMove(clickChessMan.offsetLeft,clickChessMan.offsetTop,x,y);
            clickChessMan.style.setProperty('left',x+'px');
            clickChessMan.style.setProperty('top',y+'px');
            return true;
        }
}
return false;
}

function addAudio(){
    var embed=document.createElement('audio');
    embed.setAttribute('name','embedPlay');
    embed.setAttribute('src','../audio/9204.mp3');
    embed.setAttribute('autostart','false');
    embed.setAttribute('hidden','true');
    content.appendChild(embed);
}
addAudio();

function  playAudio(){
    var audio=document.getElementsByName('embedPlay');
    audio[0].play();
}