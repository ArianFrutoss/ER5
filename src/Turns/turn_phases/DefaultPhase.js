import ButtonContainer from "../../Button/ButtonContainer.js";
import { PhaseStates } from "../../constants.js";
import Phase from "./Phase.js";

export default class DefaultPhase extends Phase {

    constructor(buttonContainer){  
        super();
        this.state              = PhaseStates.DEFAULT;
        this.buttonContainer    = buttonContainer;
    }

    update(){

        let state = this.state;


        let returnState = this.buttonContainer.isAnyButtonSelected();
        
        if(returnState != undefined){

            console.log(returnState);

            return returnState;
        }else {

            return state;
        }
     
    }
}

