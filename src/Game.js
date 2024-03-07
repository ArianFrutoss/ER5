export default class Game {

    constructor(turnArray, handsArray, cardsArray, boardMinionsArray, deckArray, gridsArray, activeEventsArray, turnCounter, rarity, gameState){

        this.turnArray          = turnArray;
        this.handsArray         = handsArray;
        this.cardsArray         = cardsArray;
        this.boardMinionsArray  = boardMinionsArray;
        this.deckArray          = deckArray;
        this.gridsArray         = gridsArray;
        this.activeEventsArray  = activeEventsArray;
        this.turnCounter        = turnCounter;
        this.rarity             = rarity;
        this.gameState          = gameState; 
            
    }

    
}