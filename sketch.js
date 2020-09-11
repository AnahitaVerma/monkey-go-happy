
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var foodGroup, obstacleGroup
var score = 0
var ground,invisibleground
var gamestate
var PLAY=1
var END = 0
var sprite0,spriteimage

function preload(){
  
  
  monkey_running = loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  spriteimage = loadImage("sprite_0.png")
 
}



function setup() {
  createCanvas(600,350)
 
  sprite0 = createSprite(200,270,20,20)
  sprite0.addImage(spriteimage)
  sprite0.scale = 0.1
  sprite0.visible=false
  
monkey = createSprite(200,265,20,20);
monkey.addAnimation("running",monkey_running)  
monkey.scale = 0.1;
  
ground = createSprite(200,300,800,10)

  
invisibleground = createSprite(200,300,600,10)
invisibleground.visible = false
invisibleground.velocityX=-3
invisibleground.x = invisibleground.width/2  
  
  console.log(monkey)
  
 foodGroup = new Group();
 obstacleGroup = new Group();
  
}

function draw() {
  background("cyan");
  
  monkey.debug = 
  monkey.setCollider("circle",10,10)
  
  textSize (20)
  fill("black")
  text("Survival Time : "+ score, 250,40);

  if(gamestate === PLAY){
      food();
      obstacle();
    
   

     }
   if(monkey.isTouching(foodGroup)){
       foodGroup.destroyEach();
       score = score+1
    }
  else if(gamestate === END){
       foodGroup.destroyEach();
       obstacleGroup.destroyEach();
     
      }
 if(obstacleGroup.isTouching(monkey)){
        gamestate = END;
        monkey.changeImage(spriteimage)
        foodGroup.destroyEach();
        obstacleGroup.destroyEach();
       // sprite0.visible = true
        textSize(14)
       text("gameover",300,200,)
    }
  monkey.collide(ground)
  
  if(ground.x <0){
  ground.x = ground.width/2
  }
  
  if(keyDown("space")&&monkey.y >=210){
    monkey.velocityY=-12  
    
  }
  
  monkey.velocityY = monkey.velocityY+0.8

food();
obstacle();
  
  
  drawSprites();
}

function food(){
  
if(frameCount %100 ===0){
    banana = createSprite(600,200,30,10)
banana.addImage(bananaImage)
banana.scale = 0.06
banana.velocityX=-5
  
banana.y = Math.round(random(120,200))
banana.lifetime = 120

  foodGroup.add(banana)
     }
}

function obstacle(){

  if(frameCount %150   === 0){
     
    var obstacle = createSprite(400,276,30,30)
    obstacle.addImage(obstacleImage)
    obstacle.scale=0.1
    obstacle.velocityX=-5
    obstacle.lifetime = 120
    
    obstacleGroup.add(obstacle)
  }
}


