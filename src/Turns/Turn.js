import { BoardId, CardId, DecksId, GridId, MovePhaseStates, PhaseStates, TurnStates } from "../constants.js";
import globals from "../globals.js";
import DiscardPhase from "./turn_phases/DiscardPhase.js";
import DrawCardPhase from "./turn_phases/DrawCardPhase.js";
import DefaultPhase from "./turn_phases/DefaultPhase.js";
import MinionAttackPhase from "./turn_phases/MinionAttackPhase.js";
import MinionMovementPhase from "./turn_phases/MinionMovementPhase.js";
import Phase from "./turn_phases/Phase.js"; 
import PrepareEventPhase from "./turn_phases/PrepareEventPhase.js";
import UseEventPhase from "./turn_phases/UseEventPhase.js";

export default class Turn {

    constructor(gridArray, mainCharacter, handDeck, minionDeck, graveyardDeck, eventDeck, preparingEventDeck, activeMinionDeck, buttonContainer, eventContainer){

        //this.playerName     = playerName;       // Nombre del player
        //this.playerImage    = playerImage;      // Imgaen del player
        this.handDeck           = handDeck;                 // Mano del player
        this.minionDeck         = minionDeck;               // Mazo de minions
        this.graveyardDeck      = graveyardDeck;            // Mazo cementerio
        this.mainCharacter      = mainCharacter;            // Carta de Character asignada  predefinida desde turnContainer
        this.gridArray          = gridArray;                // Array de rejillas
        this.eventContainer     = eventContainer            // Contenedor de eventos
        this.eventDeck          = eventDeck;                // Mazo de eventos
        this.preparingEventDeck = preparingEventDeck;       // mazo de eventos en preparacion
        this.activeMinionDeck   = activeMinionDeck;         // Mazo de minions activos
        this.buttonContainer    = buttonContainer;          // Contenedor de buttons
        this.active             = false;                    // Variable para saber si el turno esta activo
        this.state              = TurnStates.INITIALIZE;     // Estado del turno
        this.phaseState         = PhaseStates.DEFAULT;      // Estado de la fase
        this.phasesArray        = [];                       // Array de fases
        this.actionsCounter     = 0;                        // Contador de acciones maximo 5
        this.maxActions         = 3;                        // maximo de acciones
        this.finished = false

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
      
            const buttons                   = this.buttonContainer;
      
            const defaultPhase          = new DefaultPhase(buttons, mouse);
            const discardPhase          = new DiscardPhase(handDeck, graveYardDeck)
            const drawCardPhase         = new DrawCardPhase(handDeck, handGrid, eventDeck, graveYardDeck)
            const minionAttackPhase     = new MinionAttackPhase(activeMinionDeck, enemyActiveMinionDeck, mouse);
            const minionMovementPhase   = new MinionMovementPhase(activeMinionDeck, boardGrid, mouse);
            const prepareEventPhase     = new PrepareEventPhase( handDeck, activeEventDeck, handGrid, activeEventGrid);
            const useEventPhase         = new UseEventPhase(activeEventGrid, activeEventDeck,boardGrid, activeMinionDeck, enemyActiveMinionDeck)
    
            const phasesArray = [defaultPhase, discardPhase, drawCardPhase, minionMovementPhase, minionAttackPhase, prepareEventPhase, useEventPhase];
    
            this.phasesArray = phasesArray
    }

    // showPlayerData(){
    //     console.log(this.mainCharacter.name[0]);
    //     console.log(this.mainCharacter.image);
    // }

    update(mouse, enemyActiveMinionDeck, messages){
        switch(this.state){
            
            case TurnStates.INITIALIZE:
                this.init();
                console.log("init");
                this.state = TurnStates.EXECUTION
                this.finished = false
                break;
            
            case TurnStates.EXECUTION:
                // console.log("executiio");
                const isPhasesOver = this.execute(mouse, messages);
                if (enemyActiveMinionDeck.cards.length === 0) {
                    this.finished = true
                }else{
                    if (isPhasesOver) {
                       this.state = TurnStates.END
                    }
                    this.finished = false

                }
                break;

            case TurnStates.END:
                console.log("end");
                const isEndTurn = this.end();
                if (isEndTurn) {
                    this.finished = true
                    
                }
                break;
        }
    }

    init(){
        this.restoreCardStatesFromActiveDecks()
        this.eventContainer.executeEvents()
        this.actionsCounter = 0
        this.phasesArray[PhaseStates.DRAW_CARD].execute()
        
        // indicar turno activo
        this.active = true;
    }

    execute(mouse, messages){
        // Esto es el turnLoop
        switch (this.phaseState) {
            case PhaseStates.PREPARE_EVENT:
                const isPreparationFinished = this.phasesArray[PhaseStates.PREPARE_EVENT].execute(this.eventContainer)
                if (isPreparationFinished) {
                    this.phaseState = PhaseStates.DEFAULT;
                    this.actionsCounter++;
                }
                break;

            case PhaseStates.USE_EVENT_CARD:
                const isUsageFinished = this.phasesArray[PhaseStates.USE_EVENT_CARD].execute(mouse)
                if (isUsageFinished) {
                     this.phaseState = PhaseStates.DEFAULT;
                     this.actionsCounter++;
                }
                
                break;
            
            case PhaseStates.MOVEMENT:
                const isMovementFinished = this.phasesArray[PhaseStates.MOVEMENT].execute()
                if(isMovementFinished){
                    this.phaseState = PhaseStates.DEFAULT;
                    this.actionsCounter++;
                }
                break;
                
            case PhaseStates.ATTACK:
                const isAttackFinished = this.phasesArray[PhaseStates.ATTACK].execute(messages)
                if(isAttackFinished){
                    this.phaseState = PhaseStates.DEFAULT;
                    this.actionsCounter++;
                }
                break; 
                
            case PhaseStates.DISCARD_CARD:
                const isDiscardFinished = this.phasesArray[PhaseStates.DISCARD_CARD].execute();

                if(isDiscardFinished){
                    return true
                }else{
                    return false
                }
                break;
            
            case PhaseStates.DEFAULT:
          
                this.phaseState = this.phasesArray[PhaseStates.DEFAULT].update();
                
                break;
            default:

                break;
        }

        if(this.actionsCounter === this.maxActions){
            this.state = TurnStates.END;
        }
    }

    end(){
        const isCardDiscarded = this.phasesArray[PhaseStates.DISCARD_CARD].execute()
        if (isCardDiscarded) {
            this.blockCardStatesFromHandDeck()
            // cambio de turno
            this.active = false;
            return true
        }else{
            return false
        }
    }

    restoreCardStatesFromActiveDecks(){
        const decks = [this.handDeck, this.activeMinionDeck, this.preparingEventDeck]
        for (let i = 0; i < decks.length; i++) {
            const deck = decks[i];
            for (let j = 0; j < deck.cards.length; j++) {
                const card = deck.cards[j];
                card.state = CardId.NOT_SELECTED
                
            }
        }
    }

    blockCardStatesFromHandDeck(){
        const deck = this.handDeck
            for (let j = 0; j < deck.cards.length; j++) {
                const card = deck.cards[j];
                card.state = CardId.BLOCKED
                
            }
    }

    reduceEventCardsCooldown(){
        for (let i = 0; i < this.preparingEventDeck.cards.length; i++) {
            const card = this.preparingEventDeck.cards[i];
            if (card.cooldown > 0) 
                card.cooldown--
        }
    }
    
}