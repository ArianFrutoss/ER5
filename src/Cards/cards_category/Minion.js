import Card from "../Card.js";

export default class Minion extends Card{

    constructor(id, name, description, image, rarity, type, xPos, yPos, attack, defense, health, speed, equipedWeapon=undefined, equipedArmor=undefined){

        super(id, name, description, image, rarity, type, xPos, yPos);

        // Card attributes   
        this.attack     = attack;
        this.defense    = defense;
        this.health     = health;
        this.speed      = speed; 		   	
        this.equipedWeapon = equipedWeapon;
        this.equipedArmor  = equipedArmor;
    }
    
}

