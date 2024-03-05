import Phase from "./Phase.js";

export class DrawCardPhase extends Phase{

    constructor(handDeck, handGrid, eventDeck){

        this.handDeck   = handDeck;
        this.handGrid   = handGrid;
        this.eventDeck  = eventDeck;
        
    }
}