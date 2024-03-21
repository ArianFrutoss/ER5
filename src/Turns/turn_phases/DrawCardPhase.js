import { MAXIMUN_CARDS_IN_HAND } from "../../constants.js";
import Phase from "./Phase.js";

export default class DrawCardPhase extends Phase{

    constructor(handDeck, handGrid, eventDeck, graveyardDeck){
        super();
        this.handDeck       = handDeck;
        this.handGrid       = handGrid;
        this.eventDeck      = eventDeck;
        this.graveyardDeck  = graveyardDeck
    }
    execute(quantity = 1){
        for (let i = 0; i < quantity; i++) {
            if (this.eventDeck.cards.length > 0) {
                if (this.handDeck.cards.length < MAXIMUN_CARDS_IN_HAND) {
                    this.handDeck.cards.push(this.eventDeck.cards[eventDeck.cards.length - 1]);
                    this.eventDeck.cards.pop();            
                }            
                
            } else {
                this.restoreEventDeck()
                i--
            }
        }
    }
    
    restoreEventDeck(){
        for (let i = this.graveyardDeck.cards.length-1; i > -1; i--) {
            const card = this.graveyardDeck.cards[i];
            this.eventDeck.cards.push(card)
            this.graveyardDeck.cards.pop()
        }
        this.eventDeck.shuffle()
    }
}