function Player(x, y, col){
  this.pos=createVector(x, y);
  this.vel=createVector(0, 0);
  this.acc=createVector(0, 0);
  this.col=col;
  this.width=20;
  this.height=20;
  this.jump=function(){
    if(this.vel.y===0){
      this.applyForce(createVector(0, 5));
    }
  }
  this.applyForce=function(f){
    this.acc.add(f);
  }
  this.update=function(){
    this.applyForce(grav);
    this.pos.add(this.vel);
    this.vel.add(this.acc);
    this.acc.mult(0);
  }
  this.show=function(){
    ctx.fillStyle=this.col;
    ctx.fillRect(this.pos.x, this.pos.y, this.width, this.height);
  }
}

function block(x, y){
  this.pos=createVector(x, y);
  this.vel=createVector(0, 0);
  this.acc=createVector(0, 0);
  this.fall=function(){
    this.applyForce(grav);
  }
  this.applyForce=function(f){
    this.acc.add(f);
  }
  this.show=function(){
    ctx.filStyle="8c8c8c";
    ctx.fillRect(0, 0, 20, 20);
  }
}

function createVector(x_, y_){
  return new Vector(x_, y_);
}
function Vector(x, y){
  this.x=x;
  this.y=y;
  this.add=function(a, b){
    if(!b){
      this.x+=a.x;
      this.y+=a.y;
    }else{
      this.x+=a;
      this.y+=b;
    }
  }
  this.subtract=function(a, b){
    if(!b){
      this.x-=a.x;
      this.y-=a.y;
    }else{
      this.x-=a;
      this.y-=b;
    }
  }
  this.mult=function(a){
    this.x*=a;
    this.y*=a;
  }
  this.div=function(a){
    this.x/=a;
    this.y/=a;
  }
}
setTimeout(setup,50);
var c,ctx,p1,p2,grav,blocks;
function setup(){
  c=document.getElementById("c");
  c.width=window.innerWidth;
  c.style.width=window.innerWidth;
  c.height=window.innerHeight;
  c.style.height=window.innerHeight;
  ctx=c.getContext("2d");
  p1=new Player(0, c.height-20, "#FF0000");
  p1=new Player(c.width-20, c.height-20, "#00FF00");
  blocks=[];
  grav=createVector(0, 0.2);
  loop();
}
function loop(){
  ctx.clearRect(0, 0, c.width, c.height);
  if(Math.random<.003){
    blocks.push(new Block(Math.trunc(Math.random()*c.width-20), 0));
  }
  if(keys.up)
    p1.jump();
  if(keys.w)
    p2.jump();
  p1.update();
  p2.update();
  p1.show();
  p2.show();
  for(var i=0;i<blocks.length;i++){
    blocks[i].fall();
    blocks[i].show();
  }
  window.requestAnimationFrame(loop);
}
var keys = { 
  up: false, 
  down: false, 
  left: false, 
  right: false 
} 
function keyUpdate(keyEvent, down) { 
  console.log(keyEvent.keyCode);
  switch (keyEvent.keyCode) { 
    case 38: 
      keys.up = down; 
      break; 
    case 40: 
      keys.down = down; 
      break; 
    case 37: 
      keys.left = down; 
      break; 
    case 39: 
      keys.right = down; 
      break; 
    case 87:
      keys.w = down;
      break;
    case 65:
      keys.a = down;
      break;
    case 83:
      keys.s = down;
      break;
    case 68:
      keys.d = down;
      break;
  } 
} 
document.addEventListener("keydown", function(event) { 
keyUpdate(event, true); 
}); 
document.addEventListener("keyup", function(event) { 
keyUpdate(event, false); 
});
