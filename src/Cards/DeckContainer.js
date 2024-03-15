import { DecksId, TypeId } from "../constants.js"
import Deck from "./Deck.js"

export default class DeckContainer {
    constructor() {
        this.decks = []
    }

    createDecks(data) {
            const initialDeck = this.createInitDeck(data)
            for (let i = 0; i < Object.keys(DecksId).length - 1; i++) {
    
                const deck = new Deck(i)
                this.decks.push(deck)

            }
            this.assignCardsToDecks(initialDeck.cards)
    }

    
    createInitDeck(data) {
        return Deck.createInitDeck(data)

    }

    assignCardsToDecks(cards) {
        
        

        for (let i = 0; i < cards.length; i++) {
            
            const card = cards[i];

            switch (card.category) {

                case TypeId.HERO:
                    this.decks[DecksId.MAIN_CHARACTER_DECK].cards.push(card)
                    break;

                case TypeId.MINION:
                    if (this.decks[DecksId.PLAYER_1_MINION_DECK].cards.length === this.decks[DecksId.PLAYER_2_MINION_DECK].cards.length) {
                        this.decks[DecksId.PLAYER_1_MINION_DECK].cards.push(card)
                    } else {
                        this.decks[DecksId.PLAYER_2_MINION_DECK].cards.push(card)
                    }
                    break;

                default:
                    this.decks[DecksId.EVENT_DECK].cards.push(card)
                    break;
            }
        }
       
        for (let i = 0; i < this.decks.length; i++) {
            const deck = this.decks[i];

            if (deck.cards.length != 0) {
                this.mixDeck(deck.cards);
                
            }
            
        }
    }

    mixDeck(cards){
        for (let i = cards.length-1; i > 0; i--){

            const random = Math.floor(Math.random() * (i+1));
            [cards[i], cards[random]] = [cards[random], cards[i]]; 
            
        }

    }
}