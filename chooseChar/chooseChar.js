// let innerTag = document.getElementsByClassName("charTag");
// let charContainer = document.getElementsByClassName("charContainer");
let displayName = document.getElementById("displayName");
let playGame = false;
let playBtn = document.getElementById("playBtn");
let defaultPokemon = "Mega Charizard X";
sessionStorage.setItem("pokemon",defaultPokemon);

function randomiseAvatar(nodeCollection){
    // this works my answer at first was Array.prototype.slice.call(null,nodeCollection); function.call(this value, arguments);
    /* what i was trying to do was that , i wanted to created a randomised array and get the data value from the info when you press randommie button then use fisher yate algorithm 
    to randomise the CharacterData;*/
    let arr = Array.prototype.slice.call(nodeCollection,0);

    for(let i = arr.length - 1 ; i >= 0 ; i--){
        let temp = arr[i];
        let randomNumber =  Math.floor(Math.random() * (i+1)); 
        let random = arr[randomNumber];
        arr[i] = random;
        arr[randomNumber] = temp;
    }


    let randomIdx = Math.floor(Math.random() * (arr.length));
    return arr[randomIdx].dataset.info !== "randomiseChar" ? arr[randomIdx].dataset.info : randomiseAvatar(nodeCollection);
    //but another alternative away is to just use numbers and represent then in a node list;
}

function display(e){
    let target = e.target;
    let targetInfo = e.target.dataset.info;
    if(targetInfo === "randomiseChar"){
        let newTarget = randomiseAvatar(innerTag);
        displayName.innerHTML = newTarget;
        defaultPokemon = newTarget;
        setSessionCookies(newTarget);
    }else{
        displayName.innerHTML = targetInfo;
        defaultPokemon = displayName.innerHTML;
        setSessionCookies(targetInfo);
    }
}
//this storage object is apart of the windows object;
function setSessionCookies(pokemon){
    if(sessionStorage.length === 1){
        sessionStorage.setItem("pokemon",pokemon);
    }else{
        sessionStorage.clear();
        sessionStorage.setItem("pokemon",pokemon);
    }
}

let modal = document.getElementById("confirmationBox");
let modalContent = document.getElementById("confirmContent");
let yesBtn = document.getElementById("yesBtn");
let noBtn = document.getElementById("noBtn");
let pokemon = document.getElementById("pokemon");
pokemon.innerText = defaultPokemon;

function confirmation(e){
    if(!playGame){
        e.preventDefault();
        modal.style.display = "flex";
        modalContent.style.display = "flex";
        setTimeout(()=>{
            modal.style.backgroundColor = "rgba(0,0,0,0.7)";
            modalContent.style.opacity = "1";
            pokemon.innerText = defaultPokemon;

        },50);
    }
    // else{
    //     modal.style.backgroundColor = "rgba(0,0,0,0)";
    //     modalContent.style.opacity = "0";
    //     setTimeout(()=>{
    //         modal.style.display = "none";
    //         modalContent.style.display = "none";
    //     },330);
    // }
}

for(let i of innerTag){
    i.addEventListener("click",(e)=>{
        display(e);
    });
}

let prePageBtn = document.getElementById("prePageBtn");

const back = ()=>{
    history.back();
}

prePageBtn.addEventListener("click",()=>{
    back();
})

playBtn.addEventListener("click",(e)=>{
    confirmation(e);
});

yesBtn.addEventListener("click",()=>{
    playGame = true;
    sessionStorage.setItem("pokemon",defaultPokemon);
    //can use pushState or replaceState(); But idk whats the diff ik push pushes it of the history stack while replace replaces the current value at the top of the state;
    history.pushState(null,"","../gameStart/gameStartPage.html");
    history.go(0);
})

noBtn.addEventListener("click",()=>{
    playGame = false;
    modal.style.backgroundColor = "rgba(0,0,0,0)";
    modalContent.style.opacity = "0";
    setTimeout(()=>{
        modal.style.display = "none";
        modalContent.style.display = "none";
    },330);
})

