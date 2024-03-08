import { GameState } from "./constants.js";
import Board from "./Board.js";
import globals from "./globals.js";

export default class Game{

    constructor(turnArray, handsArray, cardsArray, boardMinionsArray, deckArray, gridsArray, activeEventsArray, rarity){

        this.turnArray          = turnArray;
        this.handsArray         = handsArray;
        this.cardsArray         = cardsArray;
        this.boardMinionsArray  = boardMinionsArray;
        this.deckArray          = deckArray;
        this.gridsArray         = gridsArray;
        this.activeEventsArray  = activeEventsArray;
        this.turnCounter        = 0;
        this.rarity             = rarity;
        this.gameState          = GameState.PLAYING;  
    }

    static init(){
    
        const board = Board.initBoard();

        return new Game(null, null, null, null, null, board, null, null);
    }
    
    update(){

        switch(this.gameState){
            
            case GameState.LOAD_GAME:
                console.log("load game");
                break;
    
            case GameState.PLAYING:
                console.log("playing");
                break;
    
            case GameState.GAMEOVER:
                console.log("gameover");
                break;
    
            default:
                
                break;
        }
    }

    render(){

        switch(this.gameState){
            case GameState.LOAD_GAME:
                //draw load spinner
                break;
            
            case GameState.PLAYING:
                this.drawGame();
                break;
            
            default:
                break;
    
        }
    }
        
    drawGame(){
        
        globals.ctx.clearRect(0, 0, globals.canvas.width, globals.canvas.height);
        
        globals.ctx.fillText("FPS:" + 1 / globals.deltaTime, 30, 30);
        
        // Funcion para renderizar los Grids
        this.renderGrids();
    }
        
    renderGrids(){

        // Cantidad de Grids que se van a renderizar
        const gridsLength = this.gridsArray.grids.length;
        
        for (let i = 0; i < gridsLength; i++){
            
            // Numero de filas y comumnas de los Slots
            const rows = this.gridsArray.grids[i].slots.length;
            const columns = this.gridsArray.grids[i].slots.length;

            for (let j = 0; j < rows; j++){

                for (let k = 0; k < columns; k++){
                    
                    // Posicion y tamaño de los Slots
                    const slotsXPos = this.gridsArray.grids[i].slots[j][k].xPos;
                    const slotsYPos = this.gridsArray.grids[i].slots[j][k].yPos;
                    const slotsXSize = this.gridsArray.grids[i].slots[j][k].xSize - 2;
                    const slotsYSize = this.gridsArray.grids[i].slots[j][k].ySize - 2;
                    
                    globals.ctx.fillRect(slotsXPos, slotsYPos, slotsXSize, slotsYSize);
                }
            }
        }
    }
}