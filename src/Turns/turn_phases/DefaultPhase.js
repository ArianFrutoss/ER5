import Phase from "./Phase.js";

export class DefaultPhase {

    constructor(handDeck, handGrid, boardGrid, boardMinion, eventBoardGrid){

        this.handDeck       = handDeck;
        this.handGrid       = handGrid;
        this.boardGrid      = boardGrid;
        this.boardMinion    = boardMinion;
        this.eventBoardGrid = eventBoardGrid;
    }
}