
import { CardId } from "../constants.js";
export default class Card{

    constructor(id, name, description, image, rarity, category,type = "Melee",quantity, xPos, yPos, ){

        this.id             = id;
        this.name           = name;
        this.description    = description;
        this.image          = image;
        this.rarity         = rarity;
        this.category       = category;
        this.type           = type; 
        this.quantity       = quantity;
        this.xPos           = xPos;
        this.yPos           = yPos;
        this.size           = CardId.BIG_SIZE;
        this.state          = CardId.NOT_SELECTED;
        // this.objective      = objective;
  	
    }
    
}
