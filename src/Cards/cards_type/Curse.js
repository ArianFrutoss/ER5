import Card from "../Card.js";

export default class Curse extends Card{

    constructor(id, name, description, image, rarity, type, xPos, yPos, objective, attack, defense, speed, durability, cooldown){

        super(id, name, description, image, rarity, type, xPos, yPos, objective);

        // Card attributes     
        this.attack     = attack;
        this.defense    = defense;
        this.speed      = speed; 		   	
        this.durability = durability;
        this.cooldown   = cooldown; 		
    }

}