class Food {
    constructor(){
        this.foodStock = 0;
        this.lastFed;
        this.image = loadImage('images/Milk.png');

    }

    getFoodStock(){
        var FoodRef = database.ref('Food');
        FoodRef.on('value',function(data){
            Food = data.val();
        })
    }

    updateFoodStock(foodStock){
       database.ref('/').update({
           Food:foodStock
       })
    }
    
    deductFood(){
        if(this.foodStock>0){
          this.foodStock=this.foodStock-1;
        }
    }

    display(){
        var x=70,y=100; 
        imageMode(CENTER);
        if(this.foodStock!=0){
        for(var i=0;i<this.foodStock;i++){
          if(i%10==0){
            x=70;
            y=y+50;
          }
          image(this.image,x,y,50,50);
          x=x+30;
        }
      }
        fill('black');
        textSize(15);
        if(lastFed>=12){
            text('Last Feed :'+ lastFed%12 + 'PM, 350, 30');

        }else if(lastFed===0){
            text('Last Feed : 12 AM ', 350, 30);

        }else{
            text('Last Feed :'+ lastFed + 'AM', 350, 30);
        }
    }
}
 