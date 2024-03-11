import Phase from "./Phase.js";

export default class PrepareEventPhase extends Phase{

    constructor(handDeck, handGrid){
        this.handDeck   = handDeck;
        this.handGrid   = handGrid;
    }
}