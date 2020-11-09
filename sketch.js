var PLAY=1;
var END=0;
var gameState=PLAY;
var sword,fruit,monster,score;
var swordImage,fruit1Image,fruit2Image,fruit3Image,fruit4Image,monsterImage,gameoverImage;
var fruitGroup,enemyGroup;
var gameoverSound,swordSound;


function preload(){
  swordImage = loadImage("sword.png");
  monsterImage = loadAnimation("alien1.png","alien2.png")
  fruit1 = loadImage("fruit1.png");
  fruit2 = loadImage("fruit2.png");
  fruit3 = loadImage("fruit3.png");
  fruit4 = loadImage("fruit4.png");
  gameOverImage=loadImage("gameover.png");
  gameoverSound=loadSound("gameover.mp3");
  swordSound=loadSound("knifeSwooshSound.mp3")

}                         
                                                    
function setup(){
  createCanvas(600,600)
  sword=createSprite(40,200,20,20)
  sword.addImage(swordImage)
  sword.scale=0.7
  
  fruitGroup=new Group();
  enemyGroup=new Group();
  
   score=0
  
  
  
}

function draw(){
background("yellow")
  if(gameState===PLAY){
    fruits();
Enemy();
    sword.x=mouseX
  sword.y=mouseY
if(fruitGroup.isTouching(sword)){
fruitGroup.destroyEach();
score=score+2;
swordSound.play();  
  
}
else {
  if(enemyGroup.isTouching(sword)){
  gameState=END;
    gameoverSound.play();
        
        fruitGroup.destroyEach();
        enemyGroup.destroyEach();
        fruitGroup.setVelocityXEach(0);
        enemyGroup.setVelocityXEach(0);
        
        // Change the animation of sword to gameover and reset its position
        sword.addImage(gameOverImage);
        sword.x=200;
        sword.y=200;
      }
    }

  
  
  
  
  }
drawSprites();
  fill("red")
  stroke("black")
  strokeWeight(4)
  textSize(15)
  text("Score : "+ score,300,30);
}

function fruits(){
  if(frameCount%80===0){
    fruit=createSprite(400,200,20,20)
    fruit.scale=0.2
  var position=Math.round(random(1,2))
  if(position===1){
     fruit.x=0
     fruit.velocityX=(7+score/4)
  }
    else if(position===2){
      fruit.x=600
      fruit.velocityX=-(7+score/4)
    }       
            
    var rand=Math.round(random(1,4))
    if(rand===1){
      fruit.addImage(fruit1)
      
    }
    else if(rand===2){
      fruit.addImage(fruit2)
      
    }
     else if(rand===3){
      fruit.addImage(fruit3)
      
    }
     else if(rand===4){
      fruit.addImage(fruit4)
      
    }
    fruit.y=Math.round(random(50,340));
   
    fruit.setLifetime=100;
    fruitGroup.add(fruit);
  }
}

function Enemy(){
  if(frameCount%200===0){
    monster=createSprite(400,200,20,20)
    monster.addAnimation("moving", monsterImage);
monster.y=Math.round(random(100,300));
monster.velocityX=-(10+score/10)
monster.setLifetime=50;
enemyGroup.add(monster);
  }
}