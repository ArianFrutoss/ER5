import Card from "../Card.js";

export default class Spell extends Card{

    constructor(id, name, description, image, rarity, type, isBig, isSelected, xPos, yPos, state, objective, durability, cooldown){

        super(id, name, description, image, rarity, type, isBig, isSelected, xPos, yPos, state, objective);

        // Card attributes   
        this.durability = durability;
        this.cooldown   = cooldown;
    }

}

