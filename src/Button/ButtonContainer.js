import Button from "./Button.js";
import { ButtonState, PhaseStates } from "../constants.js";

export default class ButtonContainer{
    constructor(container){
        this.container = container;
    }

    static create(ctx){
        // Button(context, x, y, width, height, "texto", estado button, estado fase que devuelve)
        const btnMove           = new Button(ctx, 330, 200, 150, 100, "move", ButtonState.NOT_SELECTED, PhaseStates.MOVEMENT, "#582900");
        const btnPrepareEvent   = new Button(ctx, 330, 350, 150, 100, "prepare event", ButtonState.NOT_SELECTED, PhaseStates.PREPARE_EVENT, "#582900");
        const btnUseEvent       = new Button(ctx, 330, 500, 150, 100, "use event", ButtonState.NOT_SELECTED, PhaseStates.USE_EVENT_CARD, "#582900");
        const btnAttack         = new Button(ctx, 330, 650, 150, 100, "attack", ButtonState.NOT_SELECTED, PhaseStates.ATTACK, "#582900");
        const btnEndTurn        = new Button(ctx, 1500, 450, 100, 100, "end turn", ButtonState.NOT_SELECTED, PhaseStates.DISCARD_CARD,"#582900");

        const container = [btnMove, btnPrepareEvent, btnUseEvent, btnAttack, btnEndTurn];

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
                
                return  button.phaseState;
            }
        }
    }

    resetStatesButtons(){

        for(let i = 0; i < this.container.length; i++){
            
            const button = this.container[i];

            button.state = ButtonState.NOT_SELECTED;
        }
    }
}