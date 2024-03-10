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
}