
import { CardId } from "../constants.js";
export default class Card{

    constructor(id, name, description, image, rarity, type, xPos, yPos){

        this.id             = id;
        this.name           = name;
        this.description    = description;
        this.image          = image;
        this.rarity         = rarity;
        this.type           = type; 
        this.size           = CardId.BIG_SIZE;
        this.state          = CardId.NOT_SELECTED;
        this.xPos           = xPos;
        this.yPos           = yPos;
        // this.objective      = objective;
  	
    }
    
}
