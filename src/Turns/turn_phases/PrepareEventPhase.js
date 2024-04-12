import { CardActions, CardId, SlotsState, MessageState, MessageType, HelpMessagesPos, PhaseStates} from "../../constants.js";
import Phase from "./Phase.js";
import Messages from "../../Messages.js";

export default class PrepareEventPhase extends Phase{

    constructor(handDeck, eventDeck, handGrid,eventGrid, mouse){
        super();
        this.handDeck   = handDeck;
        this.handGrid   = handGrid;
        this.activeEventDeck  = eventDeck;
        this.activeEventGrid  = eventGrid;

        
    }
    
    execute(eventContainer, mouse, messagesContainer){
        
        this.activeEventGrid.update(mouse, this.activeEventDeck);
        this.handGrid.update(mouse, this.handDeck);
        const decks = [this.handDeck, this.activeEventDeck]
        for (let i = 0; i < decks.length; i++) {
            const deck = decks[i];
            deck.update(mouse, decks)
        }

        const isAnyCardSelected = this.handDeck.isAnyCard(this.handDeck, CardId.SELECTED)
        const isAnySlotSelected = this.activeEventGrid.isAnySlot(SlotsState.SELECTED);
        
        const messages = messagesContainer.messages;

        if (messages[MessageType.HELP_MESSAGE] === undefined && isAnyCardSelected[0] === false){

            const message = new Messages(HelpMessagesPos.X_POS, HelpMessagesPos.Y_POS, "Select any event card to prepare", MessageType.HELP_MESSAGE, MessageState.APPEAR, 0.2, 0.3, null);
            messages[MessageType.HELP_MESSAGE] = message;
            messages[MessageType.HELP_MESSAGE].drawMessage = true;
        }
        
        if (messages[MessageType.HELP_MESSAGE] === undefined && isAnyCardSelected[0]){

            const message = new Messages(HelpMessagesPos.X_POS, HelpMessagesPos.Y_POS, "Select any slot of the event grid to start to preparing the event card", MessageType.HELP_MESSAGE, MessageState.APPEAR, 0.2, 0.3, null);
            messages[MessageType.HELP_MESSAGE] = message;
            messages[MessageType.HELP_MESSAGE].drawMessage = false;
        }
        
        if (messages[MessageType.HELP_MESSAGE].drawMessage && messages[MessageType.HELP_MESSAGE] != undefined && isAnyCardSelected[0]){
            
            messages[MessageType.HELP_MESSAGE].timeInOn = 0;
        }

        if (messages[MessageType.HELP_MESSAGE].drawMessage === false && messages[MessageType.HELP_MESSAGE] != undefined && isAnyCardSelected[0] === false){
            
            messages[MessageType.HELP_MESSAGE].timeInOn = 0;
        }

        if (isAnyCardSelected[0] && isAnySlotSelected[0]){

            const deckLength = this.activeEventDeck.cards.length 
            const position = isAnyCardSelected[1]

            if (deckLength < 5) {

                messages[MessageType.HELP_MESSAGE].timeInOn = 0;
                const card = this.handDeck.cards[position]
                this.handDeck.cards.splice(position, 1)
                this.activeEventDeck.cards.push(card)
                card.setDeck(this.activeEventDeck)
                const gridY = Math.floor(deckLength/3)
                const gridX = Math.floor(deckLength%3)
                const slot = this.activeEventGrid.slots[isAnySlotSelected[1]][isAnySlotSelected[2]];
                card.xPos =  slot.xPos
                card.yPos =  slot.yPos
                card.state = CardId.NOT_SELECTED
                card.size = CardId.SMALL_SIZE
                card.action = CardActions.COOLDOWN
                eventContainer.createEvent(card)
                slot.state = SlotsState.NOT_SELECTED

                return true
            }
            
        }        
    }

    isPhaseCancelled(buttonContainer, messagesContainer){
        
        const buttonState = buttonContainer.isAnyButtonSelected();

        if(buttonState === PhaseStates.DEFAULT){

            messagesContainer.messages[MessageType.HELP_MESSAGE].timeInOn = 0;
            return true;
        }else {

            return false;
        }

    }
}