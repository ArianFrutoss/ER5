import Button from "./Button.js";
import { ButtonState, PhaseStates } from "../constants.js";

export default class ButtonContainer{
    constructor(container){
        this.container = container;
    }

    static create(ctx){
        // Button(context, x, y, width, height, "texto", estado button, estado fase que devuelve)
        const btnMove           = new Button(ctx, 330, 200, 150, 100, "move", ButtonState.NOT_SELECTED, PhaseStates.MOVEMENT);
        const btnPrepareEvent   = new Button(ctx, 330, 350, 150, 100, "prepare event", ButtonState.NOT_SELECTED, PhaseStates.PREPARE_EVENT);
        const btnUseEvent       = new Button(ctx, 330, 500, 150, 100, "use event", ButtonState.NOT_SELECTED, PhaseStates.USE_EVENT_CARD);
        const btnAttack         = new Button(ctx, 330, 650, 150, 100, "attack", ButtonState.NOT_SELECTED, PhaseStates.MOVEMENT);

        const container = [btnMove, btnPrepareEvent, btnUseEvent, btnAttack];

        return new ButtonContainer(container);
    }


    renderButtons(){
        for(let i = 0; i < this.container.length; i++){
            const btn = this.container[i];

            btn.render();
        }        
    }

    updateButtons(mouse){

        for(let i = 0; i < this.container.length; i++){

            const button = this.container[i];

            button.update(mouse);
            
            
        }
    }

    isAnyButtonSelected(){
        for(let i = 0; i < this.container.length; i++){
            const button = this.container[i];

            if(button.state === ButtonState.SELECTED){
                
                let phaseState = button.phaseState;

                return phaseState;
            }
        }
    }

}