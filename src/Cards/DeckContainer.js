import { DecksId, TypeId } from "../constants.js"
import Deck from "./Deck.js"

export default class DeckContainer {
    constructor() {
        this.decks = []
    }

    createDecks() {
        fetch('../../test.json', { mode: 'no-cors'})
        .then((response) => response.json())
        .then((data) => {
            const initialDeck = this.createInitDeck(data)
            for (let i = 0; i < Object.keys(DecksId).length - 1; i++) {
    
                const deck = new Deck(i)
                this.decks.push(deck)
            }
            this.assignCardsToDecks(initialDeck.cards)
        });


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
    }
}