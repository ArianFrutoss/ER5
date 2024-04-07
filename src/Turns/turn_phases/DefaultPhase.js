import ButtonContainer from "../../Button/ButtonContainer.js";
import { ButtonState, CardActions, PhaseStates, MessageState, MessageType } from "../../constants.js";
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

        const message = new Messages(1000, 300, "Select any button to enter in the phase", MessageType.HELP_MESSAGE, MessageState.APPEAR, 0.2, null, 0.2, 0.0);
        messagesContainer.messages.push(message);

        let returnState     = this.buttonContainer.isAnyButtonSelected();

        if(returnState !== undefined){
            message.timeInOn = 0;
            console.log(returnState);
            return returnState;
        }else{
            return this.state;
        }
    }
}

