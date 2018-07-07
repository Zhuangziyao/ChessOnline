$(init)
$(chess_moving)
$(time)

var c=1;
var chess_num;

var user='red';

var board = document.getElementById("checkerboard");
var ctx = board.getContext('2d');


//象棋初始化的一些信息
var red_chessman=["車","马","象","士","帥","士","象","马","車","炮","炮","兵","兵","兵","兵","兵"];
var red_chessman_id=["ju","ma","xiang","shi","shuai","2shi","2xiang","2ma","2ju","pao","2pao","bing","2bing","3bing","4bing","5bing"];
var red_x=[0,50,100,150,200,250,300,350,400,50,350,0,100,200,300,400];
var red_y=[0,0,0,0,0,0,0,0,0,100,100,150,150,150,150,150];
var black_chessman=["車","马","象","士","将","士","象","马","車","炮","炮","卒","卒","卒","卒","卒"];
var black_chessman_id=["ju","ma","xiang","shi","jiang","2shi","2xiang","2ma","2ju","pao","2pao","zu","2zu","3zu","4zu","5zu"];
var black_x=[0,50,100,150,200,250,300,350,400,50,350,0,100,200,300,400];
var black_y=[450,450,450,450,450,450,450,450,450,350,350,300,300,300,300,300];
//棋子初始排布
var chess_position = [
    [1,1,1,1,4,1,1,1,1],
    [0,0,0,0,0,0,0,0,0],
    [0,1,0,0,0,0,0,1,0],
    [1,0,1,0,1,0,1,0,1],
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0],
    [2,0,2,0,2,0,2,0,2],
    [0,2,0,0,0,0,0,2,0],
    [0,0,0,0,0,0,0,0,0],
    [2,2,2,2,3,2,2,2,2]
];

function init(){
	//初始化棋子位置
    var x=$('#checkerboard').offset().left;
    var y=$('#checkerboard').offset().top;

    for(i=0;i<16;i++){
        $('.chess-box').append("<div"+" id='"+"red_"+red_chessman_id[i]+"' "+"class='chessman_box'><div class='chessman_border'>"+red_chessman[i]+"</div><div class='chessman-shadow'></div></div>");
        $("#red_"+red_chessman_id[i]).css({
        	'left': x+red_x[i]-$('.chessman_box').width()/2+"px",
        	'top': y+red_y[i]-$('.chessman_box').height()/2+"px"
        });
    }

    for(i=0;i<16;i++){
    	$('.chess-box').append("<div"+" id='"+"black_"+black_chessman_id[i]+"' "+"class='chessman_box'><div class='chessman_border'"+"style='color: black; border:2px solid black;'>"+black_chessman[i]+"</div><div class='chessman-shadow'></div></div>");
    	$("#black_"+black_chessman_id[i]).css({
        	'left': x+black_x[i]-$('.chessman_box').width()/2+"px",
        	'top': y+black_y[i]-$('.chessman_box').height()/2+"px"
        });
    }
}

function chess_reduction(){
    //还原棋子大小
    $('.chessman_box').css({
    	'z-index':'7',
		'width': '45px',
		'height': '45px',
		'box-shadow':'8px 8px 2px -1px rgba(0,0,0,0.6)'
	});
	$('.chessman_border').css({
		'width': '30px',
		'height': '30px',
		'left':'7px',
		'top': '4px',
		'font-size':'24px',
	});
	$('.chessman-shadow').css({
		'width': '41px',
		'height': '36px',
		'-webkit-transform':'scale(1,1.10)',
		'box-shadow':'0 8px rgba(0,0,0,0.2)'
	});
}

var id_eated;//被吃棋子的id
var id_user;//使用棋子的id
var chess_clicknum=0;//点击的计数
function chess_moving(){
	//点击棋子时出现的效果
    $('.chess-box').on('click','.chessman_box',function(event){
    	if(chess_clicknum==0){
            id_user = $(this).attr("id");
            chess_clicknum=1;
    	}
    	else{
    		id_eated = $(this).attr("id");
    		if(id_user.substr(0,3)==id_eated.substr(0,3)){
    			id_user=id_eated;
    		}
    		//吃棋
    		else{
                chess_clicknum=0;
                //改变二维数组的坐标值
                change_co($('#'+id_user).position().left,$('#'+id_user).position().top,$('#'+id_eated).position().left,$('#'+id_eated).position().top);
                var $elements = $('.circle');
                var len = $('.circle').length;
                var flag = 0;
                for(var i=0;i<len;i++){
                    if($('.circle').eq(i).position().left>$('#'+id_eated).position().left&&
                    	$('.circle').eq(i).position().top>$('#'+id_eated).position().top&&
                    	$('.circle').eq(i).position().left<$('#'+id_eated).position().left+$('#'+id_eated).width()&&
                    	$('.circle').eq(i).position().top<$('#'+id_eated).position().top+$('#'+id_eated).height()){
                    	flag=1;
                    }
                }
                $('div').remove('.circle');
                if(flag==1){
	                $('#'+id_user).animate({
	                	'left': $('#'+id_eated).css('left'),
	                	'top': $('#'+id_eated).css('top')},
	                	500, function() {
	                	$('#'+id_eated).remove();
	                	chess_reduction();
	                	if(user=='red')
		    	    	    user='black';
		    	        else
		    	    	    user='red';
		    	        c=1;
	                });
	                clearInterval(start);
	                time();
                }
    		}
    	}

        if(id_user.indexOf(user)==-1){
        	alert("当前是对方的步时");
        	id_user="null";
        	chess_clicknum=0;
        }
        else{
        	$('div').remove('.circle');
        	chess_rule(id_user);
        	c=1;
        	chess_reduction();
			if(c===1){
				$('#'+id_user).css({
					'z-index':'100',
					'width': '50px',
					'height': '50px',
					'box-shadow':'15px 30px 6px -10px rgba(0,0,0,0.6)'
				});
				$('#'+id_user).children('.chessman_border').css({
					'width':'34px',
					'height': '34px',
					'left':'8px',
					'top': '2px',
					'font-size':'30px',
				});
				$('#'+id_user).children('.chessman-shadow').css({
					'width': '45px',
					'height': '40px',
					'-webkit-transform':'scale(1,1.0)',
					'box-shadow':'0 11px rgba(0,0,0,0.2)'
			    });
			    c=2;
			    chess_num = $(this).index();
			}
        }
    });

    //移动棋子
	$('.chess-box').on('click','.circle',function(event) {
		/* Act on the event */

	    var chess_x=$(this).position().left;
	    var chess_y=$(this).position().top;

	    //var x = event.pageX;
	    //var y = event.pageY;

	    //var coordinate_x = Math.round((x-chess_x)/50);
	    //var coordinate_y = Math.round((y-chess_y)/50);

	    change_co($('.chessman_box').eq(chess_num-1).position().left,$('.chessman_box').eq(chess_num-1).position().top,chess_x,chess_y);

	    if(c===2){
	    	$('div').remove('.circle');
	        $('.chessman_box').eq(chess_num-1).animate({
	    	    left: chess_x+7-$('.chessman_box').width()/2+'px',
	            top:  chess_y+7-$('.chessman_box').height()/2+'px'},500, function() {
	    	    /* stuff to do after animation is complete */
	    	    chess_reduction();
	    	    if(user=='red')
	    	    	user='black';
	    	    else
	    	    	user='red';
	    	    c=1;
	    	    chess_clicknum=0;
	        });
	        clearInterval(start);
	        time();
	    }
	});
}
//二维数组修改的函数
function change_co(be_x,be_y,af_x,af_y){
	var x=$('#checkerboard').offset().left;
    var y=$('#checkerboard').offset().top;
    
    var b_y = Math.round((be_x-x)/50);
	var b_x = Math.round((be_y-y)/50);

	var a_y = Math.round((af_x-x)/50);
	var a_x = Math.round((af_y-y)/50);
    chess_position[a_x][a_y]=chess_position[b_x][b_y];
	chess_position[b_x][b_y]=0;
	console.log(chess_position);
}

//棋子移动规则
function chess_rule(str){
	var x=$('#checkerboard').offset().left;
    var y=$('#checkerboard').offset().top;

    var coo_x=Math.round(($('#'+str).position().left-x)/50);
    var coo_y=Math.round(($('#'+str).position().top-y)/50);

    //兵的走法
    if(str.lastIndexOf('bing')!=-1){
        if(coo_y<=4){
        	addCircle(coo_x,coo_y+1,x,y);
        }
        else{
        	if(coo_y+1<=9)
        	    addCircle(coo_x,coo_y+1,x,y);
        	if(coo_x+1<=8)
        	    addCircle(coo_x-1,coo_y,x,y);
            if(coo_x-1>=0)
        	    addCircle(coo_x+1,coo_y,x,y);
        }
    }
    //炮的走法
    
    if(str.lastIndexOf('pao')!=-1){
        var i=coo_x+1,j=coo_y,count=0;
        //向下
        //alert(coo_x+' '+coo_y);
        for(i;i<9;i++){
        	if(chess_position[j][i]==0&&count==0)
        	{
                addCircle(i,j,x,y);
        	}
        	else{
        		if(count==1&&chess_position[j][i]!=0){
                    addCircle(i,j,x,y);
                    break;
        		}
        		if(count==0&&chess_position[j][i]!=0){
        		    count++;
        	    }
        	}		
        }
        //上
        var i=coo_x-1,j=coo_y,count=0;
        for(i;i>=0;i--){
        	if(chess_position[j][i]==0&&count==0)
                addCircle(i,j,x,y);
            else{
        		if(count==1&&chess_position[j][i]!=0){
                    addCircle(i,j,x,y);
                    break;
        		}
        		if(count==0&&chess_position[j][i]!=0){
        		    count++;
        	    }
        	}
        }
        //右
        var i=coo_x,j=coo_y+1,count=0;
        for(j;j<10;j++){
        	if(chess_position[j][i]==0&&count==0)
                addCircle(i,j,x,y);
            else{
        		if(count==1&&chess_position[j][i]!=0){
                    addCircle(i,j,x,y);
                    break;
        		}
        		if(count==0&&chess_position[j][i]!=0){
        		    count++;
        	    }
        	}
        }
        //左
        var i=coo_x,j=coo_y-1,count=0;
        for(j;j>=0;j--){
        	if(chess_position[j][i]==0&&count==0)
                addCircle(i,j,x,y);
            else{
        		if(count==1&&chess_position[j][i]!=0){
                    addCircle(i,j,x,y);
                    break;
        		}
        		if(count==0&&chess_position[j][i]!=0){
        		    count++;
        	    }
        	}
        }
    }
    //车的走法
    if(str.lastIndexOf('ju')!=-1){
        var i=coo_x+1,j=coo_y;
        //下
        for(i;i<9;i++){
        	if(chess_position[j][i]==0){
        		addCircle(i,j,x,y);
        	}
        	else{
        		addCircle(i,j,x,y);
        		break;
        	}
        }
        
        //上
        var i=coo_x-1,j=coo_y;
        for(i;i>=0;i--){
        	if(chess_position[j][i]==0){
        		addCircle(i,j,x,y);
        	}
        	else{
        		addCircle(i,j,x,y);
        		break;
        	}
        }
        
        //右
        var i=coo_x,j=coo_y+1;
        for(j;j<10;j++){
        	if(chess_position[j][i]==0)
                addCircle(i,j,x,y);
            else{
                addCircle(i,j,x,y);
                break;
        	}
        }
        //左
        var i=coo_x,j=coo_y-1;
        for(j;j>=0;j--){
        	if(chess_position[j][i]==0)
                addCircle(i,j,x,y);
            else{
                addCircle(i,j,x,y);
                break;
        	}
        }
    }
    //马的移动
    if(str.lastIndexOf('ma')!=-1){
    	var i=coo_x,j=coo_y;
    	//下边
        if(i>=0&&i<=8&&j>=0&&j<=7){
        	if(chess_position[j+1][i]==0){
        	    if(i>=1)
                    addCircle(i-1,j+2,x,y);
                if(i+1<=8)
                    addCircle(i+1,j+2,x,y);
            }
        }
        //上
        if(i>=0&&i<=8&&j>=2&&j<=9){
        	if(chess_position[j-1][i]==0){
        		if(i>=1){
        	        addCircle(i-1,j-2,x,y);
        	    }
        	    if(i+1<=8){
                    addCircle(i+1,j-2,x,y);
                }
            }
        }
        //右
        if(i>=0&&i<=6&&j>=0&&j<=9){
        	if(chess_position[j][i+1]==0){
        		if(j+1<=9){
                    addCircle(i+2,j+1,x,y);
                }
                if(j-1>=0){
                    addCircle(i+2,j-1,x,y);
                }
            }
        }
        //左
        if(i>=2&&i<=8&&j>=0&&j<=9){
        	if(chess_position[j][i-1]==0){
        		if(j+1<=9){
                    addCircle(i-2,j+1,x,y);
                }
                if(j-1>=0){
                    addCircle(i-2,j-1,x,y);
                }
            }
        }
    }
    //象的移动
    if(str.lastIndexOf('xiang')!=-1){
    	var i=coo_x,j=coo_y;
    	//右下
        if(i>=0&&i<=6&&j>=5&&j<=7){
        	if(chess_position[j+1][i+1]==0){
                addCircle(i+2,j+2,x,y);
            }
        }
        //右上
        if(i>=0&&i<=6&&j>=7&&j<=9){
        	if(chess_position[j-1][i+1]==0){
                addCircle(i+2,j-2,x,y);
            }
        }
        //左上
        if(i>=2&&i<=8&&j>=7&&j<=9){
        	if(chess_position[j-1][i-1]==0){
                addCircle(i-2,j-2,x,y);
            }
        }
        //左下
        if(i>=2&&i<=8&&j>=5&&j<=7){
        	if(chess_position[j+1][i-1]==0){
                addCircle(i-2,j+2,x,y);
            }
        }
    }
    //士的移动
    if(str.lastIndexOf('shi')!=-1){
    	var i=coo_x,j=coo_y;
     	if(i<=4&&j<=8&&j>=5){
    	    addCircle(i+1,j+1,x,y);//右下
    	}
    	if(i>=4&&j>=8){
    	   addCircle(i-1,j-1,x,y);//左上
    	}
    	if(i<=4&&j>=8){
    	   addCircle(i+1,j-1,x,y);//右上
    	}
    	if(i>=4&&j<=8&&j>=5){
    	   addCircle(i-1,j+1,x,y);//左下
    	}
    }
    //将、帅的移动
    if(str.lastIndexOf('jiang')!=-1||str.lastIndexOf('shuai')!=-1){
    	var i=coo_x,j=coo_y;
    	if(coo_y-1>=7)
        	addCircle(coo_x,coo_y-1,x,y);//向上
        if(coo_y+1<=9)
        	addCircle(coo_x,coo_y+1,x,y);//向下
        if(coo_x+1<=5)
        	addCircle(coo_x+1,coo_y,x,y);//向右
        if(coo_x-1>=3)
        	addCircle(coo_x-1,coo_y,x,y);//向左
        //通天
        for(j;j>=0;j--){
        	if(chess_position[j][i]==1||chess_position[j][i]==2)
               break;
            if(chess_position[j][i]==3||chess_position[j][i]==4){
               addCircle(i,j,x,y);
               break;
            }
        }
    }

}

function addCircle(x,y,c_x,c_y){
    var dcircle=$('<div></div>');
    dcircle.attr('class','circle');
    dcircle.css({
    	'left': x*50+c_x-7+'px',
    	'top': y*50+c_y-7+'px'
    });
    $('.chess-box').append(dcircle);
}

//计时器
var chess_time;
var m,s;
var start;
function time(){
    m=2;
	s=59;
	start=setInterval(function(){
		if(user=='red'){
			time_write(m,s);
			$('#enemy_time').text(chess_time);
        }
        else{
        	time_write(m,s);
        	$('#own_time').text(chess_time);
        }
    },1000);
}

function time_write(){
    if(s<10){
    //如果秒数少于10在前面加上0
      chess_time = '0'+m+':0'+s;
    }else{
      chess_time = '0'+m+':'+s;
    }
    s--;
    if(s<0){
    //如果秒数少于0就变成59秒
      s=59;
      m--;
    }
    if(m==-1&&s==59&&user=='red'){
       user='black';
       clearInterval(start);
       time();
    }
    if(m==-1&&s==59&&user=='black'){
       user='red';
       clearInterval(start);
       time();
    }
}
