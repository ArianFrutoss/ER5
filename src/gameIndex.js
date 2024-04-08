import globals from "./globals.js";
import {initHTMLelements, initVars, testArray } from "./initialize.js";
import logJSON from "./fakeJSONRead.js";
import Asset from "./Asset.js";
import Game from "./Game.js";
import { GameState } from "./constants.js";

let game
window.onload = init;
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