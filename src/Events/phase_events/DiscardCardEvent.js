import Event from "../Event.js";

export class DiscardCardEvent extends Event{

    constructor(objectiveCard, hand){
        this.objectiveCard      = objectiveCard;
        this.hand               = hand;
    }
}