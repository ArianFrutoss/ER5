import globals from "./globals.js";
import { initEvents, initHTMLelements, initVars, testArray } from "./initialize.js";
import Game from "./Game.js";
import logJSON from "./fakeJSONRead.js";

window.onload = init;

let game;

function init(){

    initHTMLelements();
    logJSON();
    initVars();
    initEvents();
    testArray();

    game = Game.init();

    window.requestAnimationFrame(gameLoop);
}

// GAME EXECUTE
function gameLoop(timeStamp){

    window.requestAnimationFrame(gameLoop, globals.canvas);

    const elapsedCycleSeconds = (timeStamp - globals.previousCycleMiliseconds) / 1000; 

    globals.previousCycleMiliseconds = timeStamp;

    globals.deltaTime += elapsedCycleSeconds;

    if(globals.deltaTime >= globals.frameTimeObj){

        game.update();

        game.render();

        globals.deltaTime -= globals.frameTimeObj;
    }
}