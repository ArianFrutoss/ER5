import globals from "./globals.js";
import { GameState } from "./constants.js";

export default function update(){

    switch(globals.gameState){

        case GameState.INVALID:
            // add logic
            showMouseXY();
            break;

        case GameState.PLAYING:
            // add logic
            break;

        case GameState.GAMEOVER:
            // add logic
            break;

        default:
            
            break;
    }
}

function showMouseXY(){

    console.log("X:" + globals.mouse.x + " Y:" + globals.mouse.y);
}