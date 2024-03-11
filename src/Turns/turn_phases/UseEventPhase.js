import Phase from "./Phase.js";

export default class UseEventPhase extends Phase{

    constructor(eventGrid, eventsCardsInGridArray, boardGrid, boardMinion){

        this.eventGrid              = eventGrid;
        this.eventsCardsInGridArray = eventsCardsInGridArray;
        this.boardGrid              = boardGrid;
        this.boardMinion            = boardMinion;
    }
}