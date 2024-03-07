import globals from "./globals.js";
import update from  "./gameLogic.js";
import render from  "./gameRender.js";
import { initHTMLelements, initVars, testArray } from "./initialize.js";
import logJSON from "./fakeJSONRead.js";


window.onload = init;

function init(){
    initHTMLelements();
    logJSON();
    initVars();
    
    testArray();

    window.requestAnimationFrame(gameLoop);
}


// GAME EXECUTE
function gameLoop(timeStamp){


    window.requestAnimationFrame(gameLoop, globals.canvas);

    const elapsedCycleSeconds = (timeStamp - globals.previousCycleMiliseconds) / 1000; 

    globals.previousCycleMiliseconds = timeStamp;

    globals.deltaTime += elapsedCycleSeconds;

    if(globals.deltaTime >= globals.frameTimeObj){

        update();

        render();

        globals.deltaTime -= globals.frameTimeObj;
    }
}