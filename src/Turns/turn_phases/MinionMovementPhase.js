import Phase from "./Phase.js";
import { CardId, SlotsState, MessageState, MessageType, HelpMessagesPos, PhaseStates } from "../../constants.js";
import Messages from "../../Messages.js";

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

        const messages = messagesContainer.messages;

        if (messages[1] === undefined && isAnyCardSelected[0] === false){

            const message = new Messages(HelpMessagesPos.X_POS, HelpMessagesPos.Y_POS, "Select any minion to move", MessageType.HELP_MESSAGE, MessageState.APPEAR, 0.2, 0.3, null);
            messages[1] = message;
            messages[1].drawMessage = true;
        }
        
        if (messages[1] === undefined && isAnyCardSelected[0]){

            const message = new Messages(HelpMessagesPos.X_POS, HelpMessagesPos.Y_POS, "Select any slot to move the minion", MessageType.HELP_MESSAGE, MessageState.APPEAR, 0.2, 0.3, null);
            messages[1] = message;
            messages[1].drawMessage = false;
        }
        
        if (messages[1].drawMessage && messages[1] != undefined && isAnyCardSelected[0]){
            
            messages[1].timeInOn = 0;
        }

        if (messages[1].drawMessage === false && messages[1] != undefined && isAnyCardSelected[0] === false){
            
            messages[1].timeInOn = 0;
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
                
                messages[1].timeInOn = 0;
                
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