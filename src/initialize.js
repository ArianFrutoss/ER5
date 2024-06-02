import globals from "./globals.js";
import { GameState, FPS, GridId } from "./constants.js"
import CardFactory from "./Cards/CardFactory.js";


function initHTMLelements(){
    
    console.log("initHtml");
    //canvas
    const canvas = document.getElementById('gameScreen');

    //Context
    const ctx = canvas.getContext("2d");

    //Eliminacion del Anti-Aliasing
    ctx.imageSmoothingEnabled = false;

    return [canvas,ctx]
    // globals.txtPruebas = document.getElementById('txtPruebas');
}

// funcion inicializa variables del juego
function initVars(){
console.log("initVars");
    //variables de gestion de tiempo
    globals.previousCycleMiliseconds = 0;
    globals.deltaTime = 0;
    globals.frameTimeObj = 1 / FPS;
    
    //Inicializamos el estado del juego
    globals.gameState = GameState.INVALID;

    globals.action = {

        mousePressed: false
    }

    globals.mouse = {
        x: -1,
        y: -1
    }
}

function testArray(){

    // console.log(jsonArray);

    // const cardFactory = new CardFactory(jsonArray);
    
    // cardFactory.createCards();
    
    // console.log(globals.cards);
}

// Exportar funciones
export{

    initHTMLelements,
    initVars,
    testArray,
}