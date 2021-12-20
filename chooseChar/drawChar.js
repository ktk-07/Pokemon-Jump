let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");
let displayPokemon = document.getElementById("displayPokemon");
let displayChar = document.getElementById("displayChar");
let audioEle;

let audioBtn = document.getElementsByClassName("audioBtn");



// i think i can make this betteer but putting the computedstyle inside functions and 

let canvasHeight = window.getComputedStyle(canvas).height;
let canvasWidth = window.getComputedStyle(canvas).width;
let positionY = window.getComputedStyle(canvas).top;
let positionX = window.getComputedStyle(canvas).left;

// trying to change the computedstyle that is a string to a number ;
console.log(positionY,positionX);

let displayPosX,displayPosY;
let mouseObj = {
    x:null,
    y:null,
    radius:40
}

const displayCanvasPos = ()=>{
    let displayPos = canvas.getBoundingClientRect();
    displayPosX = displayPos.x;
    displayPosY = displayPos.y;
    console.log(displayPosX,displayPosY);
}
displayCanvasPos();

const match = (data)=>{
    let regex = new RegExp("[0-9.]+","gi");
    let matchData = data.match(regex);
    return matchData[0];
}


positionX = Number(match(positionX));
positionY = Number(match(positionY));
canvasWidth = Number(match(canvasWidth));
canvasHeight = Number(match(canvasHeight));
canvas.height = canvasHeight;
canvas.width = canvasWidth;


window.addEventListener("resize",()=>{
    canvas.height = canvasHeight;
    canvas.width = canvasWidth; 
    displayCanvasPos();

});


console.log(canvasWidth,canvasHeight);
console.log(ctx);


/*
    WOw MY CODE WAS NOT WORKING BECAUSE  I DIDN'T LOAD THE IMAGEOBJ FIRST.
    so basically i did not put a load event listner on the imageoBj itself 
    adn thus the imageobj pic did not load finish yet but the ctx.drawImage function was already called so thus it did not draw any image out
*/

let src = "../charDisplayPic/MegaCharizardX.png";
let imageData;

function drawAndGetImageData(imgSrc){
    ctx.clearRect(0,0,canvas.width,canvas.height)
    let imageObj = new Image(650,750);
    imageObj.src = imgSrc;
    imageObj.addEventListener("load",(e)=>{
        ctx.drawImage(imageObj,0,0,650,650);
        // imageData = ctx.getImageData(0,0,650,750);
        // ctx.clearRect(0,0,canvasWidth,canvasHeight);
        // console.log(imageData);
        // displayCanvasPos();
        // drawDotAtPixels();
    });
}

drawAndGetImageData(src);

// window.addEventListener("mousemove",(e)=>{
//     mouseObj.x = e.x - displayPosX;
//     mouseObj.y = e.y - displayPosY;
// })

// let miniDotArr = [];

// class miniDot{
//     constructor(x,y,colour1,colour2,colour3){
//         // this.x = Math.random() * canvas.width;
//         // this.y = Math.random() * canvas.height;
//         this.x = x;
//         this.y = y;
//         this.radius = 0.5;
//         this.originX = this.x;
//         this.originY = this.y;
//         this.colour1 = colour1;
//         this.colour2 = colour2;
//         this.colour3 = colour3;
//         this.dragForce = 0.34;
//         this.density  = Math.random()* 34 + 1;
//     }
//     drawDot(){
//         //using back tick is like doing f-statement in python print(f""")
//         ctx.fillStyle = `rgb(${this.colour1},${this.colour2},${this.colour3})`;
//         ctx.beginPath();
//         ctx.arc(this.x,this.y,this.radius,0,Math.PI * 2);
//         ctx.fill();
//     }
//     updateDotPos(){
//         let dx,dy,directionalForceX,directionalForceY,proportionalForce,distance,maxDistance;
//         dx = mouseObj.x - this.x;
//         dy = mouseObj.y - this.y;
//         distance = Math.sqrt(Math.pow(dx,2) + Math.pow(dy,2));
//         maxDistance = mouseObj.radius;
//         proportionalForce = (maxDistance - distance )/ maxDistance;
//         directionalForceX = dx/5 * proportionalForce * this.density * this.dragForce;
//         directionalForceY = dy/5 * proportionalForce * this.density * this.dragForce;
//         if(distance < maxDistance){
//             this.x -= directionalForceX;
//             this.y -= directionalForceY;
//         }else{
//             if(this.originX !== this.x){
//                 let newDirectionForceX = this.originX - this.x;
//                 this.x += newDirectionForceX/15;
//             }
//             if(this.originY !== this.y){
//                 let newDirectionForceY = this.originY - this.y;
//                 this.y += newDirectionForceY/15;
//             }
//         }
//     }
// }

// const drawDotAtPixels = ()=>{
//     //pixel arr
//     let imageDataPixel = imageData.data;
//     let pixelHeight = imageData.height;
//     let pixelWidth = imageData.width;
//     let opacityIdx;
//     for(let y = 0, y2 = pixelHeight; y < y2 ; y++){
//         for(let x=0,x2 = pixelWidth; x< x2; x++){
//             // every third element of the imageData(Uint*clamped array) array is opacity;
//             opacityIdx = (y * 4 * pixelWidth) + (x*4) + 3;
//             if(imageDataPixel[opacityIdx] > 128){
//                 let c1 = (y * 4 * pixelWidth) + (x*4) + 0;
//                 let c2 = (y * 4 * pixelWidth) + (x*4) + 1;
//                 let c3 = (y * 4 * pixelWidth) + (x*4) + 2;
//                 miniDotArr.push(new miniDot(x,y,c1,c2,c3));
//             }


//         }
//     }
// }


// const animate = ()=>{
//     ctx.clearRect(0,0,canvas.width,canvas.height);
//     miniDotArr.forEach((miniDot)=>{
//         miniDot.drawDot();
//         miniDot.updateDotPos();
//     })
//     requestAnimationFrame(animate);
// }

// animate();



let charContainer = document.getElementsByClassName("charContainer");
let innerTag = document.getElementsByClassName("charTag");

const changeDisplayPic = (e) =>{
    console.log(e.target.dataset.info);
    console.log(sessionStorage.getItem("pokemon"));
    if(e.target.dataset.info == "randomiseChar"){
        for(let i = 0 ; i < innerTag.length ;i++){
            if(innerTag[i].dataset.info === sessionStorage.getItem("pokemon")){
                src = innerTag[i].src;
                break;
            }
        }

    }else{
        src = e.target.src 
    }
    drawAndGetImageData(src);


}

for(let i = 0 ; i < charContainer.length; i++){
    charContainer[i].addEventListener("click",(e)=>{
        changeDisplayPic(e);
    });
}

const createAudioELe = ()=>{
    audioEle = document.createElement('audio');
    audioEle.src = "../gameAudio Files/clickOptions.wav";
    console.log(audioEle);
    for(const i of audioBtn){
        i.addEventListener("click",(e)=>{
            playCorAudio(e);
        })
    }
}

window.addEventListener("load",createAudioELe,)


const playCorAudio = ()=>{
    audioEle.play();
}



