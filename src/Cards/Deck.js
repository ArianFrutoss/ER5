import { CardId, DecksId, TypeId } from "../constants.js";
import CardFactory from "./CardFactory.js";

export default class Deck {
    constructor(deckId, cards = []){

        this.deckId = deckId;
        this.cards  = cards
    }
    static createInitDeck(data, images){
        const cardFact = new CardFactory(data, images)
        cardFact.createCards()

        return new Deck (DecksId.INITIAL_DECK, cardFact.cards)
    }
    updateScale(mouse, decks){
        for (let i = 0; i < this.cards.length; i++) {
            const card = this.cards[i];
            card.updateScale(mouse, decks)
            
        } 
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

    isAnyCardSelected(){
        for(let i = 0; i < this.cards.length; i++){

            const card = this.cards[i];

            if(card.state === CardId.SELECTED){

                return true;
            }
        }
        return false;
    }

    spawnNewMinions(activeMinionDeck){

        if (activeMinionDeck.cards.length < 3 && this.cards.length > 0){
            
            activeMinionDeck.cards.push(this.cards[this.cards.length - 1]);
            
            const card = activeMinionDeck.cards[activeMinionDeck.cards.length - 1];

            card.setDeck(activeMinionDeck);
            this.cards.pop();
            
            return card;
        }
    }

    restoreDeckMinionsHp(){
        
        for (let i = 0; i < this.cards.length; i++){

            const minion = this.cards[i];

            minion.restoreMinionsHp();
        }
    }

    renderCards(ctx, language){
        for (let i = 0; i < this.cards.length; i++) {
            const card = this.cards[i];
                card.render(ctx, language)

        }
    }
}