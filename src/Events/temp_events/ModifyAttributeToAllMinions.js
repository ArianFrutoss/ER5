import Event from "../Event.js";
import EventFactory from "../EventFactory.js";

export class ModifyAttributeToAllMinions extends Event{

    constructor(decks, card){
        super()
        this.decks      = decks
        this.card       = card
    }

    execute(){
        this.card.durability -= 0.5
        if (this.card.durability === 0) {
            return true
        } else{
            for (let i = 0; i < this.decks.length; i++) {
                const deck = this.decks[i];
                for (let j = 0; j < deck.cards.length; j++) {
                    console.log("entro");
                    const card = deck.cards[j];
                    console.log(this.card, card);
                    EventFactory.createModifyAttributeEvent(this.card, card)
                }
            }
            return false
        }
    }
}