import globals from "./globals.js";
import {initHTMLelements, initVars, testArray } from "./initialize.js";
import logJSON from "./fakeJSONRead.js";
import Asset from "./Asset.js";
import Game from "./Game.js";
import { BaseURL, BaseURLValue } from "./constants.js";
// import { Chart } from "chart.js";
// var xyValues = [
//     {x:50, y:7},
//     {x:60, y:8},
//     {x:70, y:8},
//     {x:80, y:9},
//     {x:90, y:9},
//     {x:100, y:9},
//     {x:110, y:10},
//     {x:120, y:11},
//     {x:130, y:14},
//     {x:140, y:14},
//     {x:150, y:15}
//   ];
  
//   new Chart("myChart", {
//     type: "scatter",
//     data: {
//       datasets: [{
//         pointRadius: 4,
//         pointBackgroundColor: "rgb(0,0,255)",
//         data: xyValues
//       }]
//     },
//     options: {
//       legend: {display: false},
//       scales: {
//         xAxes: [{ticks: {min: 40, max:160}}],
//         yAxes: [{ticks: {min: 6, max:16}}],
//       }
//     }
//   });

let game
let gameScreen = document.getElementById("login");
let btnPlay = document.getElementById("btnPlay");
let logout = document.getElementById("Logout");
let goToRegister = document.getElementById("goToRegister");
let register = document.getElementById("register");
let caja = document.getElementById("caja");
let dropDown = document.getElementById("player_list");
let statsBtn = document.getElementById("stats");
let statsDiv = document.getElementById("statsDiv");
if (localStorage.getItem("username") != null) {

    gameScreen.style.display = "none";
    
    logout.style.display = "block";

    stats.style.display = "block";

    goToRegister.style.display = "none";

    register.style.display = "none";

    addUserData();

    caja.style.display = "block";

 

    dropDown.style.display = "block";
    
    let opponents = JSON.parse(localStorage.getItem("opponents"))

    for (let i = 0; i < opponents.length; i++) {
        const opponent = opponents[i].username;
        const option = document.createElement("option")
        option.text = opponent
        dropDown.add(option)
        
    }
} else {
    gameScreen.style.display = "block";

    btnPlay.style.display = "none";
    
    stats.style.display = "none";

    goToRegister.style.display = "block";

    register.style.display = "none";

    caja.style.display = "none";
}
statsBtn.addEventListener("click", showStats);
dropDown.addEventListener("change", showBtnIfOpponentSelected);

btnPlay.addEventListener("click", init);

function showBtnIfOpponentSelected() {
        if (dropDown.value != "") {
        btnPlay.style.display = "block"
    }
}
function showStats() {
    caja.style.display = "none"
    statsDiv.style.display = "block"
}
function init(){
    fetch(`${BaseURL[BaseURLValue]}/test`)
    .then((response) => response.json())
    .then((data) => {        
        
        const html = initHTMLelements();
        const canvas = html[0];
        const ctx = html[1];
        initVars();
        
        //initEvents(canvas);
        const language = parseInt(document.getElementById("languages").value);

        game = Game.init(data,canvas,ctx, language);

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
    
    let userData   = document.getElementById("user-data");
    let user   = document.createTextNode("user : " + localStorage.getItem("username"));
    let email  = document.createTextNode("email : " + localStorage.getItem("email"));
    let br     = document.createElement("br");
    userData.appendChild(user);
    userData.appendChild(br);
    userData.appendChild(email);
    let caja = document.getElementById("caja");

    let btnPlay = document.getElementById("btnPlay");
    btnPlay.addEventListener("click", ()=> {
        
        caja.style.display   = "none";
    });
}


