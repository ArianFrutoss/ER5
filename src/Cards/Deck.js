import { DecksId } from "../constants.js";
import CardFactory from "./CardFactory.js";

export default class Deck {
    constructor(deckId, cards = []){

        this.deckId = deckId;
        this.cards  = cards
    }
    static createInitDeck(data){
        const cardFact = new CardFactory(data)
        cardFact.createCards()

        return new Deck (DecksId.INITIAL_DECK, cardFact.cards)
    }
    update(mouse, decks){
        for (let i = 0; i < this.cards.length; i++) {
            const card = this.cards[i];
            card.update(mouse, decks)
            
        }
    }
    
    isAnyCard(decks,state){
        
        let result = []
        const quantity = decks.length === undefined ? 1 : decks.length
        for (let i = 0; i < quantity; i++) {
            
            const deck = quantity === 1 ? decks : decks[i];
            for (let j = 0; j < deck.cards.length; j++) {
                const card = deck.cards[j];
                result[0] = card.state === state ? true : false
                result[1] = j
                if (result[0] === true) {
                    return result
                    
                }
            }            
        }
        return result
    }

    shuffle(){
        for (let i = this.cards.length-1; i > 0; i--){

            const random = Math.floor(Math.random() * (i+1));
            [this.cards[i], this.cards[random]] = [this.cards[random], this.cards[i]]; 
            
        }

    }
    
}