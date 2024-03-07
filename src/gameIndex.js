import globals from "./globals.js";
import { initHTMLelements, initVars } from "./initialize.js";
import Game from "./Game.js";

window.onload = init;

let game;

function init(){

    initHTMLelements();
    initVars();
    
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