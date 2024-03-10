import Card from "../Card.js";

export default class Joseph extends Card{

    constructor(id, name, description, image, rarity, type,quantity, xPos, yPos, objective, effect){

        super(id,name, description, image, rarity, type,quantity, xPos, yPos, objective);

        this.effect = effect; // efecto carta joseph
        
    }

}
