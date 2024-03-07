import Card from "../Card.js";

export default class Joseph extends Card{

    constructor(id, name, description, image, rarity, type, isBig, isSelected, xPos, yPos, state, objective, effect){

        super(id,name, description, image, rarity, type, isBig, isSelected, xPos, yPos, state, objective);

        this.effect = effect; // efecto carta joseph
        
    }

}
