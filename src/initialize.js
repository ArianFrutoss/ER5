import globals from "./globals.js";
import { Game, FPS, GridId } from "./constants.js"

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

// Funcion inicializa Grids del juego
function initGrids(){
    
    // Crear Grid de Board
    const board = initGrid(200, 200, 7, 5, GridId.BOARD_GRID, 80, 120);
    
    // Crear Grid de Eventos Atacante
    const eventBoardAtacker = initGrid(100, 200, 5, 1, GridId.HAND_GRID, 80, 120);

    // Crear Grid de Board Defensor
    const eventBoardDefender = initGrid(100, 200, 5, 1, GridId.HAND_GRID, 80, 120);

    // Crear Grid de Hand Atacante
    const handAtacker = initGrid(100, 200, 3, 3, GridId.EVENT_BOARD_GRID, 80, 120);

    // Crear Grid de Hand Defensor
    const handDefender = initGrid(100, 200, 3, 3, GridId.EVENT_BOARD_GRID, 80, 120);

    const grids = [board, eventBoardAtacker, eventBoardDefender, handAtacker, handDefender];

    return grids;
}

// Exportar funciones
export {
    initHTMLelements,
    initVars,
    initGrids
}