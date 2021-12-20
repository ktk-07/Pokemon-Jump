let defaultPokemon = "Mega Charizard X";
sessionStorage.setItem("pokemon",defaultPokemon);
let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");
let imageDataObj;

//
//adjust X ADJUST y; to adjust the position of the image;

let adjustX, adjustY, canvasLeft, canvasTop;
adjustX = 35;
adjustY = 25;
let canvasCs = window.getComputedStyle(canvas);
canvasTop = canvasCs.top;
canvasLeft = canvasCs.left;
let matchArr;

const match = (top,left)=>{
    let regex = new RegExp("[0-9.]+","gi");
    let matchTop = top.match(regex);
    let matchLeft = left.match(regex);
    return [ matchTop[0], matchLeft[0]];
}


window.addEventListener("load",()=>{
    function drawAndGet(){
        ctx.fillStyle = "HotPink";
        //Im not understanding ctx.filltext that well
        ctx.font = "100px serif";
        ctx.fillText("Pokemon Jump",0,75);
        imageDataObj = ctx.getImageData(0,0, 100*13 ,100);
        ctx.clearRect(0,0,canvas.width,canvas.height);
        //ctx.putImageData(imageDataObj,50,0);
    }
    drawAndGet();
    initParticles()
})

// function drawAndGet(){
//     //Im not understanding ctx.filltext that well
//     ctx.font = "100px serif";
//     ctx.fillText("Pokemon Jump",0,75);
//     imageDataObj = ctx.getImageData(0,0, 100*13 ,100);
//     ctx.clearRect(0,0,canvas.width,canvas.height);
//     ctx.putImageData(imageDataObj,50,0);
// }


let mouse = {
    x:0,
    y:0,
    radius : 50
}

window.addEventListener("resize",()=>{
    canvasTop = canvasCs.top;
    canvasLeft = canvasCs.left;
    matchArr = match(canvasTop,canvasLeft);
})

// im changing window to canvas
// does not matter since event object is still dependent on the coordinates of the window;
/*

The code thta was wrong mouse.x = e.x + Number(matchArr[1]);

The correct code that i figured out;
mouse.y = e.y -  Number(matchArr[0]);

 */

window.addEventListener("mousemove",(e)=>{
    canvasTop = canvasCs.top;
    canvasLeft = canvasCs.left;
    matchArr = match(canvasTop,canvasLeft);
    if(matchArr){
        mouse.x = e.x - Number(matchArr[1]);
        mouse.y = e.y -  Number(matchArr[0]);
    }
    // mouse.x = e.x;
    // mouse.y = e.y;
})


let particlesArr = [];

class Particles{
    constructor(x,y,colour){
        this.x = x + adjustX;
        this.y = y + adjustY;
        this.originX = this.x;
        this.originY = this.y;
        this.radius = 1;
        this.density = Math.random() * 32  + 1;
        this.dragForce = 0.5;
        this.colour = Math.random() * 360 + 1;
    }
    draw(){
        // ctx.fillStyle= "pink";
        ctx.beginPath();
        ctx.arc(this.x,this.y,this.radius,0,Math.PI * 2);
        ctx.closePath();
        ctx.fill();
    }
    update(){
        let maxDist, directionX, directionY, proportionalForce, dist, dx, dy,directionalForceX,directionalForceY;
        maxDist = mouse.radius;
        dx = mouse.x - this.x;
        dy = mouse.y - this.y;
        dist = Math.sqrt(dx*dx + dy * dy);
        directionX = dx/dist;
        directionY = dy/dist;
        proportionalForce = (maxDist - dist)/maxDist;
        directionalForceX = directionX * this.dragForce * proportionalForce * this.density;
        directionalForceY = directionY  * this.dragForce * proportionalForce * this.density;
        // but this mouse value not relative to the canvas idk if it will work;
        // good thinking it really didn't work so i used window.getComputedStyle(ele,pseudoele);
        if(dist < maxDist){
            ctx.fillStyle =  `hsla(${this.colour},100%,50%)`
            this.x -= directionalForceX;
            this.y -= directionalForceY;
            this.colour++;
        }else{
            if(this.x !== this.originX){
                let newDx = this.x - this.originX;
                this.x -= newDx/10;
            }
            if(this.y !== this.originY){
                let newDy = this.y - this.originY;
                this.y -= newDy/10;

            }
        }
    }
}


const initParticles = (imageDataObject)=>{
    let coordinates = imageDataObj.data;
    console.log(imageDataObj);
    console.log(coordinates);
    let opacityIdx;
    for(let y = 0, y2 = imageDataObj.height ; y < y2 ; y++){
        for(let x = 0, x2 = imageDataObj.width ; x < x2 ; x++){
            /* get every fourth element of the array;
            my math was (y * 4* imageDataObj.width) + 4*(x+1) - 1
            Below is the guy's solution
            */
            opacityIdx = (y * 4 * imageDataObj.width) + 4 * x + 3;
            console.log(opacityIdx);
            if(coordinates[opacityIdx] > 128){
                particlesArr.push(new Particles(x*1.2,y*1.2));
            }
        }
    }
}



const animate = ()=>{
    ctx.clearRect(0,0,canvas.width,canvas.height);
    particlesArr.forEach((particle)=>{
        particle.update();
        particle.draw();
    })

    requestAnimationFrame(animate);
}
animate();