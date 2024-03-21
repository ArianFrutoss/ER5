import { RarityId } from "../../constants.js";
import Card from "../Card.js";

export default class Minion extends Card{

    constructor(id, name, description, image, rarity, category, type, xPos, yPos, attack, defense, health, speed, weapon=undefined, armor=undefined){

        super(id, name, description, image, rarity, category, type, xPos, yPos);

        // Card attributes   
        this.attack     = attack;
        this.defense    = defense;
        this.health     = health;
        this.speed      = speed; 		   	
        this.weapon     = undefined;
        this.armor      = undefined;
    }
    update(mouse, decks){
        super.update(mouse,decks);
        this.minionLogic()
    }
    minionLogic(){
        
    }
}

