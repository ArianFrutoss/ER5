import { PhaseStates, messageDefaultPhase } from "../../constants.js";
import Phase from "./Phase.js";

export default class messagesContainerDefaultPhase extends Phase {

    constructor(buttonContainer, activeEventDeck, enemyEventDeck, graveyardDeck){  
        super();
        this.state              = PhaseStates.DEFAULT;
        this.buttonContainer    = buttonContainer;
        this.activeEventDeck    = activeEventDeck;
        this.enemyEventDeck     = enemyEventDeck;
        this.graveyardDeck      = graveyardDeck;
    }

    execute(messagesContainer){
        
        messagesContainer.activeMessage(messageDefaultPhase);

        let returnState = this.buttonContainer.isAnyButtonSelected();
        
        if(returnState !== undefined){
            
            // console.log(returnState);
            return returnState;

        }else{
            return this.state;

        }
    }

    isPhaseCancelled(buttonContainer){
        
        const buttonState = buttonContainer.isAnyButtonSelected();

        if(buttonState != PhaseStates.DEFAULT){

            return buttonState;
        }else {

            return false;
        }

    }
}


