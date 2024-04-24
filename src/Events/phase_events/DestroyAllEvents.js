import { CardActions, CardId, CardImageId } from "../../constants.js";
import Event from "../Event.js";

export class DestroyAllEvents extends Event{

    constructor(decks){
        super()
        this.decks      = decks;
        
    }
    execute(mouse){
        for (let i = 0; i < this.decks.length; i++) {
            const deck = this.decks[i];
            for (let j = 0; j < deck.cards.length; j++) {
                const card = deck.cards[j];
                if (card) {
                    card.action = CardActions.WORN_OUT
                    card.update(mouse, deck)
                    
                }
            }
        }
    }
}