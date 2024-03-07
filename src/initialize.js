import globals from "./globals.js";
import { Game, FPS } from "./constants.js";
import CardFactory from "./Cards/CardFactory.js";

function initHTMLelements(){

    //canvas
    globals.canvas = document.getElementById('gameScreen');

    //Context
    globals.ctx = globals.canvas.getContext("2d");

    //Eliminacion del Anti-Aliasing
    globals.ctx.imageSmoothingEnabled = false;

    globals.txtPruebas = document.getElementById('txtPruebas');


}

// funcion inicializa variables del juego
function initVars(){

    //variables de gestion de tiempo
    globals.previousCycleMiliseconds = 0;
    globals.deltaTime = 0;
    globals.frameTimeObj = 1 / FPS;
    
    //Inicializamos el estado del juego
    globals.gameState = Game.INVALID;
}

function testArray(){
    const test    = [{
            "id":4,
            "name":"Prueba 4",
            "description": "esto es una prueba de armadura",
            "deskripzioa": "proba bat da",
            "image": "BarKeep",
            "rarity": "Common",
            "type": "Minion",
            "attributes":{
                "attack": 4,
                "defense": 2,
                "hp": 10,
                "speed": 1
            },
            "effects":{
                "id": 0,
                "description": "Prueba de modificacion de atributos de def y hp",
                "attributes": {
                    "defense": 2,
                    "hp": 1
                }
            }
    }]
    


    const cardFactory = new CardFactory(test);
    
    cardFactory.createCards();
    
    console.log(globals.cards);
}

// Exportar funciones
export {
    initHTMLelements,
    initVars,
    testArray
}