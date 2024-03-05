import Event from "../Event";

export class MoveEvent extends MoveEvent{

    constructor(minionObjective, boardGrid){
        this.minionObjective    = minionObjective;
        this.boardGrid          = boardGrid;
    }
}