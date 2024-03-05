import Event from "../Event.js";

export class DrawCardEvent extends Event{

    constructor(handArray, handEventDeck){
        this.handArray      = handArray;
        this.handEventDeck  = handEventDeck;
    }
}