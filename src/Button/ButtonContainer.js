import Button from "./Button.js";
import { ButtonState, PhaseStates } from "../constants.js";

export default class ButtonContainer{
    constructor(container){
        this.container = container;
    }

    static create(ctx){
        // Button(context, x, y, width, height, "texto", estado button, estado fase que devuelve)
        const btnMove           = new Button(ctx, 330, 200, ["move", "mugitu"], ButtonState.NOT_SELECTED, PhaseStates.MOVEMENT, "#582900");
        const btnPrepareEvent   = new Button(ctx, 330, 350, ["prepare event", "prestatu"], ButtonState.NOT_SELECTED, PhaseStates.PREPARE_EVENT, "#582900");
        const btnUseEvent       = new Button(ctx, 330, 500, ["use event", "erabili"], ButtonState.NOT_SELECTED, PhaseStates.USE_EVENT_CARD, "#582900");
        const btnAttack         = new Button(ctx, 330, 650, ["attack", " eraso"], ButtonState.NOT_SELECTED, PhaseStates.ATTACK, "#582900");
        const btnEndTurn        = new Button(ctx, 1450, 450,["end turn", "txanda amaitu"], ButtonState.NOT_SELECTED, PhaseStates.DISCARD_CARD,"#582900");

        const container = [btnMove, btnPrepareEvent, btnUseEvent, btnAttack, btnEndTurn];

        return new ButtonContainer(container);
    }


    renderButtons(language){
        for(let i = 0; i < this.container.length; i++){
            const btn = this.container[i];

            btn.render(language);

            
        }        
    }

    deselect(){

        for (let i = 0; i < this.container.length; i++){

            const button = this.container[i];
            button.deselect();
        }
    }

    updateButtons(mouse) {
        let selectedCount = 0;
    
        for (let i = 0; i < this.container.length; i++) {
            const button = this.container[i];
            button.update(mouse);
    
            if (button.state === ButtonState.SELECTED) {
                selectedCount++;
            }

            if (selectedCount > 1) {

                button.state = ButtonState.NOT_SELECTED;
            }
        }
    
     
    }
    


    isAnyButtonSelected(){
        for(let i = 0; i < this.container.length; i++){
            const button = this.container[i];

            if(button.state === ButtonState.SELECTED){
                
                return  button.phaseState;
            }

        }

        return PhaseStates.DEFAULT;
    }

    resetStatesButtons(){

        for(let i = 0; i < this.container.length; i++){
            
            const button = this.container[i];

            button.state = ButtonState.NOT_SELECTED;


        }
    }

    
}