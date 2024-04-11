import globals from "./globals.js";
import {initHTMLelements, initVars, testArray } from "./initialize.js";
import logJSON from "./fakeJSONRead.js";
import Asset from "./Asset.js";
import Game from "./Game.js";
import { GameState } from "./constants.js";

let game
if (localStorage.getItem("username") != "") {
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

    addUserData();

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

let btnPlay = document.getElementById("btnPlay");

btnPlay.addEventListener("click", init);

function init(){
    fetch('http://localhost:3000/test')
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

function addUserData() {
    
    let newDiv = document.createElement("div");
    let user   = document.createTextNode("user : " + localStorage.getItem("username"));
    let email  = document.createTextNode("email : " + localStorage.getItem("email"));
    let br     = document.createElement("br");
    newDiv.appendChild(user);
    newDiv.appendChild(br);
    newDiv.appendChild(email);
    

    newDiv.style.marginLeft = "10px";
    let btnPlay = document.getElementById("btnPlay");
    btnPlay.addEventListener("click", ()=> {
        newDiv.style.display = "none";
    });
    
    // añade el elemento creado y su contenido al DOM
    let currentDiv = document.getElementById("div1");
    document.body.insertBefore(newDiv, currentDiv);
}


