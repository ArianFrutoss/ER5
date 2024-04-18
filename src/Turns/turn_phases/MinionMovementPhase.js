import Phase from "./Phase.js";
import { CardId, SlotsState, PhaseStates, messageMovimentPhase1, messageMovimentPhase2 } from "../../constants.js";

export default class MinionMovementPhase extends Phase {

    constructor(activeMinionDeck, enemyActiveMinionDeck, boardGrid, mouse) {
        super();
        this.activeMinionDeck = activeMinionDeck;         // Deck de minions activos
        this.enemyActiveMinionDeck = enemyActiveMinionDeck  // Deck de minions enemigos activos
        this.boardGrid = boardGrid;             // Grid del tablero
        this.mouse = mouse;                    // Objeto Mouse
    }

    execute(messagesContainer){

        this.boardGrid.cancelAviableSlots();
        this.activeMinionDeck.update(this.mouse, this.activeMinionDeck)
        this.boardGrid.update(this.mouse, [this.activeMinionDeck, this.enemyActiveMinionDeck]);

        const isAnyCardSelected = this.activeMinionDeck.isAnyCard(this.activeMinionDeck, CardId.SELECTED);
        const isAnySlotHovered  = this.boardGrid.isAnySlot(SlotsState.HOVER);
        const isAnySlotSelected  = this.boardGrid.isAnySlot(SlotsState.SELECTED);

        let distance;
        let minionSelected;
        let slotHovered;
        let slotSelected;

        if (isAnyCardSelected[0] === false){

            messagesContainer.activeMessage(messageMovimentPhase1);
        }

        if (isAnyCardSelected[0]){

            messagesContainer.activeMessage(messageMovimentPhase2);
        }

        if (isAnyCardSelected[0] && isAnySlotHovered[0]){

            const minionPosition            = isAnyCardSelected[1];
            const slotPositionHoveredI      = isAnySlotHovered[1];
            const slotPositionHoveredJ      = isAnySlotHovered[2];

            minionSelected    = this.activeMinionDeck.cards[minionPosition];
            slotHovered       = this.boardGrid.slots[slotPositionHoveredI][slotPositionHoveredJ];

            this.boardGrid.aviableSlots(minionSelected);

            distance = slotHovered.calculateDistance(minionSelected);
        }

        if (isAnyCardSelected[0] && isAnySlotSelected[0]){

            const minionPosition            = isAnyCardSelected[1];
            const slotPositionSelectedI     = isAnySlotSelected[1];
            const slotPositionSelectedJ     = isAnySlotSelected[2];

            minionSelected    = this.activeMinionDeck.cards[minionPosition];
            slotSelected      = this.boardGrid.slots[slotPositionSelectedI][slotPositionSelectedJ];

            this.boardGrid.aviableSlots(minionSelected);

            distance = slotSelected.calculateDistance(minionSelected);
        }

        if (minionSelected != undefined && minionSelected.speed >= distance){

            if (isAnySlotSelected[0]){

                this.moveMinion(minionSelected, slotSelected);
                this.boardGrid.clearSlots();
                return true;
            }
        }


    }

    // funcion para realizar el movimiento
    moveMinion(minionSelected, slotSelected){

        minionSelected.xPos = slotSelected.xPos;
        minionSelected.yPos = slotSelected.yPos;
        minionSelected.state = CardId.NOT_SELECTED;
    }

    isPhaseCancelled(buttonContainer){

        const buttonState = buttonContainer.isAnyButtonSelected();

        if(buttonState === PhaseStates.DEFAULT){

            return true;
        }else {

            return false;
        }

    }
}