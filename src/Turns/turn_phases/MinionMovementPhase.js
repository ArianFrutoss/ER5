import Phase from "./Phase.js";

export class MinioonMovementPhase extends Phase{

    constructor(boardGrid, minionCard){
        
        this.boardGrid  = boardGrid;
        this.minionCard = minionCard;
    }
}