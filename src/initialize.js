import globals from "./globals.js";
import { GameState, FPS, GridId } from "./constants.js"
import CardFactory from "./Cards/CardFactory.js";
import jsonArray from "../cards.js";
import { canvasMousedownHandler, canvasMouseupHandler, canvasMousemoveHandler } from "./mouseEvent.js";

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

    console.log(jsonArray);

    const cardFactory = new CardFactory(jsonArray);
    
    cardFactory.createCards();
    
    console.log(globals.cards);
}

function initEvents(){

    globals.canvas.addEventListener("mouseup", canvasMouseupHandler, false);
    globals.canvas.addEventListener("mousedown", canvasMousedownHandler, false);
    globals.canvas.addEventListener("mousemove", canvasMousemoveHandler, false);

}

// Exportar funciones
export{

    initHTMLelements,
    initVars,
    testArray,
    initEvents
}