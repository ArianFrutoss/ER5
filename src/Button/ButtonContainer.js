import Button from "./Button.js";
import { AttackState, ButtonState, PhaseStates, renderState } from "../constants.js";

export default class ButtonContainer{
    constructor(container){
        this.container = container;
        this.state     = renderState.GAME;
    }

    static create(ctx, assets){
        // Button(context, x, y, width, height, "texto", estado button, estado fase que devuelve)
        const btnMove           = new Button(ctx, 340, 260, 119, 75, ["MOVE", "MUGITU"], ButtonState.NOT_SELECTED, PhaseStates.MOVEMENT, renderState.GAME, assets);
        const btnPrepareEvent   = new Button(ctx, 340, 410, 119, 75, ["PREPARE", "PRESTATU"], ButtonState.NOT_SELECTED, PhaseStates.PREPARE_EVENT, renderState.GAME, assets);
        const btnUseEvent       = new Button(ctx, 340, 560, 119, 75, ["USE", "ERABILI"], ButtonState.NOT_SELECTED, PhaseStates.USE_EVENT_CARD, renderState.GAME, assets);
        const btnAttack         = new Button(ctx, 340, 710, 119, 75, ["ATTACK", "ERASO"], ButtonState.NOT_SELECTED, PhaseStates.ATTACK, renderState.GAME, assets);
        const btnEndTurn        = new Button(ctx, 1493, 500, 117, 55, ["END\nTURN", "TXANDA\nAMAITU"], ButtonState.NOT_SELECTED, PhaseStates.DISCARD_CARD, renderState.GAME, assets);
        const btnParry          = new Button(ctx, 340, 360, 119, 75, ["PARRY", "BLOKEATU"], ButtonState.NOT_SELECTED, AttackState.PARRY, renderState.PARRY, assets);
        const btnNoParry        = new Button(ctx, 340, 660, 119, 75, ["NO\nPARRY", "EZ\nBLOKEATU"], ButtonState.NOT_SELECTED, AttackState.ATTACK, renderState.PARRY, assets);



        const container = [btnMove, btnPrepareEvent, btnUseEvent, btnAttack, btnEndTurn, btnParry, btnNoParry];

        return new ButtonContainer(container);
    }


    renderButtons(language){
        

        const state = this.state;

        switch(state){
            case renderState.GAME:
                for(let i = 0; i < 5; i++){
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
        let selectedCount = 0;
        const state = this.state;
        
        switch(state){
            case renderState.GAME:
                for(let i = 0; i < 5; i++){
                    const button = this.container[i];
                    button.update(mouse);
            
                    if (button.state === ButtonState.SELECTED) {
                        selectedCount++;
                    }
        
                    if (selectedCount > 1) {
        
                        button.state = ButtonState.NOT_SELECTED;
                    }
                }
                break;

            case renderState.PARRY:
                for(let i = 5; i < 7; i++){
                    const button = this.container[i];
                    button.update(mouse);
            
                    if (button.state === ButtonState.SELECTED) {
                        selectedCount++;
                    }
        
                    if (selectedCount > 1) {
        
                        button.state = ButtonState.NOT_SELECTED;
                    }
                }
                break;
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