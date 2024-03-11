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
        
        cards = this.mixDeck(cards);

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
    }

    mixDeck(cards){

        const cardMix = [];
        let random;
    
        for (let i = cards.length; i > 0; i--){

            random = Math.floor(Math.random() * cards.length);
            cardMix.push(cards[random]);
            cards.splice(random, 1);
        }
        
        return cardMix;
    }
}