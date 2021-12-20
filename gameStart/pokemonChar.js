class Pokemon{
    constructor(){
        // using a rect to represent the pokemone cause idk about drawImage on canva yet;
        // need gravity to be pulling down the the pokemon; 
        // need make sure it does not falls out of the canvas;
        // in this game the pokemon is not moving and its is the obstacles and trees moving;
        this.x = 100;
        this.y = 255;
        this.initialX = 100;
        this.initialY = 255;
        //this is the radius of the hitBox;
        this.radius = 16;
        this.colour = Math.random() * 360 + 1;
        this.velocityY = 0; 
        this.weight = 2;
        this.imgAniSpeed = 0;

    }
    // now im actually gonna draw the fucking image and move the source
    drawPokemon(imgEle){
        // this is the drawing path of the hitBox;

        /*
        ctx.beginPath();
        ctx.fillStyle =  `hsl(${this.colour},100%,50%)`;
        ctx.arc(this.x,this.y, this.radius,0, Math.PI * 2);
        ctx.fill();
        */
       
        //ctx.drawImage(imgEle,this.x- this.radius - 16,this.y-this.radius - 3);
        ctx.drawImage(imgEle, 253/4 * this.imgAniSpeed, 0,253/4,62,this.x - this.radius - 15,this.y - this.radius - 15,253/4,62);
        if(pokemonWalk === false){
            this.imgAniSpeed = 0 ;
        };
        if(this.imgAniSpeed === 3){
            this.imgAniSpeed = 0 ;
        }
    }
    updatePokemonSpeedY(){
        //this.x += this.vX;
        if(pokemonJumped && jumpCount === 1 ){
            this.y -= 40;
        }else{
            this.velocityY += this.weight;
            this.velocityY *= 0.8;
            this.y += this.velocityY;
        }

        //Bottom
        if(this.y >= canvas.height - this.radius - 55){
            this.y = canvas.height - this.radius  - 55;
            jumpCount = 0;
            pokemonWalk = true;
        }

        //Top
        if(this.y < canvas.height - this.radius - 169){
            this.y = canvas.height - this.radius - 169;
            this.velocityY = 0;
            // The velocity would be like max so the pokemon will just drop immediately to the bottom and tahts why at top the velocity is 0; 
        }
    }
}

let pokemonChar;

// ma Trees over lap need create tress a new way;

const initPokemon = (number) =>{
    for(let i = 0 ;i < number; i++){
        pokemonChar = new Pokemon();
    }
}

initPokemon(1);

