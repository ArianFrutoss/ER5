import Card from "../Card.js";

export default class Buff extends Card {

    constructor(id ,name, description ,image, rarity, type, xPos, yPos, objective, attack=0, defense=0, speed=0, health=0, durability=0, cooldown=0){

        super(id,name, description, image, rarity, type, xPos, yPos, objective);

        // Card attributes 
        this.attack     = attack;
        this.defense    = defense;
        this.health     = health;
        this.speed      = speed; 		   	
        this.durability = durability;
        this.cooldown   = cooldown; 		
    }
    update(mouse, decks){
        super.update(mouse,decks);
        this.buffLogic()
    }
    buffLogic(){
        
    }
}
