import Card from "../Card.js";

export default class Armor extends Card{
    constructor(id, name, description, image, rarity,category, type, xPos, yPos, health, attack, defense, speed, durability, cooldown){
        
        super(id, name, description, image, rarity, category, xPos, yPos);

            this.health     = health;
            this.attack     = attack;
            this.defense    = defense;
            this.speed      = speed;	
            this.durability = durability;
            this.cooldown   = cooldown;
    }
    update(mouse, decks){
        super.update(mouse,decks);
        this.armorLogic()
    }
    armorLogic(){
        
    }
}        



