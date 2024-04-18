import { BoardId, DecksId, GridId, ImageTypes, RarityId } from "./constants.js";
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
        const boardYPos = canvas.height / 2.3 - boardColumns * boardSlotYSize / 2 - modifyer;

        // Atributos de los Grids de Eventos
        const eventRows = 3;
        const eventColumns = 3;
        const eventSlotXSize = 90;
        const eventSlotYSize = 94;
        const eventBoardXPos = canvas.width - eventRows * eventSlotXSize-18;
        const eventBoardAtackerYPos = canvas.height / 2-2;
        const eventBoardDefenderYPos = canvas.height / 2 - eventColumns * eventSlotYSize-19  ;

        // Atributos de los Grids de Hand
        const handRows = 5;
        const handColumns = 1;
        const handSlotXSize = 197.6;
        const handSlotYSize = 303.2;
        const handXPos = canvas.width / 2 - handRows * handSlotXSize / 2;
        const handAtackerYpos = canvas.height - handColumns * handSlotYSize / 1.7 - modifyer;
        const handDefenderYpos = -handSlotYSize / 1.3 - modifyer;

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

    deselect(){

        for (let i = 0; i < this.grids.length; i++){

            const grid = this.grids[i];
            grid.deselect();
        }
    }

    render(images, ctx, canvas, deckContainer) {

        ctx.font = "30px LongaIberica-DEMO";
        
        let image = images[ImageTypes.BOARD_IMAGE][BoardId.BOARD];
        let xPos = 0;
        let yPos = 0;

        ctx.drawImage(

            image, xPos, yPos
        )

        image = images[ImageTypes.BOARD_IMAGE][BoardId.EVENT_DECK_FULL];
        xPos = 25;
        yPos = canvas.height / 2 - image.height / 2;

        ctx.drawImage(

            image, xPos, yPos
        )

        image = images[ImageTypes.BOARD_IMAGE][BoardId.MINION_DECK_FULL];
        xPos = 75;
        yPos = 12;

        ctx.drawImage(

            image, xPos, yPos
        )

        image = images[ImageTypes.BOARD_IMAGE][BoardId.MINION_DECK_HALF];
        xPos = 75;
        yPos = 872;

        ctx.drawImage(

            image, xPos, yPos
        )

        image = images[ImageTypes.BOARD_IMAGE][BoardId.GEM];
        xPos = 295;
        yPos = 55;

        ctx.drawImage(

            image, xPos, yPos
        )

        ctx.fillText(deckContainer.decks[DecksId.PLAYER_1_MINION_DECK].cards.length, image.width / 2 + xPos, image.height / 2 + yPos);

        image = images[ImageTypes.BOARD_IMAGE][BoardId.GEM];
        xPos = 295;
        yPos = 925;

        ctx.drawImage(

            image, xPos, yPos
        )

        ctx.fillText(deckContainer.decks[DecksId.PLAYER_2_MINION_DECK].cards.length, image.width / 2 + xPos, image.height / 2 + yPos);

        image = images[ImageTypes.GAME_RARITY][RarityId.COMMON];
        xPos = 1595;
        yPos = 20;

        ctx.drawImage(

            image, xPos, yPos
        )

            this.renderGrids(ctx)

    }
    
    renderGrids(ctx) {

        // Cantidad de Grids que se van a renderizar
        const gridsLength = this.grids.length;

        for (let i = 0; i < gridsLength; i++) {
            this.grids[i].render(ctx)
        }
    }
}