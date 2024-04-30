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
    }
}

function showStats() {
  const id = localStorage.mongo_id
  fetch(`http://localhost:4000/getStatsData/${id}`)
    .then((response) => response.json())
    .then((data) => {  
          
      let games = document.getElementById("games");
      let gamesDivs = document.getElementsByClassName("user")
      let win = document.getElementById("win");
      let hit = document.getElementById("hit");
      let dmg = document.getElementById("dmg");
      let imgs = document.getElementsByClassName("img")
      let vs = document.getElementsByClassName("vs")
      let title = document.getElementsByClassName("title")
      let div = document.getElementById("returnDiv");
        caja.style.display = "none"
        statsDiv.style.display = "grid"
        for(let i=0; i<title.length; i++) { 
          title[i].style.display = "grid"
        }
        win.style.display = "grid"
        hit.style.display = "grid"
        dmg.style.display = "grid"
        div.style.display = "grid"
        returnBtn.style.display = "grid"
    
      createLeftSideCharts(id, data)
    
      createRightSideCharts(id, data)
    
    });

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
function createLeftSideCharts(id, games) {
  const opponentsData = JSON.parse(localStorage.getItem("opponents"))
  let wins = 0
  let loses = 0
  let opponents = []

  for (let i = 0; i < opponentsData.length; i++) {
    const opponent = {
      id: opponentsData[i].mongo_id,
      winsVsPlayer: 0,
      losesVsPlayer:0
    };
    opponents.push(opponent)
  }

  for (let i = 0; i < games.length; i++) {
    const game = games[i];
    if(game.winner === id){
      wins++
      const enemy = getOpponent(opponents, game.loser)
      enemy.losesVsPlayer++
    }else{
      loses++
      const enemy = getOpponent(opponents, game.winner)
      enemy.winsVsPlayer++
    }
  }
  createWinRateChart(wins, loses)
  createVsWinRateChart(opponents)
}
function getOpponent(list, id){
  for (let i = 0; i < list.length; i++) {
    const opponent = list[i];
    if (opponent.id === id) {
      return opponent
    }
    
  }
}
function createVsWinRateChart(opponents){
for (let i = 0; i < opponents.length; i++) {
  const opponent = opponents[i];
  addElement(opponent)
  addElement(opponent)
}

}
function addElement(opponent) {
  const user = document.getElementById('content')
  const div = document.createElement("div")
  div.setAttribute('class', 'user')
  user.appendChild(div)

  const barGreen = document.createElement("div")
  barGreen.setAttribute('class', 'bar green')
  barGreen.style.width = opponent.losesVsPlayer * 10 + "px"
  barGreen.style.left  = 250 - (opponent.losesVsPlayer * 10)/2 + "px"
  div.appendChild(barGreen)
  const img = document.createElement("img")
  img.setAttribute('src', './media/images/cards_img/Angelo_di_Mortis.png');
  img.setAttribute('class', 'img');
  img.setAttribute('alt', 'Avatar');
  img.style.width = "100%";
  img.style.maxWidth = "100px";
  div.appendChild(img)


  const text = document.createElement("p")
  text.setAttribute('class', 'vs');
  div.appendChild(text)
  text.innerText = ` ${opponent.losesVsPlayer} VS. ${opponent.winsVsPlayer}`


  const enemyImg = document.createElement("img")
  enemyImg.setAttribute('src', './media/images/cards_img/Angelo_di_Mortis.png');
  enemyImg.setAttribute('class', 'img');
  enemyImg.setAttribute('alt', 'Avatar');
  enemyImg.style.width = "100%";
  enemyImg.style.maxWidth = "100px";
  div.appendChild(enemyImg)

  const barRed = document.createElement("div")
  barRed.setAttribute('class', 'bar red')
  barRed.style.width = opponent.winsVsPlayer * 10 + "px"
  barRed.style.left  = 250 + (opponent.winsVsPlayer * 10)/2 + "px"
  div.appendChild(barRed)
}
function createWinRateChart(wins, loses){
  const chart = document.getElementById('winRate')
  chart.style.backgroundColor = 'lightgray'
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
        data: [loses, wins],
        backgroundColor: [
          'rgb(255,52,52)',
          'rgb(0,255,0)'
        ],
        hoverOffset: 4
      }]
    }
  });
}

function createRightSideCharts(id, games){
  const chart = document.getElementById('hitStats')
  chart.style.backgroundColor = 'lightgray'
  const labels = [ "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December" ];
  let melee       = []
  let ranged      = []
  let dmgDone     = []
  let dmgReceived = []
  
  for (let i = 0; i < labels.length; i++) {
    melee[i]        = 0
    ranged[i]       = 0
    dmgDone[i]      = 0
    dmgReceived[i]  = 0 
}

  for (let i = 0; i < games.length; i++) {
    const game = games[i];
    const month = getDateMonth(game.date)
    for (let j = 0; j < game.players.length; j++) {
      const player = game.players[j];
      if (player.player_id === id) {

        melee[month]        += player.meleeHits
        ranged[month]       += player.rangedHits
        dmgDone[month]      += player.damageDone
        dmgReceived[month]  += player.damageReceived 
      }
      
    }
  }


  createHitStatsChart(melee, ranged, labels)
  createLineChart(dmgDone, dmgReceived, labels)
}
function createHitStatsChart(melee, ranged, months) {
  const chart = document.getElementById('damageStats')
  chart.style.backgroundColor = 'lightgray'
  const data = {
    labels: months,
    datasets: [{
      label: 'Melee Hits',
      data: melee,
      backgroundColor: 'rgba(54, 162, 235)',
      borderColor: 'rgb(0, 0, 0)',
      borderWidth: 1,
      order: 1
    },
    {
      label: 'Ranged Hits',
      data: ranged,
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
function createLineChart(dmgDone, dmgReceived, months) {
  const chart = document.getElementById('damageStats')
  chart.style.backgroundColor = 'lightgray'
  const labels = months
  const data = {
    
    labels: labels,
    datasets: [{
    label: 'Damage Done',
    data: dmgDone,
    fill: false,
    borderColor: 'rgb(75, 192, 192)',
    tension: 0.1
  },
  {
    label: 'Damage Received',
    data: dmgReceived,
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
function getDateMonth(dateString) {
  var dateSplit = dateString.split("-");
  return  parseInt(dateSplit[1],10) - 1;

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


