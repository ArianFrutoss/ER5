import globals from "./globals.js";
import { GameState } from "./constants.js";
import CardFactory from "./Cards/CardFactory.js";

export default function update(){

    switch(globals.gameState){

        case GameState.INVALID:
   
            break;

        case GameState.PLAYING:
            console.log("playing");
            break;

        case GameState.GAMEOVER:
            console.log("gameover");
            break;

        default:
            
            break;
    }
}

