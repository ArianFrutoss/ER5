import { DecksId, TypeId } from "../constants.js"
import Deck from "./Deck.js"

export default class DeckContainer {
    constructor() {
        this.decks = []
    }

    createDecks(data, images) {
            const initialDeck = this.createInitDeck(data, images)
            for (let i = 0; i < Object.keys(DecksId).length - 1; i++) {
    
                const deck = new Deck(i)
                this.decks.push(deck)

            }
            this.assignCardsToDecks(initialDeck.cards)
    }
 
    createInitDeck(data, images) {
        return Deck.createInitDeck(data, images)

    }

    assignCardsToDecks(cards) {
        
        

        for (let i = 0; i < cards.length; i++) {
            
            const card = cards[i];

            switch (card.category) {

                case TypeId.HERO:
                    this.decks[DecksId.MAIN_CHARACTER_DECK].cards.push(card)
                    card.setDeck(this.decks[DecksId.MAIN_CHARACTER_DECK])
                    
                    break;

                case TypeId.MINION:
                    if (this.decks[DecksId.PLAYER_1_MINION_DECK].cards.length === this.decks[DecksId.PLAYER_2_MINION_DECK].cards.length) {
                        this.decks[DecksId.PLAYER_1_MINION_DECK].cards.push(card)
                        card.setDeck(this.decks[DecksId.PLAYER_1_MINION_DECK])
                    } else {
                        this.decks[DecksId.PLAYER_2_MINION_DECK].cards.push(card)
                        card.setDeck(this.decks[DecksId.PLAYER_2_MINION_DECK])
                    }
                    break;

                default:
                    this.decks[DecksId.EVENT_DECK].cards.push(card)
                    card.setDeck(this.decks[DecksId.EVENT_DECK])
                    break;
            }
        }
        for (let i = 0; i < 2; i++) {
            const cards = this.decks[DecksId.PLAYER_1_MINION_DECK+i].cards
            for (let j = 0; j < cards.length; j++) {
                const card = cards[j];
                if (card.id === 3) {
                    this.decks[DecksId.PLAYER_1_ACTIVE_MINION_DECK+i].cards.push(card)
                    card.setDeck(this.decks[DecksId.PLAYER_1_ACTIVE_MINION_DECK+i])
                }
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
    updateScale(mouse, decks = this.decks){
        for (let i = 2; i < decks.length; i++) {
            const deck = decks[i];
            deck.updateScale(mouse, decks)
            
        }
    }
    updateDecks(mouse, decks = this.decks){
        for (let i = 2; i < decks.length; i++) {
            const deck = decks[i];
            deck.update(mouse, decks)
            
        }
    }
}