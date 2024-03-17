import { BoardId, DecksId, GridId, PhaseStates, TurnStates } from "../constants.js";
import MinionMovementPhase from "./turn_phases/MinionMovementPhase.js";
import Phase from "./turn_phases/Phase.js"; 
import PrepareEventPhase from "./turn_phases/PrepareEventPhase.js";

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
        this.state          = TurnStates.INITIALIZE; //
        this.phaseState     = PhaseStates.DEFAULT
        this.phasesArray    = [];                 // Array de fases
        this.actionsLeft    = 0;                  // Contador de acciones maximo 5
        this.maxActions     = 5;                  // maximo de acciones
  
    }

    createPhases(mouse, grids, decks, turnCounter){

            const handDeck                  = turnCounter === 0 ? decks[DecksId.PLAYER_1_HAND_DECK]             : decks[DecksId.PLAYER_2_HAND_DECK]
            const enemyHandDeck             = turnCounter === 0 ? decks[DecksId.PLAYER_2_HAND_DECK]             : decks[DecksId.PLAYER_1_HAND_DECK]
            const activeMinionDeck          = turnCounter === 0 ? decks[DecksId.PLAYER_1_ACTIVE_MINION_DECK]    : decks[DecksId.PLAYER_2_ACTIVE_MINION_DECK]
            const enemyActiveMinionDeck     = turnCounter === 0 ? decks[DecksId.PLAYER_2_ACTIVE_MINION_DECK]    : decks[DecksId.PLAYER_1_ACTIVE_MINION_DECK]
            const minionDeck                = turnCounter === 0 ? decks[DecksId.PLAYER_1_MINION_DECK]           : decks[DecksId.PLAYER_2_MINION_DECK]
            const enemyMinionDeck           = turnCounter === 0 ? decks[DecksId.PLAYER_2_MINION_DECK]           : decks[DecksId.PLAYER_1_MINION_DECK]
            const activeEventDeck           = turnCounter === 0 ? decks[DecksId.PLAYER_1_PREPARING_EVENT_DECK]  : decks[DecksId.PLAYER_1_PREPARING_EVENT_DECK]
            const activeEventGrid           = turnCounter === 0 ? grids[GridId.PLAYER_1_EVENT_GRID]             : grids[GridId.PLAYER_2_EVENT_GRID]
            const handGrid                  = turnCounter === 0 ? grids[GridId.PLAYER_1_HAND_GRID]              : grids[GridId.PLAYER_2_HAND_GRID]
            const enemyHandGrid             = turnCounter === 0 ? grids[GridId.PLAYER_2_HAND_GRID]              : grids[GridId.PLAYER_1_HAND_GRID]
            const eventDeck                 = decks[DecksId.EVENT_DECK]
            const graveYardDeck             = decks[DecksId.GRAVEYARD_DECK]
            const boardGrid                 = grids[GridId.BOARD_GRID];

           
            const defaultPhase          = "defaultPhase";
            const discardPhase          = "discardPhase";
            const drawCardPhase         = "drawCardPhase";
            const minionMovementPhase   = new MinionMovementPhase(boardGrid, mouse);
            const prepareEventPhase     = new PrepareEventPhase( handDeck, activeEventDeck, handGrid, activeEventGrid);
            const useEventPhase         = "UseEventPhase";
    
            const phasesArray = [defaultPhase, discardPhase, drawCardPhase, minionMovementPhase, prepareEventPhase, useEventPhase];
    
            this.phasesArray = phasesArray
    }

    // showPlayerData(){
    //     console.log(this.mainCharacter.name[0]);
    //     console.log(this.mainCharacter.image);
    // }

    update(){
        
        switch(this.state){

            case TurnStates.INITIALIZE:
                this.init();
                this.state = TurnStates.EXECUTION
                //Esto eliminar al conseguir que funcione la phase
                this.phaseState = PhaseStates.PREPARE_EVENT
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
        switch (this.phaseState) {
            case PhaseStates.PREPARE_EVENT:
                this.phasesArray[PhaseStates.PREPARE_EVENT].execute()
                break;
            
            case PhaseStates.ATTACK:
                this.phasesArray[PhaseStates.ATTACK].execute();
                break;    
            default:

                break;
        }
    }

    end(){
        this.active = false;
    }
}