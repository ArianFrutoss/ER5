import ButtonContainer from "../../Button/ButtonContainer.js";
import { ButtonState, PhaseStates } from "../../constants.js";
import Phase from "./Phase.js";

export default class DefaultPhase extends Phase {

    constructor(buttonContainer, activeMinionDeck, handDeck, eventDeck){  
        super();
        this.state              = PhaseStates.DEFAULT;
        this.buttonContainer    = buttonContainer;
        this.activeMinionDeck   = activeMinionDeck;
        this.handDeck           = handDeck;
        this.eventDeck          = eventDeck;
    }

    update(){

        let returnState     = this.buttonContainer.isAnyButtonSelected();

        if(returnState !== undefined){
           
            console.log(returnState);
            return returnState;
        }else{
            return this.state;
        }
    }
}

