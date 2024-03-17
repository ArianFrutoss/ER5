import Card from "../Card.js";

export default class Joseph extends Card{

    constructor(id, name, description, image, rarity, type, xPos, yPos, objective, effect){

        super(id,name, description, image, rarity, type, xPos, yPos, objective);

        this.effect = effect; // efecto carta joseph
        
    }
    update(mouse, decks){
        super.update(mouse,decks);
        this.josephLogic()
    }
    josephLogic(){
        
    }
}
