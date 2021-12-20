let btns = document.getElementsByClassName("btn");
let audioEle;
// or you can use audioEle = new Audio()
// you can keep creatingnew AudioEle and linking the audioELe's src to the audio file if you wan sounds to overlap but i don't want that.
// audioEle.controls = true to display;
const loadAudio = ()=>{
    audioEle = document.createElement("audio");
    audioEle.src = "../gameAudio Files/clickOptions.wav";
}
window.addEventListener("click",loadAudio);

for(let i of btns){
    i.addEventListener("click",playAudio);
}

function playAudio(){
    audioEle.play();
}