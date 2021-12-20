let jumpSound = document.createElement("audio");
jumpSound.src = "../gameAudio Files/jump.wav";

const playJumpSound = ()=>{
    jumpSound.play();
}

let gameEndSound = document.createElement("audio");
gameEndSound.src = "../gameAudio Files/gameEnd.wav";

function playGameEndSound(){
    gameEndSound.play();
}

let clickOptions = document.createElement("audio");
clickOptions.src = "../gameAudio Files/clickOptions.wav";

const playOptionsSound = ()=>{
    clickOptions.play();
}
