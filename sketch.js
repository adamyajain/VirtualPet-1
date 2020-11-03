//Create variables here
var dog
var dogImg,happyDogImg
var database
var foodS,foodStock

function preload()
{
  //load images here
  dogImg = loadImge("images/dogImg.png");
  happyDogImg = loadImage("images/dogImage1.png");
}

function setup() {
	createCanvas(500, 500);
  dog = createSprite(250,250);
  dog.addImage(dogImg)
  dog.scale = 0.2

  database = firebase.database();
  foodStock = database.ref("food");
  foodStock.on("value",readStock)
}

function readStock(data){
 foodS = data.val();
}

function writeStock(x){

  if(x <= 0){
    x = 0
  }else{
    x = x-1
  }
  database.ref('/').update({
    food : x
  }) 
}

function draw() {  
  background(46,139,87);
  textSize(35);
  fill(255,255,255);

  text("Food Left : " + foodS,250,150);
  text("Press UP_ARROW for feeding your pet milk",50,50);
  if(keyWentDown(UP_ARROW)){
    writeStock(foodS);
    dog.addImage(happyDogImg);
  }
  drawSprites();
  //add styles here

}



