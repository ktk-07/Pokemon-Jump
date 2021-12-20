let gameModal = document.getElementById("modal");
let closeModalBtn = document.getElementById("closeModalBtn");
let mainMenuBtn = document.getElementById("mainMenuBtn");
let changeCharBtn = document.getElementById("changeCharBtn");
let restartBtn = document.getElementById("restartBtn");


const gameEnded = ()=>{

    gameModal.style.display = "block";
    setTimeout(()=>{
        playGameEndSound();
        gameModal.style.opacity = 0.85;
    })
}

const restartGameProcess = ()=>{
    setTimeout(()=>{
        gameModal.style.opacity = 0;
        playOptionsSound();
        restart();
        setTimeout(()=>{
            gameModal.style.display = "none";
            triggerGameStart();
            initMinusCount();
        },350);
    })
}


closeModalBtn.addEventListener("click",()=>{
    restartGameProcess();
});

restartBtn.addEventListener("click",restartGameProcess);
