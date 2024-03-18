
import Phase from "./Phase.js";
import { AttackEvent } from "../../Events/phase_events/AttackEvent.js";
import { CardId, MovePhaseStates, SlotsState } from "../../constants.js";

export default class MinionMovementPhase extends Phase{

    constructor(boardGrid, mouse){
        super();
        this.boardGrid      = boardGrid;
        this.mouse          = mouse;
        this.state          = MovePhaseStates.NONE;
    }

    
    attack(){
        const attacker  = this.selectAttacker(this.boardGrid);
        const objective = this.selectObjective(this.boardGrid);
      
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
         
                if (slot.state === SlotsState.HOVER && this.mouse.leftClick){

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
                if (this.mouse.leftClick) {

  
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
                this.attack();
                break;
        }
    }
}
