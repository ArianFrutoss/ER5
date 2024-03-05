import Phase from "./Phase.js";

export class PrepareEventPhase extends Phase{

    constructor(handDeck, handGrid){
        this.handDeck   = handDeck;
        this.handGrid   = handGrid;
    }
}