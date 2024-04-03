import Event from "../Event.js";

export class BlockMinionsActionEvent extends Event{

    constructor(minionObjective, minionState){

        this.minionObjective    = minionObjective;
        this.minionState        = minionState;
    }
}