import Phase from "./Phase.js";

export class DiscardPhase extends Phase{

    constructor(handDeck, handGrid, graveyardDeck){
        this.handDeck   = handDeck;
        this.handGrid   = handGrid;
        this.graveyardDeck  = graveyardDeck;
    }
}