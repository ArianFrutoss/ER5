import Phase from "./Phase.js";

export default class DiscardPhase extends Phase{

    constructor(handDeck, handGrid, graveyardDeck){
        super();
        this.handDeck   = handDeck;
        this.handGrid   = handGrid;
        this.graveyardDeck  = graveyardDeck;
    }
}