import { CardId } from "../../constants.js";
import Phase from "./Phase.js";
import { MessageState, MessageType, HelpMessagesPos, PhaseStates, messageDiscardPhase } from "../../constants.js";
import Messages from "../../Messages.js";

export default class DiscardPhase extends Phase{

    constructor(handDeck,  graveyardDeck, mouse){
        super();
        this.handDeck       = handDeck;
        this.graveyardDeck  = graveyardDeck;
        this.mouse          = mouse
    }
    execute(messagesContainer){
        this.handDeck.update(this.mouse, this.handDeck)
        if (this.handDeck.cards.length > 4) {
            
            if (messagesContainer.messages[MessageType.HELP_MESSAGE] === undefined){

                const message = new Messages(HelpMessagesPos.X_POS, HelpMessagesPos.Y_POS, messageDiscardPhase, MessageType.HELP_MESSAGE, MessageState.APPEAR, 0.2, 0.3, null);
                messagesContainer.messages[MessageType.HELP_MESSAGE] = message;
            }

            const isAnyCardSelected = this.handDeck.isAnyCard(this.handDeck, CardId.SELECTED)
            if (isAnyCardSelected[0]) {

                messagesContainer.messages[MessageType.HELP_MESSAGE].timeInOn = 0;
                const position = isAnyCardSelected[1]
                const card = this.handDeck.cards[position]
                this.handDeck.cards.splice(position, 1)
                this.graveyardDeck.cards.push(card)
                card.setDeck(this.graveyardDeck)
                card.state = CardId.NOT_SELECTED
                card.xPos =  -500
                card.yPos =  -500
                return false
            }
        }else {
            return true
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