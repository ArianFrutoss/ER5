import { DecksId } from "../constants.js";
import Phase from "./turn_phases/Phase.js";

export default class Turn {

    constructor(gridArray, deckContainer){

        //this.playerName     = playerName;       // Nombre del player
        //this.playerImage    = playerImage;      // Imgaen del player
        //this.handDeck       = handDeck;         // Mano del player
        //this.minionDeck     = minionDeck;       // Mazo de minions
        //this.graveyardDeck  = graveyardDeck;    // Mazo cementerio
        this.mainCharacter  = 0;                  // Carta de Character asignada  --> se coge desde deckcontainer
        this.gridArray      = gridArray;          // Array de rejillas
        this.deckContainer  = deckContainer;      // Contenedor de decks
        //this.eventDeck      = eventDeck;        // Mazo de eventos
        this.phasesArray    = [];                 // Array de fases
        this.actionsLeft    = 0;                  // Contador de acciones maximo 5
        this.maxActions     = 5;                  // maximo de acciones
    }

    createPhases(){

        const phase = new Phase("mouse");

        this.phasesArray = phase.createPhases();
        this.assignCharacter();
    }

    assignCharacter(){

        console.log(this.deckContainer.decks[5]);
    }


}