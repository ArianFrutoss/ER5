

function startPlaying(){
    let gameScreen = document.getElementById("gameScreen");
    gameScreen.style.display = "block";

    let btnPlay    = document.getElementById("btnPlay");
    btnPlay.style.display = "none";


}
let btnPlay = document.getElementById("btnPlay");

btnPlay.addEventListener("click", ()=> {
    fetch('http://localhost:3000/test')
        .then((response) => response.json())
        .then(function(json){
            
            console.log(json);
        });
})