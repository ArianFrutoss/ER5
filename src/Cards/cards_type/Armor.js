import Card from "../Card.js";

export default class Armor extends Card{
    constructor(id, name, description, image, rarity, type, isBig, isSelected, xPos, yPos, state, objective, health, attack, defense, speed, durability, cooldown){
        
        super(id, name, description, image, rarity, type, isBig, isSelected, xPos, yPos, state, objective);

            this.health     = health;
            this.attack     = attack;
            this.defense    = defense;
            this.speed      = speed;	
            this.durability = durability;
            this.cooldown   = cooldown;
    }

}        



