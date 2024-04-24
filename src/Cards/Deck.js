import { CardId, DecksId, TypeId } from "../constants.js";
import CardFactory from "./CardFactory.js";

export default class Deck {
    constructor(deckId, cards = []){

        this.deckId = deckId;
        this.cards  = cards
    }
    static createInitDeck(data, images, language){
        const cardFact = new CardFactory(data, images)
        cardFact.createCards(language)

        return new Deck (DecksId.INITIAL_DECK, cardFact.cards)
    }
    updateScale(mouse, decks){
        for (let i = 0; i < this.cards.length; i++) {
            const card = this.cards[i];
            card.updateScale(mouse, decks)
            
        } 
    }
    update(mouse, decks = this){
        if (this.deckId === DecksId.PLAYER_1_MINION_DECK) {
            console.log(this.cards);
        }
        for (let i = 0; i < this.cards.length; i++) {
            const card = this.cards[i];
            card.update(mouse, decks)
            
        }
    }

    
    isAnyCard(decks, state){
        
        let result = []
        const quantity = decks.length === undefined ? 1 : decks.length
        for (let i = 0; i < quantity; i++) {
            const deck = quantity === 1 ? decks : decks[i];
            if (deck.cards != undefined){
                for (let j = 0; j < deck.cards.length; j++) {
                    const card = deck.cards[j]
                    result[0] = card.state === state ? true : false
                    if (result[0] === true) {
                        result[1] = j
                        result[2] = card
                        return result
                    }
                }        
            }
            else{
                const card = deck
                result[0] = card.state === state ? true : false
                if (result[0] === true) {
                    result[1] = 0
                    result[2] = card
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

    aplyWeaponsAndArmorsStatsTheMinion(){

        for (let i = 0; i < this.cards.length; i++){

            const minion = this.cards[i];

            if (minion.weapon != undefined){

                minion.aplyWeapon();
            }

            if (minion.armor != undefined){

                minion.aplyArmor();
            }
        }
    }

    restoreDeckMinionsStats(){
        
        for (let i = 0; i < this.cards.length; i++){

            const minion = this.cards[i];

            minion.restoreMinionsStats();
        }
    }

    removeEquipIfdurability0(){

        for (let i = 0; i < this.cards.length; i++){

            const card = this.cards[i];
            
            if (card.weapon != undefined && card.weapon.durability <= 0){

                card.setWeapon(undefined);
            }

            if (card.armor != undefined && card.armor.durability <= 0){

                card.setArmor(undefined);
            }
        }
    }

    removeIfWornOut(graveyardDeck){

        for (let i = 0; i < this.cards.length; i++){

            const card = this.cards[i];
            
            card.removeIfWornOut(this, graveyardDeck);
        }  
    }

    renderCards(ctx, language, team){

        for (let i = 0; i < this.cards.length; i++){

            const card = this.cards[i];

            if (card.state != CardId.SCALED){

                card.render(ctx, language, team);
            }   
        }
    }

    deselect(){

        for (let i = 0; i < this.cards.length; i++){

            const card = this.cards[i];
            card.deselect();
        }
    }
}