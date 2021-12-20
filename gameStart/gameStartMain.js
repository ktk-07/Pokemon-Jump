let canvas = document.getElementById("canvasElement");
let ctx = canvas.getContext("2d");
let gamespeed = 2;
let frame = 0;
let score = 0;
let incrementScore = true;
let trigger = false;
let countDown = 4;
let countingDown;
let reqAnimationId;
// doing this to make the default char Mega Charizard X
let getChar = "Mega Charizard X";
let pokemonImg = document.getElementById("characterBox");

let gameEnd = false;

//no need to move the background cause it fills the entire game section;
let backGround = new Image(1000,400);
backGround.src = "../effects/full-background copy.png";

function handleBG(){
    ctx.drawImage(backGround,0,0,1000,400);
}

window.addEventListener("load",()=>{
    handleBG()
    ctx.fillStyle = "black";
    ctx.font = "bold 32px serif";
    ctx.fillText("Press Any Key to Start Game !!!",250,170);
    getChar = sessionStorage.getItem("pokemon");
    console.log(getChar);
    pokemonImg.src = "../characterSprites/" + getChar + ".png";
    console.log(pokemonImg.src);
})

// So i watch a tutorial they use separate scripts for differenet function!
// Im so glad i watched the tutorial cause most of my js projects they only use 1 script and the only other time i use another script is using modules .

/*need to draw clouds and shit i guess,
need create a create character class,
need to make the pokemon jump;
so all the eventListeners are here;
*/

//frame at which the circle is moving;
// Two ways to include the 2 include the collision image
/* First way is to make a HTMLImage element here in javascript or include the image tag in the html page 
Second way is to use a Image() object and use .src to link the image;
Both code below works;
*/

/* 
collisionImage = new Image(30,30);
collisionImage.src = "../characterSprites/collisionImg.png";
*/

let collisionImage = document.getElementById("collisionImg");

function minusCount(){
    countDown--;
}
const initMinusCount = ()  =>{
    // do this if you do not want to immediatetly call setInterval you can do setInterval(()=>{},1000); this will immediatley call setinterval you have to wrap it.
    countingDown = setInterval(minusCount,1000);
    if(countDown === 0){
    }
}

// When i press the spacebar, the jump is true and the pokemon jumps, the jumpCount limits the jump to 1;
let pokemonJumped = false;
let pokemonWalk = true;
let jumpCount = 0;

ctx.fillStyle = "black";
ctx.fillRect(50,300,20,20);

// my error Here was that i attached the eventlistner to the canvas itself;
window.addEventListener("keydown",(e)=>{
    //e gives the eventListener and .code gives the key pressed;
    if(trigger === true && e.code === "Space"){
        jumpCount += 1;
    }else if(trigger === false ){
        trigger = true;
        triggerGameStart();
        initMinusCount();
        playGameEndSound();
    }


    if(e.code === "Space" && jumpCount === 1){
        pokemonJumped = true;
        pokemonWalk = false;
        playJumpSound();
    }
});

//This more like flappy bird but for my game you only can jump once cause its mimicing the T-rex Game on google;
window.addEventListener("keyup",(e)=>{
    if(e.code === "Space"){
        pokemonJumped = false;
    }
});

const randomSpeed = ()=>{
    return Math.random() * 6 + 1;
}

let randomNumber = 100;

// Try to put collisions and draw if particles/ pokemons in functions like the guy did, it will be better to that;

function drawScore(){
    ctx.strokeStyle = "purple";
    ctx.lineWidth = 5;
    ctx.font = 'bold 48px serif';
    ctx.strokeText(`${score}`,900,100);
}

// window.addEventListener("load",()=>{
//     pokemonImg = document.getElementById("characterBox");
// })

let treeImg = new Image(150,150);
treeImg.src = "../characterSprites/TreeSprite.png";


function triggerGameStart(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    handleBG();
    ctx.fillStyle = "black";
    ctx.font = "bold 50px serif";
    if(countDown === 4){
        ctx.fillText(`Game Starts in ...`,275,150);
    }else {
        ctx.fillText(`${countDown}`,475,170);
    }

    if(countDown === 0){
        clearInterval(countingDown);
        gameStart();
        return;
    }
    console.log("still using beforeStart");
    window.requestAnimationFrame(triggerGameStart);

}


function gameStart(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    handleBG();
    drawScore();
    pokemonChar.updatePokemonSpeedY();
    pokemonChar.drawPokemon(pokemonImg);
    frame++;
    // every 7 frames the pokemon will move 1 step, cause if it moves every 1 frame its moving too fast
    if(frame % 7 === 0){
        pokemonChar.imgAniSpeed +=1;
    }
    if(frame % randomNumber === 0 ){
        initTree(1);
    }
    for(const tree of trees){
        tree.drawTree();
        tree.updateTreePos();
        //  the pokemon's legs can touch the top of the tree and the pokemon's frontbady can't touch the left side of the tree) I stil am confused;

        // handling collsions 
        if( (pokemonChar.x + pokemonChar.radius >= tree.x && pokemonChar.x - pokemonChar.radius <= tree.x + tree.width ) && 
            ( pokemonChar.y + pokemonChar.radius >= tree.y && pokemonChar.y - pokemonChar.radius >= tree.y )){ 
            // returning will stop the requestAnimationFrame loop;
            ctx.drawImage(collisionImage,pokemonChar.x-5,pokemonChar.y-15,30,30);
            gameEnd = true;
            if(gameEnd){
                ctx.font = "bold 32px serif";
                ctx.fillStyle = "black";
                ctx.fillText(`Game Has Ended ! You score ${score} points`, canvas.width/2 - 150, canvas.height/2, 300);
                playGameEndSound();
                setTimeout(()=>{
                    gameEnded();
                },1000);
            }
            return;
        }

        //Increasing the score count;
        // What he did was he actually incremeted the score in the obstacle object with updateScore method;
        if( (tree.x  < pokemonChar.x - pokemonChar.radius) && incrementScore === true){
            score += 1;
            incrementScore = false;
            setTimeout(()=>{
                incrementScore = true;
            },750);
        }

        if(tree.x < -200){
            trees.shift();
        }
    }
    window.requestAnimationFrame(gameStart);
}

function restart(){
    score = 0 ;
    countDown = 4 ;
    trees = [];
    //trees.filter((value)=> value === null);
    // pokemonChar.x = pokemonChar.initialX;
    // pokemonChar.y = pokemonChar.initialY;
    console.log(trees);
}










// trees.forEach((tree)=>{
//     tree.drawTree();
//     tree.updateTreePos();
//     if(tree.x < -200){
//         trees.shift();
//     }
//     //  the pokemon's legs can touch the top of the tree and the pokemon's frontbady can't touch the left side of the tree) I stil am confused;
//     if( (pokemonChar.x + pokemonChar.radius >= tree.x && pokemonChar.x - pokemonChar.radius < tree.x ) && 
//         ( pokemonChar.y + pokemonChar.radius >= tree.y && pokemonChar.y - pokemonChar.radius > tree.y )){ 
//         console.log(200);
//         return;
//     }
// });