import ButtonContainer from "../../Button/ButtonContainer.js";
import { PhaseStates, MessageState, MessageType, HelpMessagesPos, messageDefaultPhase } from "../../constants.js";
import Phase from "./Phase.js";
import Messages from "../../Messages.js";

export default class DefaultPhase extends Phase {

    constructor(buttonContainer, activeEventDeck, enemyEventDeck, graveyardDeck){  
        super();
        this.state              = PhaseStates.DEFAULT;
        this.buttonContainer    = buttonContainer;
        this.activeEventDeck    = activeEventDeck;
        this.enemyEventDeck     = enemyEventDeck;
        this.graveyardDeck      = graveyardDeck;
    }

    execute(messagesContainer){
        
        if (messagesContainer.messages[MessageType.HELP_MESSAGE] === undefined){
            const message = new Messages(HelpMessagesPos.X_POS, HelpMessagesPos.Y_POS, messageDefaultPhase, MessageType.HELP_MESSAGE, MessageState.APPEAR, 0.2, 0.3, null);
            messagesContainer.messages[MessageType.HELP_MESSAGE] = message;
        }
        
        let returnState       = this.buttonContainer.isAnyButtonSelected();
        
        if(returnState !== undefined){
            
            // console.log(returnState);
            return returnState;

        }else{
            return this.state;

        }
    }

    isPhaseCancelled(buttonContainer, messagesContainer){
        
        const buttonState = buttonContainer.isAnyButtonSelected();

        if(buttonState != PhaseStates.DEFAULT){

            messagesContainer.messages[MessageType.HELP_MESSAGE].timeInOn = 0;
            return buttonState;
        }else {

            return false;
        }

    }
}


