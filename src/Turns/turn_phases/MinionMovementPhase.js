import { PhaseStates } from "../../constants.js";
import Phase from "./Phase.js";
import { AttackEvent } from "../../Events/phase_events/AttackEvent.js";

export default class MinionMovementPhase extends Phase{

    constructor(boardGrid, mouse){
        super();
        this.boardGrid      = boardGrid;
        this.mouse          = mouse;
    }

    
    calculateDistanceFromAttacker(){
        this.isGridSelected(this.boardGrid);

        console.log(this.boardGrid);
    }

    isGridSelected(grid){
        for (let i = 0; i < grid.slots.length; i++) {
            const slotArray = grid.slots[i];
            for (let j = 0; j < slotArray.length; j++) {
                const slot = slotArray[j];
                if (slot.state === SlotsState.SELECTED) {
                    return [true, slot]
                }
                
            }
            
        }
        return [false]
    }
}
