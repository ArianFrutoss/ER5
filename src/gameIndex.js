import globals from "./globals.js";
import {initHTMLelements, initVars, testArray } from "./initialize.js";
import logJSON from "./fakeJSONRead.js";
import Asset from "./Asset.js";
import Game from "./Game.js";
import { BaseURL, BaseURLValue } from "./constants.js";
// import Chart from 'chart.js/auto';

let game
let gameScreen = document.getElementById("login");
let btnPlay = document.getElementById("btnPlay");
let logout = document.getElementById("Logout");
let goToRegister = document.getElementById("goToRegister");
let register = document.getElementById("register");
let caja = document.getElementById("caja");
let languages = document.getElementById("languages");
let dropDown = document.getElementById("player_list");
let statsBtn = document.getElementById("stats");
let statsDiv = document.getElementById("statsDiv");
let returnBtn = document.getElementById("returnBtn");
if (localStorage.getItem("username") != null) {

    gameScreen.style.display = "none";
    
    logout.style.display = "block";

    statsBtn.style.display = "block";

    statsDiv.style.display = "none"

    goToRegister.style.display = "none";

    register.style.display = "none";

    addUserData();

    caja.style.display = "block";

 

    dropDown.style.display = "block";
    dropDown[0].disabled = true
    languages.selectedIndex = 0
    languages[0].disabled = true
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
    
    statsBtn.style.display = "none";

    goToRegister.style.display = "block";

    register.style.display = "none";

    caja.style.display = "none";

    statsDiv.style.display = "none"
}

statsBtn.addEventListener("click", showStats);
dropDown.addEventListener("change", showBtnIfOpponentSelected);
returnBtn.addEventListener("click",showLobby)
btnPlay.addEventListener("click", init);

function showBtnIfOpponentSelected() {
        if (dropDown.value != "") {
        btnPlay.style.display = "block"
        localStorage.setItem("index", dropDown.selectedIndex - 1);
    }
}

function showStats() {
  let games = document.getElementById("games");
  let gamesDivs = document.getElementsByClassName("left")
  let win = document.getElementById("win");
  let hit = document.getElementById("hit");
  let dmg = document.getElementById("dmg");
  let imgs = document.getElementsByClassName("img")
  let vs = document.getElementsByClassName("vs")
  let title = document.getElementsByClassName("title")
  let div = document.getElementById("returnDiv");
    caja.style.display = "none"
    statsDiv.style.display = "grid"
    games.style.display = "inline-block"
    for(let i=0; i<title.length; i++) { 
      title[i].style.display = "grid"
    }
    for(let i=0; i<gamesDivs.length; i++) { 
      gamesDivs[i].style.display = "inline-grid"
    }
    for(let i=0; i<imgs.length; i++) { 
      imgs[i].style.display = "grid"
    }
    for(let i=0; i<vs.length; i++) { 
      vs[i].style.display = "grid"
    }
    win.style.display = "grid"
    hit.style.display = "grid"
    dmg.style.display = "grid"
    div.style.display = "grid"
    returnBtn.style.display = "grid"

  createWinRateChart()

  createHitStatsChart()

  createLineChart()
  
  
}

function showLobby() {
  gameScreen.style.display = "none";
    
  logout.style.display = "block";

  statsBtn.style.display = "block";

  statsDiv.style.display = "none"

  goToRegister.style.display = "none";

  register.style.display = "none";

  caja.style.display = "block";

  dropDown.style.display = "block";
}
function createWinRateChart(){
  const chart = document.getElementById('winRate')
  chart.style.backgroundColor = 'lightgray'
  const xyValues = [
    {x:50, y:7},
    {x:60, y:8},
    {x:70, y:8},
    {x:80, y:9},
    {x:90, y:9},
    {x:100, y:9},
    {x:110, y:10},
    {x:120, y:11},
    {x:130, y:14},
    {x:140, y:14},
    {x:150, y:15}
  ];

  new Chart("winRate", {
    type: "pie",
    data: {
      labels: [
        'Loses',
        'Wins'
      ],
      datasets: [{
        labels: [
          'Loses',
          'Wins'
        ],
        data: [300, 100],
        backgroundColor: [
          'rgb(255,52,52)',
          'rgb(0,255,0)'
        ],
        hoverOffset: 4
      }]
    }
  });
}

function createHitStatsChart(){
  const chart = document.getElementById('hitStats')
  chart.style.backgroundColor = 'lightgray'
  const labels = ['January','February','March','April','May','June','July'];
  const data = {
  labels: labels,
  datasets: [{
    label: 'Melee Hits',
    data: [65, 59, 80, 81, 56, 55, 40],
    backgroundColor: 'rgba(54, 162, 235)',
    borderColor: 'rgb(0, 0, 0)',
    borderWidth: 1,
    order: 1
  },
  {
    label: 'Ranged Hits',
    data: [89, 22, 47, 43, 76, 11, 66],
    backgroundColor:'rgba(255, 99, 132)',
    borderColor:'rgb(0, 0, 0)',
    borderWidth: 1,
    order: 0,
    categoryPercentage: 0.45
  }]
};
  new Chart("hitStats", {
    type: 'bar',
    data: data,
    options: {
      scales: {
        x: {
          stacked: true
        },
        y: {
          beginAtZero: true
        }
      }
    },
  });
}

function createLineChart() {
  const chart = document.getElementById('damageStats')
  chart.style.backgroundColor = 'lightgray'
  const labels = ['January','February','March','April','May','June','July'];
  const data = {
    
    labels: labels,
    datasets: [{
    label: 'Damage Done',
    data: [65, 59, 80, 81, 56, 55, 40],
    fill: false,
    borderColor: 'rgb(75, 192, 192)',
    tension: 0.1
  },
  {
    label: 'Damage Received',
    data: [15, 28, 58, 73, 39, 44, 52],
    fill: false,
    borderColor: 'red',
    tension: 0.1
  }]
};
const config = {
  type: 'line',
  data: data,
};
  new Chart('damageStats', config)
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


