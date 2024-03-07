import Card from "../Card.js";

export default class Buff extends Card {

    constructor(id ,name, description ,image, rarity, type, isBig, isSelected, xPos, yPos, state, objective, attack, defense, speed, health, durability, cooldown){

        super(id,name, description, image, rarity, type, isBig, isSelected, xPos, yPos, state, objective);

        // Card attributes 
        this.attack     = attack;
        this.defense    = defense;
        this.health     = health;
        this.speed      = speed; 		   	
        this.durability = durability;
        this.cooldown   = cooldown; 		
    }
}
