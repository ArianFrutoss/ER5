import Card from "../Card.js";

export default class Weapon extends Card{

    constructor(id, name, description, image, rarity, type,quantity, xPos, yPos, state, objective, weaponType, range, attack, defense, speed, durability, cooldown){

        super(id, name, description, image, rarity, type,quantity, xPos, yPos, state, objective);

        // Card attributes   
        this.type           = type;
        this.range          = range;
        this.attack         = attack;
        this.defense        = defense;
        this.speed          = speed;
        this.durability     = durability;
        this.cooldown       = cooldown;
    }
}
