import Card from "../Card.js";

export default class Minion extends Card{

    constructor(id, name, description, image, rarity, type, xPos, yPos, objective, attack, defense, health, speed, equipedWeapon, equipedArmor){

        super(id, name, description, image, rarity, type, xPos, yPos, objective);

        // Card attributes   
        this.attack     = attack;
        this.defense    = defense;
        this.health     = health;
        this.speed      = speed; 		   	
        this.equipedWeapon = equipedWeapon;
        this.equipedArmor  = equipedArmor;
    }
    
}

