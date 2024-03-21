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
        
        const isAnyCardSelected = this.activeMinionDeck.isAnyCard(this.activeMinionDeck, CardId.SELECTED)
        const isAnySlotHovered  = this.boardGrid.isAnySlot(this.boardGrid, SlotsState.HOVER)
        
        if (isAnyCardSelected[0] && isAnySlotHovered[0]) {
            
            const minionPosition    = isAnyCardSelected[1]
            const slotPositionI     = isAnySlotHovered[1]
            const slotPositionJ     = isAnySlotHovered[2]
            
            const minionSelected    = this.activeMinionDeck.cards[minionPosition]
            const slotSelected      = this.boardGrid.slots[slotPositionI][slotPositionJ]
            
            const distance = this.calculateDistance(minionSelected, slotSelected);

            if (minionSelected.speed >= distance){

                if (isAnySlotHovered[0] && !this.mouse.leftClick && this.mouse.previousStateLeft){

                    this.moveMinion(minionSelected, slotSelected);
                    return true;
                }
            }
        }
    }

    calculateDistance(minion, slot){

        const boardSlotXSize = 133;     // Ancho del slot en X
        const boardSlotYSize = 155;     // Alto del slot en Y

        const xPosAttacker = minion.xPos;     // Posicion en x del Atacante
        const xPosEnemy = slot.xPos;          // Posicion en x Del rival
        const yPosAttacker = minion.yPos;     // Posicion en y Atacante
        const yPosEnemy = slot.yPos;          // Posicion en y del rival

        // Calcular la diferencia en píxeles en slots
        const xDifference = Math.abs(xPosAttacker - xPosEnemy);
        const yDifference = Math.abs(yPosAttacker - yPosEnemy);
        
        // Calcular la distancia en  slots
        const distanceXSlots = Math.ceil(xDifference / boardSlotXSize);
        const distanceYSlots = Math.ceil(yDifference / boardSlotYSize);

        console.log("Distancia en slots en el eje X:", distanceXSlots);
        console.log("Distancia en slots en el eje Y:", distanceYSlots);

        return distanceXSlots + distanceYSlots;
    }

    // funcion para realizar el movimiento
    moveMinion(minionSelected, slotSelected){
        
        minionSelected.xPos = slotSelected.xPos;
        minionSelected.yPos = slotSelected.yPos;
        minionSelected.state = CardId.NOT_SELECTED;
    }
}