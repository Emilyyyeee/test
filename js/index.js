/**
 * Created by fff on 2019/5/13.
 */
var counter = 0;
var timer = null;
var DeletTop = 0;
var DeletLeft = 0;
var top0 = 2;
var left0 = 240;
var DTop =  new Array();
var DLeft = new Array();
var times = new Array();
var Top =  new Array();
var left =  new Array();
Top[counter] = top0;
left[counter] = left0;
var n= 0;
var n0 = 0;
var uncounter = counter;
var speed=15;
function Move() {
    console.info("top:"+DTop[0]);
    console.info("right:"+DLeft[0]);
    var balls = document.getElementsByClassName("ball");
    var rects = document.getElementsByClassName("rect");
    for(e = n0; e <= counter; e++) {
        if( e*4 == n){balls[e].setAttribute("state","moving")}
        if(balls[e].getAttribute("state")=="moving") {
            balls[e].style.top = (Top[e] + "px");
            balls[e].style.left = (left[e] + "px");
            if (Top[e] > 580) {
                if(uncounter == 0)
                {
                    n0 = -1;
                    n= -1;
                    uncounter = counter + 1;
                    clearInterval(timer);
                    timer = null;
                    MoveAllRect();
                    AddRect();
                }
                Top[e] = 2;
                left[e] = 240;
                balls[e].style.top = Top[e] + "px";
                balls[e].style.left = left[e] + "px";
                DLeft[e] = 0;
                DTop[e] = 0;
                balls[e].setAttribute("state","stop");
                n0++;
                uncounter--;
            }
            Top[e] += DTop[e];
            left[e] += DLeft[e];
            if (Top[e]> 580 || Top[e] < 0)
            {
                DTop[e] = 0 - DTop[e];
            }
            if (left[e] > 480 || left[e] < 0) {
                DLeft[e] = 0 - DLeft[e];
            }
        }
    }
    n++;
}
function star() {
    if(timer)
        clearInterval(timer);
    timer = setInterval("Move()", 40);
}
function Mouseclick(e){
    if(timer != null)
        return ;
    var x = 240;
    var y = 2;
    var bx = e.offsetX;
    var by = e.offsetY;
    if(x > bx)
        DeletLeft = -speed*Math.abs(Math.cos(Math.atan((by-y)/(bx-x))));
    else
        DeletLeft = speed*Math.abs(Math.cos(Math.atan((by-y)/(bx-x))));
    DeletTop = speed*Math.abs(Math.sin(Math.atan((by-y)/(bx-x))));
    for(var i = 0; i <= counter; i++)
    {
        DTop[i] = DeletTop;
        DLeft[i] = DeletLeft;
    }
    star();
}

function addballs() {
    /*var box = document.getElementById("box");
    box.innerHTML += "<div class='ball'></div>";*/
    var ball = document.createElement("div");
    ball.setAttribute("class", "ball");
    ball.setAttribute("state","stop");
    var box = document.getElementById("box");
    box.appendChild(ball);
    counter++;
    uncounter = counter;
    Top[counter] = top0;
    left[counter] = left0;
}

function RanData(a,b) {
    var min;
    if(a > b)
        min = b;
    else min = a;
    var randata = Math.round(Math.random()*Math.abs(a-b) + min);
    return randata;
}

function createRect() {
    var rect = new Object();
    rect.width = RanData(50,70);
    rect.height = rect.width;
    rect.bgColor = "rgb("+RanData(0,255)+","+RanData(0,255)+','+RanData(0,255)+")";
    rect.position = "absolute";
    rect.top = 500 + RanData(0, 100 - rect.width);
    rect.left = RanData(0,100-rect.width)+RanData(0,3)*100;
    rect.text = RanData(50,100);
    var len = document.getElementsByClassName("rect").length;
    if(len==undefined) len=0;
    rect.id ="rect"+len;
    return rect;
}

function ShowRect(rect) {
    var r=document.createElement("div");
    r.style.width = rect.width + "px";
    r.style.height = rect.height + "px";
    r.style.backgroundColor = rect.bgColor;
    r.style.position = rect.position;
    r.style.top = rect.top + "px";
    r.style.left = rect.left + "px";
    r.innerText = rect.text;
    r.style.textAlign = "center";
    r.id = rect.id;
    r.className="rect";
    r.setAttribute("tp",rect.top);
    var box = document.getElementById("box");
    box.appendChild(r);
}

function AddRect() {
    var n1 = 0,n2=0,n3=0,n4=0;
    var j = RanData(1,4);
    while (j > 0){
        var rect = createRect();
        var n0 = Math.ceil(RanData(1,4));
        if(n0 == 1 && rect.left > 0 && rect.left < 100 && n1 == 0)
{
            ShowRect(rect);
            n1 = 1;
            j--;
        }
        if(n0 == 2 && n2 == 0 && rect.left > 100 && rect.left < 200)
        {
            ShowRect(rect);
            n2 = 1;
            j--;
        }
        if(n0 == 3 && n3 == 0 && rect.left > 200 && rect.left < 300)
        {
            ShowRect(rect);
            n3 = 1;
            j--;
        }
        if(n0 == 4 && n4 == 0 && rect.left > 300 && rect.left < 400)
        {
            ShowRect(rect);
            n4 = 1;
            j--;
        }
    }
}

function MoveAllRect()
{
    var rs=document.getElementsByClassName("rect");
    for(var i=0;i<rs.length;i++)
    {
        rs[i].style.top=(parseInt(rs[i].getAttribute("tp"))-100)+"px";
        rs[i].setAttribute("tp",(parseInt(rs[i].getAttribute("tp"))-100));
    }
}