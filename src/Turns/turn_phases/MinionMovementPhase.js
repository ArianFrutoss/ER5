import Phase from "./Phase.js";

export default class MinioonMovementPhase extends Phase{

    constructor(boardGrid, minionCard){
        
        this.boardGrid  = boardGrid;
        this.minionCard = minionCard;
    }
}