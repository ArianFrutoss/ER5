import { MainCharacterId } from "../../constants.js";
import Event from "../Event.js";
import EventFactory from "../EventFactory.js";

export default class HeroEvents extends Event{

    constructor(activeMinionDeck, enemyActiveMinionDeck, hero, card){
        
        super();
        this.activeMinionDeck       = activeMinionDeck;
        this.enemyActiveMinionDeck  = enemyActiveMinionDeck;
        this.card               = card;
        this.hero               = hero;
    }

    execute(){
        console.log(this.enemyActiveMinionDeck.cards);
        this.card.durability -= 0.5;

        if (this.card.durability === 0) {
            return true
        } else{
            switch(this.hero.id){
                case MainCharacterId.LUCRETIA:
                    for (let i = 0; i < this.enemyActiveMinionDeck.cards.length; i++) {
                        console.log("aplica el evento de lucretia");
                        const card = this.enemyActiveMinionDeck.cards[i];
                        EventFactory.createHeroEventAndExecute(this.hero, card);
                    }
                    break;
                    
                case MainCharacterId.X_G_SCHOLAR:
                    for(let i = 0; i < this.activeMinionDeck.cards.length; i++){
                        console.log("aplica el evento the XG");
                        const card = this.activeMinionDeck.cards[i];
                        EventFactory.createHeroEventAndExecute(this.hero, card);
                    }
                    break;
            }

            return false
        }
    }

}