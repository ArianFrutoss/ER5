import globals from "./globals.js";
import {initHTMLelements, initVars, testArray } from "./initialize.js";
import logJSON from "./fakeJSONRead.js";
import Asset from "./Asset.js";
import Game from "./Game.js";
import { BaseURL, BaseURLValue } from "./constants.js";
let game
if (localStorage.getItem("username") != null) {
    let gameScreen = document.getElementById("login");
    gameScreen.style.display = "none";

    let btnPlay = document.getElementById("btnPlay");
    btnPlay.style.display = "block";
    
    let logout = document.getElementById("Logout");
    logout.style.display = "block";

    let goToRegister = document.getElementById("goToRegister");
    goToRegister.style.display = "none";

    let register = document.getElementById("register");
    register.style.display = "none";

    let dropDown = document.getElementById("player_list");
    dropDown.style.display = "block";
    
    let opponents = JSON.parse(localStorage.getItem("opponents"))

    for (let i = 0; i < opponents.length; i++) {
        const opponent = opponents[i].username;
        const option = document.createElement("option")
        option.text = opponent
        dropDown.add(option)
        
    }
} else {
    let gameScreen = document.getElementById("login");
    gameScreen.style.display = "block";

    let btnPlay = document.getElementById("btnPlay");
    btnPlay.style.display = "none";

    let goToRegister = document.getElementById("goToRegister");
    goToRegister.style.display = "block";

    let register = document.getElementById("register");
    register.style.display = "none";
}
window.onload = init;
function init(){
    fetch(`${BaseURL[BaseURLValue]}/test`)
    .then((response) => response.json())
    .then((data) => {        
        
        const html = initHTMLelements();
        const canvas = html[0];
        const ctx = html[1];
        initVars();
        
        //initEvents(canvas);
        
        game = Game.init(data,canvas,ctx);

        window.requestAnimationFrame(gameLoop,canvas);
    });
}

// GAME EXECUTE
function gameLoop(timeStamp, canvas){

    window.requestAnimationFrame(gameLoop, canvas);

    //Real Time Loop Execution
    const elapsedCycleSeconds = (timeStamp - globals.previousCycleMilliseconds) / 1000; //seconds

    //Last Executed Loop Time
    globals.previousCycleMilliseconds = timeStamp;


    //Fixes delayed Frame Time regarding frameTimeObj
    globals.deltaTime += elapsedCycleSeconds

    globals.cycleRealTime += elapsedCycleSeconds
    if(globals.cycleRealTime >= globals.frameTimeObj){

        game.update();

        game.render();

        //Fixes Excesive Time
        globals.cycleRealTime -= globals.frameTimeObj;
        globals.deltaTime = 0;
    }
}