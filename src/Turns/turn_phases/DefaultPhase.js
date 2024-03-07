import Phase from "./Phase.js";

<<<<<<< HEAD
export class DefaultPhase extends Phase {
=======
export class DefaultPhase {
>>>>>>> develop

    constructor(handDeck, handGrid, boardGrid, boardMinion, eventBoardGrid){

        this.handDeck       = handDeck;
        this.handGrid       = handGrid;
        this.boardGrid      = boardGrid;
        this.boardMinion    = boardMinion;
        this.eventBoardGrid = eventBoardGrid;
    }
}