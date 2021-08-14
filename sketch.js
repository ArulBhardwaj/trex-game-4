var trex,trex_running,trex_collided;
var ground,groundImg,invisibleGround;
var cloud,cloudImg;
var obstaclesGroup,obstacle1,obstacle2,obstacle3,obstacle4,obstacle5,obstacle6;
var score;

function preload() {
 trex_running=loadAnimation("trex1.png","trex3.png","trex4.png");
 groundImg=loadImage("ground2.png");
 obstacle1=loadImage("obstacle1.png");
 obstacle2=loadImage("obstacle2.png");
 obstacle3=loadImage("obstacle3.png");
 obstacle4=loadImage("obstacle4.png");
 obstacle5=loadImage("obstacle5.png");
 obstacle6=loadImage("obstacle6.png");
 cloudImg=loadImage("cloud.png");
}

function setup() {
  createCanvas(600,200);
  trex=createSprite(50,180,20,50);
  trex.addAnimation("running",trex_running);
  trex.scale=0.5;
  trex.x=50;

  ground=createSprite(200,180,400,20);
  ground.addImage("ground",groundImg);
  ground.x=ground.width/2;

  invisibleGround=createSprite(200,190,400,20);
  invisibleGround.visible=false;

  score=0;
}

function draw() {
  background("grey");
  text("Score:",+score,500,50);
  score=score+Math.round(frameCount/60);

  ground.velocityX=-2;
  if(ground.x<0) {
    ground.x=ground.width/2;
  }
  if(keyDown("space") && trex.y>=100) {
    trex.velocityY=-10;
  }

  trex.velocityY=trex.velocityY+0.8;
  trex.collide(invisibleGround);
  
  spawnObstacles();

  spawnClouds();

  drawSprites();
}

function spawnObstacles() {
  if(frameCount % 60 === 0) {
    var obstacle=createSprite(400,165,10,40);
    obstacle.velocityX=-6;
    var rand=Math.round(random(1,6));
  
    switch(rand) {
      case 1 : obstacle.addImage(obstacle1)
      break;
      case 2 : obstacle.addImage(obstacle2)
      break;
      case 3 : obstacle.addImage(obstacle3)
      break;
      case 4 : obstacle.addImage(obstacle4)
      break;
      case 5 : obstacle.addImage(obstacle5)
      break;
      case 6 : obstacle.addImage(obstacle6)
      break;
      
      default: break;
  }
      obstacle.scale=0.5;
      obstacle.lifetime=300;
    
  }
}

function spawnClouds() {
  if(frameCount % 60 === 0) {
    cloud=createSprite(600,100,40,10);
    cloud.addImage(cloudImg);
    cloud.y=Math.round(random(10,60))
    cloud.scale=0.4;
    cloud.velocityX=-3;


    cloud.lifetime=200;
    cloud.depth=trex.depth;
    trex.depth=trex.depth+1;
  }
}