import globals from "./globals.js";
import { Game } from "./constants.js";
import CardFactory from "./Cards/CardFactory.js";

export default function update(){

    switch(globals.gameState){

        case Game.INVALID:
   
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

