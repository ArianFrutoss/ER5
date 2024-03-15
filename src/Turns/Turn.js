import { DecksId, TurnStates } from "../constants.js";
import Phase from "./turn_phases/Phase.js";

export default class Turn {

    constructor(gridArray, mainCharacter, handDeck, minionDeck, graveyardDeck, eventDeck, preparingEventDeck, activeMinionDeck){

        //this.playerName     = playerName;       // Nombre del player
        //this.playerImage    = playerImage;      // Imgaen del player
        this.handDeck       = handDeck;           // Mano del player
        this.minionDeck     = minionDeck;         // Mazo de minions
        this.graveyardDeck  = graveyardDeck;      // Mazo cementerio
        this.mainCharacter  = mainCharacter;      // Carta de Character asignada  predefinida desde turnContainer
        this.gridArray      = gridArray;          // Array de rejillas
        this.eventDeck      = eventDeck;          // Mazo de eventos
        this.preparingEventDeck = preparingEventDeck;   // mazo de eventos en preparacion
        this.activeMinionDeck   = activeMinionDeck;
        this.active         = false;              // Variable para saber si el turno esta activo
        this.state          = TurnStates.INVALID; //
        this.phasesArray    = [];                 // Array de fases
        this.actionsLeft    = 0;                  // Contador de acciones maximo 5
        this.maxActions     = 5;                  // maximo de acciones
  
    }

    createPhases(){

        const phase = new Phase("mouse");

        this.phasesArray = phase.createPhases();
    }

    // showPlayerData(){
    //     console.log(this.mainCharacter.name[0]);
    //     console.log(this.mainCharacter.image);
    // }

    update(){
        
        switch(this.state){

            case TurnStates.INITIALIZE:
                this.init();
                break;
            
            case TurnStates.EXECUTION:
                this.execute();
                break;

            case TurnStates.END:
                this.end();
                break;
        }
    }

    init(){

        this.active = true;
    }

    execute(){
        // add logic
    }

    end(){
        this.active = false;
    }
}