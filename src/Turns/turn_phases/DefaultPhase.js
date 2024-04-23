import { CardActions, PhaseStates, messageDefaultPhase } from "../../constants.js";
import Phase from "./Phase.js";

export default class messagesContainerDefaultPhase extends Phase {

    constructor(buttonContainer, activeEventDeck, enemyEventDeck, graveyardDeck, mouse, preparingEventDeck, turn){  
        super();
        this.state              = PhaseStates.DEFAULT;
        this.buttonContainer    = buttonContainer;
        this.activeEventDeck    = activeEventDeck;
        this.enemyEventDeck     = enemyEventDeck;
        this.graveyardDeck      = graveyardDeck;
        this.mouse              = mouse;
        this.preparingEventDeck = preparingEventDeck;
        this.turn               = turn;
    }

    execute(messagesContainer){
        
        messagesContainer.activeMessage(messageDefaultPhase);
        // this.updateEventCards();
        this.updateEventCards(this.mouse);
        this.removeCardFromEventDeck();

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

    removeCardFromEventDeck(){
        for(let i = 0; i < this.activeEventDeck.cards.length; i++){
            const card = this.activeEventDeck.cards[i];

            if(card.action === CardActions.WORN_OUT){
                card.removeIfWornOut(this.activeEventDeck, this.graveyardDeck);
            }
        }
    }

    updateEventCards(mouse){
        for(let i = 0; i < this.preparingEventDeck.cards.length; i++){

            const card = this.preparingEventDeck.cards[i];

            card.update(mouse, this.preparingEventDeck);
        }
    }
}


