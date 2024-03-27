
import Mouse from "../Mouse.js";
import { CardActions, CardId, DecksId, TypeId } from "../constants.js";
export default class Card{

    constructor(id, name, description, image, rarity, category, type = "Melee", xPos, yPos, deck){

        this.id             = id;
        this.name           = name;
        this.description    = description;
        this.image          = image;
        this.rarity         = rarity;
        this.category       = category;
        this.type           = type; 
        this.xPos           = xPos;
        this.yPos           = yPos;
        this.size           = CardId.BIG_SIZE;
        this.state          = CardId.NOT_SELECTED;
        this.deck           = deck
        this.previousState  = CardId.NOT_SELECTED
        this.action         = CardActions.NOT_ACTIVE
        // this.objective      = objective;
  	
    }
    updateScale(){
        
    }
    update(){

    }
}
