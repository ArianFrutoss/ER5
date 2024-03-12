import Phase from "./Phase.js";

export default class DrawCardPhase extends Phase{

    constructor(handDeck, handGrid, eventDeck){

        this.handDeck   = handDeck;
        this.handGrid   = handGrid;
        this.eventDeck  = eventDeck;
    }

    
}