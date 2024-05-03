import { CardId, DecksId } from "../../constants.js";
import Event from "../Event.js";

export default class DeceptionEvent extends Event{
    constructor(card, handDeck, enemyHandeck) {
        super();
        this.card           = card;
        this.handDeck       = handDeck;
        this.enemyHandeck   = enemyHandeck;
        this.active         = true;
    }

    execute(){
        this.card.durability -= 0.5;

        if(this.card.durability === 0){
            return true;
        }
        
        if(this.active){
            const finalHandeck      = this.enemyHandeck.cards;
            const finalEnemyHandeck = this.handDeck.cards;
            

            this.enemyHandeck.cards       = finalEnemyHandeck;
            this.handDeck.cards           = finalHandeck;

            this.active = false;
        }
    }


}