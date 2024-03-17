import { AttackEvent } from "../Events/phase_events/AttackEvent.js";
import { CardId } from "../constants.js";
export default class Card{

    constructor(id, name, description, image, rarity, category, type = "Melee", xPos, yPos, deck){

        this.id             = id;
        this.name           = name;
        this.description    = description;
        this.image          = image;
        this.rarity         = rarity;
        this.category       = category;
        this.type           = type; 
        this.xPos           = xPos;
        this.yPos           = yPos;
        this.size           = CardId.BIG_SIZE;
        this.state          = CardId.NOT_SELECTED;
        this.deck           = deck
        // this.objective      = objective;
  	
    }
    

    update(boardGrid, enemyMinionDeck){

        const state = this.state;

        switch(state){

            case CardId.NOT_SELECTED:
                
                break;
            
            case CardId.ATTACK:
                
                break;
        }
    }

    Attack(boardGrid, enemyMinionDeck){
        const attackEvent = new AttackEvent("minion1", enemyMinionDeck);
        
        attackEvent.execute();
    }
}
