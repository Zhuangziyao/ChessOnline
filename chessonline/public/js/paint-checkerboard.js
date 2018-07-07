var board = document.getElementById("checkerboard");
var object ={
	init:function(){
        this.ctx = board.getContext('2d');
        this.ctx.strokeWidth = 5;
        this.ctx.strokeStyle = "black";
         this.ctx.strokeRect(0, 0, 400, 450);

        this.row();
        this.cols();
        this.drawFont();
        this.center(50,100);
        this.center(350, 100);
        this.center(0, 150);
        this.center(100, 150);
        this.center(200, 150);
        this.center(300, 150);
        this.center(400, 150);
        this.center(400, 300);
        this.center(300, 300);
        this.center(200, 300);
        this.center(100, 300);
        this.center(0, 300);
        this.center(350, 350);                                       
        this.center(50, 350);
    },

    LineDrawing:function(mx,my,lx,ly){
    	this.ctx.beginPath();
    	this.ctx.moveTo(mx,my);
    	this.ctx.lineTo(lx,ly);
    	this.ctx.stroke();
    },

    row:function(){
    	for(var i=50;i<=400;i+=50){
    		this.ctx.beginPath();
    		this.ctx.moveTo(0,i);
    		this.ctx.lineTo(400,i);
    		this.ctx.stroke();
    	}
    },

    cols:function(){
    	for(var i=50;i<=400;i+=50){
    		this.ctx.beginPath();
    		this.ctx.moveTo(i,0);
    		this.ctx.lineTo(i,450);
    		this.ctx.stroke();
    	}

    	this.ctx.clearRect(1,201,398,49);
    	this.LineDrawing(150,0,250,100);
    	this.LineDrawing(150,350,250,450);

    	this.LineDrawing(250,0,150,100);
    	this.LineDrawing(250,350,150,450);
    },

    center:function(x,y){
    	this.ctx.lineWidth = 3;

    	this.LineDrawing(x-5,y-15,x-5,y-5);
    	this.LineDrawing(x-5,y-5,x-15,y-5);

    	this.LineDrawing(x+5,y-15,x+5,y-5);
    	this.LineDrawing(x+5,y-5,x+15,y-5);

    	this.LineDrawing(x-5,y+15,x-5,y+5);
    	this.LineDrawing(x-5,y+5,x-15,y+5);

    	this.LineDrawing(x+5,y+15,x+5,y+5);
    	this.LineDrawing(x+5,y+5,x+15,y+5);
    },

    drawFont:function(){
    	this.ctx.lineWidth = 1;
    	this.ctx.font = "30px Lisu";
    	this.ctx.save();
    	this.ctx.translate(board.width/2,board.height/2);
    	var radian = Math.PI/2;
    	this.ctx.rotate(radian);

    	this.ctx.fillText("楚",-15,-135);
    	this.ctx.fillText("河",-15,-75);
    	this.ctx.restore();
    	this.ctx.save();

        this.ctx.translate(board.width / 2, board.height / 2);
        var radian = Math.PI / -2; 
        this.ctx.rotate(radian);
        this.ctx.fillText("汉", -15, -135);
        this.ctx.fillText("界", -15, -75);
        this.ctx.restore();
    }
};

object.init();