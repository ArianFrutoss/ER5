import Turn from "./Turn.js";
import { DecksId } from "../constants.js";

export default class TurnContainer {

    constructor(gridArray, deckContainer){

        this.turnContainer = [];
        this.gridArray     = gridArray;
        this.deckContainer = deckContainer;

    }

    CreateTurns(){

        const player1 = new Turn("gridArray", this.deckContainer);
        player1.createPhases();


        const player2 = new Turn("gridArray", this.deckContainer);
        player2.createPhases();
        this.turnContainer = [player1, player2];
    }
}