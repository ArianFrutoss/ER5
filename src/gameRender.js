import globals from "./globals.js";
import { Game } from "./constants.js";

export default function render(){

    switch(globals.gameState){
        case Game.LOAD_GAME:
            //draw load spinner
            break;
        
        case Game.PLAYING:
            drawGame();
            break;
        
        default:
            break;

    }
}

function drawGame(){

    globals.ctx.clearRect(0, 0, globals.canvas.width, globals.canvas.height);

    globals.ctx.fillText("FPS:" + 1 / globals.deltaTime, 30, 30);

}