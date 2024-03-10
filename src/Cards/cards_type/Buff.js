import Card from "../Card.js";

export default class Buff extends Card {

    constructor(id ,name, description ,image, rarity, type,quantity, xPos, yPos, objective, attack, defense, speed, health, durability, cooldown){

        super(id,name, description, image, rarity, type,quantity, xPos, yPos, objective);

        // Card attributes 
        this.attack     = attack;
        this.defense    = defense;
        this.health     = health;
        this.speed      = speed; 		   	
        this.durability = durability;
        this.cooldown   = cooldown; 		
    }
}
