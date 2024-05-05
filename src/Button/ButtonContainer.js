import Button from "./Button.js";
import { AttackState, ButtonState, ButttonsId, PhaseStates, renderState } from "../constants.js";

export default class ButtonContainer{
    constructor(container){
        this.container = container;
        this.state     = renderState.GAME;
    }

    static create(ctx, assets){
        // Button(context, x, y, width, height, "texto", estado button, estado fase que devuelve)
        const btnMove           = new Button(ButttonsId.BTN_MOVE, ctx, 340, 260, 119, 75, ["MOVE", "MUGITU"], ButtonState.NOT_SELECTED, PhaseStates.MOVEMENT, renderState.GAME, assets);
        const btnPrepareEvent   = new Button(ButttonsId.BTN_PREPARE_EVENT, ctx, 340, 410, 119, 75, ["PREPARE", "PRESTATU"], ButtonState.NOT_SELECTED, PhaseStates.PREPARE_EVENT, renderState.GAME, assets);
        const btnUseEvent       = new Button(ButttonsId.BTN_USE_EVENT, ctx, 340, 560, 119, 75, ["USE", "ERABILI"], ButtonState.NOT_SELECTED, PhaseStates.USE_EVENT_CARD, renderState.GAME, assets);
        const btnAttack         = new Button(ButttonsId.BTN_ATTACK, ctx, 340, 710, 119, 75, ["ATTACK", "ERASO"], ButtonState.NOT_SELECTED, PhaseStates.ATTACK, renderState.GAME, assets);
        const btnEndTurn        = new Button(ButttonsId.BTN_END_TURN, ctx, 1493, 500, 117, 55, ["END\nTURN", "TXANDA\nAMAITU"], ButtonState.NOT_SELECTED, PhaseStates.DISCARD_CARD, renderState.GAME, assets);
        const btnChangeLanguage = new Button(ButttonsId.BTN_CHANGE_LANGUAGE, ctx, 1593, 1023, 50, 50, ["", ""], ButtonState.NOT_SELECTED, undefined, undefined, assets);
        const btnParry          = new Button(ButttonsId.BTN_PARRY, ctx, 340, 360, 119, 75, ["PARRY", "BLOKEATU"], ButtonState.NOT_SELECTED, AttackState.PARRY, renderState.PARRY, assets);
        const btnNoParry        = new Button(ButttonsId.BTN_NO_PARRY, ctx, 340, 660, 119, 75, ["NO\nPARRY", "EZ\nBLOKEATU"], ButtonState.NOT_SELECTED, AttackState.ATTACK, renderState.PARRY, assets);

        const container = [btnMove, btnPrepareEvent, btnUseEvent, btnAttack, btnEndTurn, btnChangeLanguage, btnParry, btnNoParry];

        return new ButtonContainer(container);
    }


    renderButtons(language){
        

        const state = this.state;

        switch(state){
            case renderState.GAME:
                for(let i = 0; i < 6; i++){
                    const btn = this.container[i];
        
                    btn.render(language);
                }
                break;

            case renderState.PARRY:
                for(let i = 5; i < 7; i++){
                    const btn = this.container[i];
        
                    btn.render(language);
                }
                break;
        }      
    }

    deselect(){

        for (let i = 0; i < this.container.length; i++){

            const button = this.container[i];
            button.deselect();
        }
    }

    updateButtons(mouse) {
        
        for (let i = 0; i < this.container.length; i++){

            const button = this.container[i];
            button.update(mouse, this);
        }
    }
    


    isAnyButtonSelected(){
        for(let i = 0; i < this.container.length; i++){
            const button = this.container[i];

            if(button.state === ButtonState.SELECTED && button.phaseState != undefined){
                
                return  button.phaseState;
            }

        }

        return PhaseStates.DEFAULT;
    }

    resetStatesButtons(){
        // console.log("entro aqui");

        for(let i = 0; i < this.container.length; i++){
            
            const button = this.container[i];

            button.state = ButtonState.NOT_SELECTED;


        }
    }

    setState(state){
        this.state = state;
    }
}