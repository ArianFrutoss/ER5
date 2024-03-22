import Phase from "./Phase.js";
import { CardId, SlotsState } from "../../constants.js";

export default class MinionMovementPhase extends Phase {

    constructor(activeMinionDeck, boardGrid, mouse) {
        super();
        this.activeMinionDeck = activeMinionDeck;         // Deck de minions activos
        this.boardGrid = boardGrid;             // Grid del tablero
        this.mouse = mouse;                    // Objeto Mouse
    }

    execute() {
        
        const isAnyCardSelected = this.activeMinionDeck.isAnyCard(this.activeMinionDeck, CardId.SELECTED);
        const isAnySlotHovered  = this.boardGrid.isAnySlot(this.boardGrid, SlotsState.HOVER);

        if (isAnyCardSelected[0] && isAnySlotHovered[0]) {
            
            const minionPosition    = isAnyCardSelected[1];
            const slotPositionI     = isAnySlotHovered[1];
            const slotPositionJ     = isAnySlotHovered[2];
            
            const minionSelected    = this.activeMinionDeck.cards[minionPosition];
            const slotSelected      = this.boardGrid.slots[slotPositionI][slotPositionJ];
            
            this.boardGrid.aviableSlots(minionSelected);
            
            const distance = slotSelected.calculateDistance(minionSelected);

            if (minionSelected.speed >= distance){

                if (isAnySlotHovered[0] && !this.mouse.leftClick && this.mouse.previousStateLeft){

                    this.moveMinion(minionSelected, slotSelected);
                    this.boardGrid.clearSlots();
                    return true;
                }
            }
        }
    }

    // funcion para realizar el movimiento
    moveMinion(minionSelected, slotSelected){
        
        minionSelected.xPos = slotSelected.xPos;
        minionSelected.yPos = slotSelected.yPos;
        minionSelected.state = CardId.NOT_SELECTED;
    }
}