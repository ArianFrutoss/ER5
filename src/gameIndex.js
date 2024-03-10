import globals from "./globals.js";
import { initEvents, initHTMLelements, initVars, testArray } from "./initialize.js";
import logJSON from "./fakeJSONRead.js";
import Asset from "./Asset.js";
import Game from "./Game.js";
import { GameState } from "./constants.js";

let game
window.onload = init;
function init(){

    initHTMLelements();
    initVars();
    initEvents();
    testArray();

    game = Game.init();

    game.gameState = GameState.PLAYING
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