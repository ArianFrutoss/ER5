import { GridId } from "./constants.js";
import globals from "./globals.js";
import Grid from "./Grid.js";

export default class Board{

    constructor(grids){
       
        this.grids              = grids;
        this.boardMinions       = [];
    }
    
    // Funcion inicializa Board del juego
    static initBoard(canvas){

        const modifyer = 40;

        // Atributos del Grid de Board
        const boardRows = 7;
        const boardColumns = 5;
        const boardSlotXSize = 133;
        const boardSlotYSize = 155;
        const boardXPos = canvas.width / 2 - boardRows * boardSlotXSize / 2;
        const boardYPos = canvas.height / 2 - boardColumns * boardSlotYSize / 2 - modifyer;

        // Atributos de los Grids de Eventos
        const eventRows = 3;
        const eventColumns = 3;
        const eventSlotXSize = 100;
        const eventSlotYSize = 100;
        const eventBoardXPos = canvas.width - eventRows * eventSlotXSize;
        const eventBoardAtackerYPos = canvas.height / 2 - eventColumns * eventSlotYSize;
        const eventBoardDefenderYPos = canvas.height / 2;

        // Atributos de los Grids de Hand
        const handRows = 5;
        const handColumns = 1;
        const handSlotXSize = 247;
        const handSlotYSize = 379;
        const handXPos = canvas.width / 2 - handRows * handSlotXSize / 2;
        const handAtackerYpos = canvas.height - handColumns * handSlotYSize / 2 - modifyer;
        const handDefenderYpos = -handSlotYSize / 2 - modifyer;

        // Crear Grid de Board
        const board = Grid.initGrids(boardXPos, boardYPos, boardRows, boardColumns, GridId.BOARD_GRID, boardSlotXSize, boardSlotYSize);

        // Crear Grid de Eventos Atacante
        const eventBoardAtacker = Grid.initGrids(eventBoardXPos, eventBoardAtackerYPos, eventRows, eventColumns, GridId.PLAYER_1_EVENT_GRID, eventSlotXSize, eventSlotYSize);
        
        // Crear Grid de Board Defensor
        const eventBoardDefender = Grid.initGrids(eventBoardXPos, eventBoardDefenderYPos, eventRows, eventColumns, GridId.PLAYER_2_EVENT_GRID, eventSlotXSize, eventSlotYSize);

        // Crear Grid de Hand Atacante
        const handAtacker = Grid.initGrids(handXPos, handAtackerYpos, handRows, handColumns, GridId.PLAYER_1_HAND_GRID, handSlotXSize, handSlotYSize);

        // Crear Grid de Hand Defensor
        const handDefender = Grid.initGrids(handXPos, handDefenderYpos, handRows, handColumns, GridId.PLAYER_2_HAND_GRID, handSlotXSize, handSlotYSize);

        // Crear Arrays de Grids
        const grids = [board, eventBoardAtacker, eventBoardDefender, handAtacker, handDefender];

        return new Board(grids);
    }
}