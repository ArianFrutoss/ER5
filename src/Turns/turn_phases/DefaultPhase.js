import Phase from "./Phase.js";

class EstandarPhase extends Phase {

    constructor(handDeck, handGrid, boardGrid, boardMinion, eventBoardGrid){
        super();
        this.handDeck       = handDeck;
        this.handGrid       = handGrid;
        this.boardGrid      = boardGrid;
        this.boardMinion    = boardMinion;
        this.eventBoardGrid = eventBoardGrid;
    }
}

export {
    EstandarPhase
}