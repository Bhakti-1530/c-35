//Create variables here
var dog, dogImg, happyDog, happyDogImg, database, foodS, foodStock;
var feedPet, addFood;
var fedTime, lastFed;
var foodObj;
function preload()
{
  //load images here
  dogImg=loadImage('images/dogImg.png');
 
  
}

function setup() {
  database = firebase.database();
  //console.log(database);
	createCanvas(550, 500);
  dog = createSprite(300, 250, 1, 1);
  dog.addImage('dog', dogImg);
  dog.scale = 0.2;

 var foodStock = database.ref('Food');
  foodStock.on('value', readStock);

  foodObj = new Food;

  feedPet = createButton('Feed the dog');
  feedPet.position(700, 95);
  feedPet.mousePressed(feedDog);

  addFood = createButton('Add Food');
  addFood.position(800, 95);
  addFood.mousePressed(addFoods);
}


function draw() {  
  background(46, 139, 87);
  
    fedTime = database.ref('FeedTime');
    fedTime.on('value',function(data){
      lastFed = data.val();
    })
    foodObj = new Food();
    foodObj.display();
    
  

  drawSprites();
  //add styles here
  

}

function readStock(data){
  foodS = data.val();
  
}
function writeStock(x){
  if(x<=0){
    x=0;
  }else{
    x=x-1;
  }
  database.ref('/').update({
    Food:x
   })

}

function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}

function feedDog(){
  dog.addImage(happyDogImg);

  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  database.ref('/').update({
    Food:foodObj.getFoodStock(),
    FeedTime:hour()
  })
}
