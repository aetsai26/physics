var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var rCanvas=document.getElementById("rectangles");
var rCtx=rCanvas.getContext("2d");
var bwidth=canvas.width/60;
var x=bwidth;
var y=canvas.height/2;
var xValues = [];
var yValues=[];
var xBvalues=[];
var yBvalues=[];
var radius=bwidth;
var restitution=.75;
var dx=5;
var dy=0;
var mousePos=getMousePos(canvas, "mousemove");
var gravity=(9.81)/100;
var back = false;
var index=0;
var area=0;
var rWidth;

function drawBall(x, y){
	ctx.beginPath();
	ctx.arc(x,y,radius,0,2*Math.PI);
	ctx.fillstyle="#0033FF";
	ctx.fillStroke="#0033FF";
	ctx.Stroke="10";
	ctx.fill();
	ctx.closePath();
}


function draw(){
    if(back){
        drawBall(xValues[xValues.length-1-index], y);
        index++;
    }
    else{
        drawBall(x,y);
    }
    dy+=gravity;
    
    if(x+(radius)>canvas.width){
        dx=-(dx*1);
        //x=canvas.width-(radius+.1);
        back=true;
    }
    else if(x-(radius)<0){
        dx=-(dx*restitution);
        clearInterval(interval);
        xBvalues.reverse();
        yBvalues.reverse();
        //document.getElementById("velocity").innerHTML=xBvalues;
        //document.getElementById("velocity").innerHTML=yValues + ` B: `+ yBvalues;
        back=null;
        calculate();
    }
    if(y+(radius)>canvas.height){
        dy=-(dy*restitution);
        y=canvas.height-(radius+.1);
    }
    else if(y-(radius)<0){
        dy=-(dy*restitution);
        y=radius+.1;
    }
    
    
    y=round(y+=dy, 3);
    x=round(x+=dx, 3);
    
    if(back==false){
        xValues.push(x);
        yValues.push(y);
    }
    else{
        xBvalues.push(x);
        yBvalues.push(y);
    }
    //document.getElementById("velocity").innerHTML="x:"+dx.toString() +"y:"+dy.toString();
    //document.getElementById("velocity").innerHTML=yValues + 'B: ' + yBvalues;

    
}


canvas.addEventListener("mousemove", function(e){
    mousePos=getMousePos(canvas, e);
});

function calculate(){
    var height
    for(var i=0; i<xBvalues.length-1; i++){
        if(yValues[i]>yBvalues[i]){
            //area=area+((yValues[i]-yBvalues[xBvalues.length-1-i])*rWidth);
            height=yValues[i]-yBvalues[i]
            rCtx.rect(xBvalues[i], yBvalues[i], rWidth, height);
            rCtx.stroke();
        }
        else if (yValues[i]<yBvalues[i]){
            //area=area+((yBvalues[xBvalues.length-1-i]-yValues[i])*rWidth);
            height=yBvalues[i]-yValues[i];
            rCtx.rect(xBvalues[i], yValues[i], rWidth, height);
            rCtx.stroke();
        }
        area+=height*rWidth;
    }
    document.getElementById("area").innerHTML=area;
}





function getMousePos(canvas, evt) {
    return {
      x: evt.clientX,
      y: evt.clientY
    };
}

function init(){
    ctx.clearRect(0,0,canvas.width, canvas.height);
    ctx.beginPath();
    drawBall(0, canvas.height/2);
    ctx.lineTo(mousePos.x, mousePos.y);
    ctx.stroke();
    ctx.closePath();
   
}


function start(){
    ctx.clearRect(0,0,400,400);
    if(mousePos.x>canvas.width){
        mousePos.x=canvas.width;
    }
    if(mousePos.y>canvas.height){
        mousePos.y=canvas.height;
    }
    
    
    dx=bwidth*((mousePos.x)/(canvas.width));
    rWidth=dx;
    dy=bwidth*(mousePos.y-canvas.height/2)/(canvas.height/2);
    draw();
    clearInterval(interval);
    interval=setInterval(draw, 50);
   
   //document.getElementById("velocity").innerHTML="x:"+dx.toString() +"y:"+dy.toString();
    //document.getElementById("velocity").innerHTML=dx;

}

document.addEventListener("keypress", function(e){
    if(e.keyCode==32){
        start();
    }    
    
});

function round(num, places) {
    var multiplier = Math.pow(10, places);
    return Math.round(num * multiplier) / multiplier;
}           

var interval=setInterval(init, 10);



 