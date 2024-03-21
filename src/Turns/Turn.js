import { BoardId, CardId, DecksId, GridId, MovePhaseStates, PhaseStates, TurnStates } from "../constants.js";
import DrawCardPhase from "./turn_phases/DrawCardPhase.js";
import MinionMovementPhase from "./turn_phases/MinionMovementPhase.js";
import Phase from "./turn_phases/Phase.js"; 
import PrepareEventPhase from "./turn_phases/PrepareEventPhase.js";
import UseEventPhase from "./turn_phases/UseEventPhase.js";

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
        this.phaseState     = PhaseStates.MOVEMENT
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
            const eventDeck                 = decks[DecksId.EVENT_DECK]
            const graveYardDeck             = decks[DecksId.GRAVEYARD_DECK]

            const boardGrid                 = grids[GridId.BOARD_GRID]
            const activeEventDeck           = turnCounter === 0 ? decks[DecksId.PLAYER_1_PREPARING_EVENT_DECK]  : decks[DecksId.PLAYER_2_PREPARING_EVENT_DECK]
            const activeEventGrid           = turnCounter === 0 ? grids[GridId.PLAYER_1_EVENT_GRID]             : grids[GridId.PLAYER_2_EVENT_GRID]
            const handGrid                  = turnCounter === 0 ? grids[GridId.PLAYER_1_HAND_GRID]              : grids[GridId.PLAYER_2_HAND_GRID]
            const enemyHandGrid             = turnCounter === 0 ? grids[GridId.PLAYER_2_HAND_GRID]              : grids[GridId.PLAYER_1_HAND_GRID]

      
            const defaultPhase          = "defaultPhase";
            const discardPhase          = "discardPhase";
            const drawCardPhase         = new DrawCardPhase(handDeck, handGrid, eventDeck, graveYardDeck)
            const minionMovementPhase   = new MinionMovementPhase(activeMinionDeck, enemyActiveMinionDeck, mouse);
            const prepareEventPhase     = new PrepareEventPhase( handDeck, activeEventDeck, handGrid, activeEventGrid);
            const useEventPhase         = new UseEventPhase(activeEventGrid, activeEventDeck,boardGrid, activeMinionDeck, enemyActiveMinionDeck)
    
            const phasesArray = [defaultPhase, discardPhase, drawCardPhase, minionMovementPhase, prepareEventPhase, useEventPhase];
    
            this.phasesArray = phasesArray
    }

    // showPlayerData(){
    //     console.log(this.mainCharacter.name[0]);
    //     console.log(this.mainCharacter.image);
    // }

    update(mouse){
        
        switch(this.state){

            case TurnStates.INITIALIZE:
                this.init();
                this.state = TurnStates.EXECUTION
                //Esto eliminar al conseguir que funcione la phase
                this.phaseState = PhaseStates.PREPARE_EVENT
                break;
            
            case TurnStates.EXECUTION:
                
                this.execute(mouse);
                break;

            case TurnStates.END:
                this.end();
                break;
        }
    }

    init(){
        this.unblockCardStatesFromActiveDecks()
        this.applyEvents()
        this.phasesArray[PhaseStates.DRAW_CARD].execute()
        
        // indicar turno activo
        this.active = true;
    }

    execute(mouse){
        switch (this.phaseState) {
            case PhaseStates.PREPARE_EVENT:
                const isPreparationFinished = this.phasesArray[PhaseStates.PREPARE_EVENT].execute()
                if (isPreparationFinished) {
                    this.phaseState = PhaseStates.USE_EVENT_CARD
                }
                break;

            case PhaseStates.USE_EVENT_CARD:
                const isUsageFinished = this.phasesArray[PhaseStates.USE_EVENT_CARD].execute(mouse)
                if (isUsageFinished) {
                     this.phaseState = PhaseStates.MOVEMENT
                }
                break;
            
            case PhaseStates.MOVEMENT:
                let changePhase = this.phasesArray[PhaseStates.MOVEMENT].update(MovePhaseStates.ATTACK);

                if(changePhase){
                    this.phaseState = PhaseStates.DEFAULT;
                }
                break;    
            default:

                break;
        }
    }

    end(){
        
        // cambio de turno
        this.active = false;
    }

    unblockCardStatesFromActiveDecks(){
        const decks = [this.handDeck, this.activeMinionDeck, this.preparingEventDeck]
        for (let i = 0; i < decks.length; i++) {
            const deck = decks[i];
            for (let j = 0; j < deck.cards.length; j++) {
                const card = deck.cards[j];
                card.state = CardId.NOT_SELECTED
                
            }
        }
    }
    applyEvents(){
        
    }
}