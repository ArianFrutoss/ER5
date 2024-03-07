
import { CardId } from "../constants.js";
export default class Card{

    constructor(id, name, description, image, rarity, type, xPos, yPos,size = CardId.BIG_SIZE, state = CardId.NOT_ACTIVE){

        this.id             = id;
        this.name           = name;
        this.description    = description;
        this.image          = image;
        this.rarity         = rarity;
        this.type           = type; 
        this.isBig          = size
        this.selected       = CardId.NOT_SELECTED;
        this.state          = state;
        this.xPos           = xPos;
        this.yPos           = yPos;
        // this.objective      = objective;
  	
    }
    static createCards(data){
        switch (data.type) {
            case "Minion":
                return new Card(data.id,data.name,data.description,data.image,data.rarity,data.type,50,50)
                
                break;
        
            default:
                break;
        }
    }
}
