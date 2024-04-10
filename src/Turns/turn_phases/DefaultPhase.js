import ButtonContainer from "../../Button/ButtonContainer.js";
import { ButtonState, CardActions, PhaseStates, MessageState, MessageType, HelpMessagesPos } from "../../constants.js";
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
        
        if (messagesContainer.messages[1] === undefined){

            const message = new Messages(HelpMessagesPos.X_POS, HelpMessagesPos.Y_POS, "Select any button to enter in the phase", MessageType.HELP_MESSAGE, MessageState.APPEAR, 0.2, 0.3, null);
            messagesContainer.messages[1] = message;
        }
        
        let returnState       = this.buttonContainer.isAnyButtonSelected();

        
        
        if(returnState !== undefined){
     
            messagesContainer.messages[1].timeInOn = 0;
            // console.log(returnState);
            return returnState;

        }else{

            return this.state;

        }
    }


}


