import globals from "./globals.js";
import { Game } from "./constants.js";

export default function update(){

    switch(globals.gameState){

        case Game.LOAD_GAME:
            console.log("load game");
            break;

        case Game.PLAYING:
            console.log("playing");
            break;

        case Game.GAMEOVER:
            console.log("gameover");
            break;

        default:
            
            break;
    }
}