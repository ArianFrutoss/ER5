import globals from "./globals.js";
import { Game, FPS, GridId } from "./constants.js";
import Grid from "./Grid.js";
import Slot from "./Slot.js";
import Board from "./Board.js";

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

    // Crear el Grid de Board
    initGrid();
}

// Funcion crea un Grid y sus Slots
function initGrid(){

    // Posicion del Grid
    const gridXPos = 100;
    const gridYpos = 200;

    // Filas y Columnas
    const rows = 10;
    const columns = 6;

    // Id del Grid
    const id = GridId.BOARD_GRID;

    // Array de Slots para guardar en el Grid
    let slotsArray = [];

    for (let i = 0; i < columns; i++){

        for (let j = 0; j < rows; j++){

            // Tamaño de los Slots
            const slotsXsize = 80;
            const slotsYsize = 120;

            // Calculo de la posicion de los Slots
            let slotsXPos = gridXPos + slotsXsize * j;
            let slotsYPos = gridYpos + slotsYsize * i;

            // Crear Slots
            const slots = new Slot(slotsXPos, slotsYPos, slotsXsize, slotsYsize, id);

            slotsArray.push(slots);
        }
    }

    // Crear Grid
    const grid = new Grid(gridXPos, gridYpos, id, rows, columns, slotsArray);
}

// Exportar funciones
export {
    initHTMLelements,
    initVars,
    initGrids
}