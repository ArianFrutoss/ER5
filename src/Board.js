import { GridId } from "./constants.js";
import Grid from "./Grid.js";

export default class Board{

    constructor(boardGrid, eventGrids, handGrids){
       
        this.boardGrid          = boardGrid;
        this.eventGrids         = eventGrids;
        this.handGrids          = handGrids;
        this.boardMinions       = [];
    }
    
    // Funcion inicializa Board del juego
    static initBoard(){
    
        // Crear Grid de Board
        const board = Grid.initGrids(200, 200, 7, 5, GridId.BOARD_GRID, 80, 120);
        
        // Crear Grid de Eventos Atacante
        const eventBoardAtacker = Grid.initGrids(100, 200, 5, 1, GridId.HAND_GRID, 80, 120);

        // Crear Grid de Board Defensor
        const eventBoardDefender = Grid.initGrids(100, 200, 5, 1, GridId.HAND_GRID, 80, 120);

        // Crear Grid de Hand Atacante
        const handAtacker = Grid.initGrids(100, 200, 3, 3, GridId.EVENT_BOARD_GRID, 80, 120);

        // Crear Grid de Hand Defensor
        const handDefender = Grid.initGrids(100, 200, 3, 3, GridId.EVENT_BOARD_GRID, 80, 120);

        // Crear Arrays de Grids
        const eventGrids = [eventBoardAtacker, eventBoardDefender];
        const handGrids = [handAtacker, handDefender];

        return new Board(board, eventGrids, handGrids);
    }
}