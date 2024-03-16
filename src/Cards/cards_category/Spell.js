import Card from "../Card.js";

export default class Spell extends Card{

    constructor(id, name, description, image, rarity, type,  xPos, yPos, objective, durability, cooldown){

        super(id, name, description, image, rarity, type, xPos, yPos, objective);

        // Card attributes   
        this.durability = durability;
        this.cooldown   = cooldown;
    }
    update(mouse, decks){
        super.update(mouse,decks);
        this.spellLogic()
    }
    spellLogic(){
        
    }
}

