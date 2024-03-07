import { GameState } from "./constants.js";
import Board from "./Board.js";


export default class Game{

    constructor(turnArray, handsArray, cardsArray, boardMinionsArray, deckArray, gridsArray, activeEventsArray,  rarity){

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
    
            case this.LOAD_GAME:
                console.log("load game");
                break;
    
            case this.PLAYING:
                console.log("playing");
                break;
    
            case this.GAMEOVER:
                console.log("gameover");
                break;
    
            default:
                
                break;
        }
    }


    render(){

        switch(this.gameState){
            case this.LOAD_GAME:
                //draw load spinner
                break;
            
            case this.PLAYING:
                this.drawGame();
                break;
            
            default:
                break;
    
        }
    }
        
    drawGame(){
        
        globals.ctx.clearRect(0, 0, globals.canvas.width, globals.canvas.height);
    
        globals.ctx.fillText("FPS:" + 1 / globals.deltaTime, 30, 30);
        
        renderGrids();
    }
        
    renderGrids(){

        for (let i = 0; i < 0; i++){

        }
    }
}