import globals from "./globals.js";
import { Game, FPS, GridId, SlotsState } from "./constants.js";
import Grid from "./Grid.js";
import Slot from "./Slot.js";

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
    initGrid(200, 200, 7, 5, GridId.BOARD_GRID, 80, 120);
    
    // Crear Grid de Eventos Atacante
    initGrid(100, 200, 5, 1, GridId.HAND_GRID, 80, 120);

    // Crear Grid de Board Defensor
    initGrid(100, 200, 5, 1, GridId.HAND_GRID, 80, 120);

    // Crear Grid de Hand Atacante
    initGrid(100, 200, 3, 3, GridId.EVENT_BOARD_GRID, 80, 120);

    // Crear Grid de Hand Defensor
    initGrid(100, 200, 3, 3, GridId.EVENT_BOARD_GRID, 80, 120);
}

// Funcion crea un Grid y sus Slots
function initGrid(xPosGrid, yPosGrid, rowsNum, columnsNum, gridId, xSizeSlots, ySizeSlots){

    // Posicion del Grid
    const gridXPos = xPosGrid;
    const gridYpos = yPosGrid;

    // Filas y Columnas
    const rows = rowsNum;
    const columns = columnsNum;

    // Id del Grid
    const id = gridId;

    // Array de Slots para guardar en el Grid
    let slotsArray = [];

    for (let i = 0; i < columns; i++){

        slotsArray[i] = [];

        for (let j = 0; j < rows; j++){

            // Tamaño de los Slots
            const slotsXsize = xSizeSlots;
            const slotsYsize = ySizeSlots;

            // Calculo de la posicion de los Slots
            let slotsXPos = gridXPos + slotsXsize * j;
            let slotsYPos = gridYpos + slotsYsize * i;

            // Crear Slots
            const slots = new Slot(slotsXPos, slotsYPos, slotsXsize, slotsYsize, id, SlotsState.NOT_SELECTED);

            slotsArray[i][j] = slots;
        }
    }
    
    // Crear Grid
    const grid = new Grid(gridXPos, gridYpos, id, rows, columns, slotsArray);
    console.log(grid)
}

// Exportar funciones
export {
    initHTMLelements,
    initVars,
    initGrids
}