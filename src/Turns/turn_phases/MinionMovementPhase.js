
import Phase from "./Phase.js";
import { AttackEvent } from "../../Events/phase_events/AttackEvent.js";
import { MovePhaseStates, PhaseStates, SlotsState } from "../../constants.js";

export default class MinionMovementPhase extends Phase{

    constructor(boardGrid, mouse){
        super();
        this.boardGrid      = boardGrid;
        this.mouse          = mouse;
        this.state          = MovePhaseStates.NONE;
    }

    
    attack(attacker, objective){

        if(attacker != null && objective != null){

          
            const attackEvent = new AttackEvent(attacker, objective);
            attackEvent.execute();
       

        }
 
        this.state = MovePhaseStates.NONE;
   
    }   

    selectAttacker(grid){
        for (let i = 0; i < grid.slots.length; i++) {
            const slotArray = grid.slots[i];
            for (let j = 0; j < slotArray.length; j++) {
                const slot = slotArray[j];
                if (slot.state === SlotsState.SELECTED && slot.card){

                    this.state = MovePhaseStates.SELECT_OBJECTIVE;
                    return slot.card;
                }
            }
        }
        return null
    }

    selectObjective(grid){
        for (let i = 0; i < grid.slots.length; i++) {
            const slotArray = grid.slots[i];
            for (let j = 0; j < slotArray.length; j++) {
                const slot = slotArray[j];
                if (slot.state === SlotsState.SELECTED && slot.card) {

                    this.state = MovePhaseStates.ATTACK;
                    return slot.card;
                }
            }
        }
        return null
    }



    update(state){
        this.state = state;

        switch(this.state){

            case MovePhaseStates.MOVE:
        
                // añadir logica para el movimiento
                break;
            
            case MovePhaseStates.ATTACK:
                // Añadir logica para ataque
                const attacker = this.selectAttacker(this.boardGrid);
                const objective = this.selectObjective(this.boardGrid);

                this.attack(attacker, objective);
                break;

            case MovePhaseStates.SELECT_ATTACKER:
                this.selectAttacker();
                break;

            case MovePhaseStates.SELECT_OBJECTIVE:
                this.selectObjective();
                break;
        }
    }
}
