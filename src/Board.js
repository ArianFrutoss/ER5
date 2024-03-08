import { GridId } from "./constants.js";
import globals from "./globals.js";
import Grid from "./Grid.js";

export default class Board{

    constructor(grids){
       
        this.grids              = grids;
        this.boardMinions       = [];
    }
    
    // Funcion inicializa Board del juego
    static initBoard(){

        // Crear Grid de Board
        const board = Grid.initGrids(1000, 200, 7, 5, GridId.BOARD_GRID, 80, 120);
        
        // Crear Grid de Eventos Atacante
        const eventBoardAtacker = Grid.initGrids(100, 200, 5, 1, GridId.HAND_GRID, 80, 120);
        
        // Crear Grid de Board Defensor
        const eventBoardDefender = Grid.initGrids(100, 200, 5, 1, GridId.HAND_GRID, 80, 120);

        // Crear Grid de Hand Atacante
        const handAtacker = Grid.initGrids(100, 200, 3, 3, GridId.EVENT_BOARD_GRID, 80, 120);

        // Crear Grid de Hand Defensor
        const handDefender = Grid.initGrids(100, 200, 3, 3, GridId.EVENT_BOARD_GRID, 80, 120);

        // Crear Arrays de Grids
        const grids = [board, eventBoardAtacker, eventBoardDefender, handAtacker, handDefender];

        return new Board(grids);
    }
}