import ButtonContainer from "../../Button/ButtonContainer.js";
import { ButtonState, CardActions, PhaseStates } from "../../constants.js";
import Phase from "./Phase.js";

export default class DefaultPhase extends Phase {

    constructor(buttonContainer, activeEventDeck, enemyEventDeck, graveyardDeck){  
        super();
        this.state              = PhaseStates.DEFAULT;
        this.buttonContainer    = buttonContainer;
        this.activeEventDeck    = activeEventDeck;
        this.enemyEventDeck     = enemyEventDeck;
        this.graveyardDeck      = graveyardDeck;
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

