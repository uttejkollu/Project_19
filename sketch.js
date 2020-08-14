var monkey, monkey_running;
var back, backgroundImage;
var obstacleGroup, obstacleImage;
var bananaGroup, bananaImage; 
var player, running_player;
var score = 0;


function preload (){
  monkey_running = loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
  
  backgroundImage = loadImage("jungle.jpg");
  
  obstacleImage = loadImage("stone.png");
  bananaImage = loadImage("banana.png");
}


function setup() {
  createCanvas(800, 400);
  
  ground = createSprite(200,385,400,30);
  ground.visible = false;
  
  back = createSprite(200,200,400,200);
  back.addImage("background", backgroundImage);
  back.x = ground.width/2
  
  monkey = createSprite(60,350,20,60);
  monkey.addAnimation("running", monkey_running);
  monkey.scale = 0.1
  
  obstacleGroup = new Group();
  bananaGroup = new Group();
  
  
  
}

function draw() {
  background(220);
  
  //make the background move
  back.velocityX = -2;
  
  if(back.x < 300){
    back.x = back.width/2;
  }
  
  if(bananaGroup.isTouching(monkey)){
    bananaGroup.destroyEach();
    score = score + 2;
  }
  
  if(obstacleGroup.isTouching(monkey)){
     monkey.scale = 0.1;
      score = 0;
     }
  
  
  
  spacePressed();
  
  spawnBanana();
  spawnObstacles();
  
  monkeySize();
  
  
  drawSprites();
  
  scoreText();
}

function spacePressed(){
    //jump when the space key is pressed
  if(keyDown("space") && monkey.y >= 300){
    monkey.velocityY = -20 ;
  }
  
  //add gravity
  monkey.velocityY = monkey.velocityY + 1;
  
  //prevent monkey from falling out of canvas
  monkey.collide(ground);
}

function spawnBanana(){
    if(frameCount % 80 === 0){
    var banana = createSprite(800,random(140,220),10,2);
    banana.addImage("banana",bananaImage)
    banana.scale = 0.05
    banana.velocityX = -4
    banana.lifetime = 200
    
    bananaGroup.add(banana);
  }
}

function spawnObstacles(){
   if(frameCount % 300 === 0){
    var obstacle = createSprite(800,350,10,40);
    obstacle.addImage("rock", obstacleImage);
    obstacle.scale = 0.15
    obstacle.velocityX = -7
    obstacle.lifetime = 115
    
    obstacleGroup.add(obstacle);
  }
}

function monkeySize(){

  switch(score){
    case 10: monkey.scale = 0.12;
      break;
    case 20: monkey.scale = 0.14;
      break;
    case 30: monkey.scale = 0.16;
      break;
    case 40: monkey.scale = 0.18;
      break;
    case 50: monkey.scale = 0.20;
      break;      
      
      default: break; 
  }
}

function scoreText(){
  stroke("white");
  textSize(20);
  fill("white");
  text("Score: "+ score,280,50);
}
