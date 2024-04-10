
import Mouse from "../Mouse.js";
import { CardActions, CardId, DecksId, TypeId } from "../constants.js";
export default class Card{

    constructor(id, name, description, image, rarity, category, type = "Melee", xPos, yPos, imageRarity, imageAttributes, imageBorders, imageCategory, imageReverse,imageVFX){

        this.id             = id;
        this.name           = name;
        this.description    = description;
        this.image          = image;
        this.imageRarity    = imageRarity
        this.imageAttributes = imageAttributes
        this.imageBorders   = imageBorders
        this.imageCategory  = imageCategory
        this.imageReverse   = imageReverse
        this.imageVFX       = imageVFX
        this.rarity         = rarity;
        this.category       = category;
        this.type           = type; 
        this.xPos           = xPos;
        this.yPos           = yPos;
        this.size           = CardId.BIG_SIZE;
        this.state          = CardId.NOT_SELECTED;
        this.deck           
        this.previousState  = CardId.NOT_SELECTED
        this.action         = CardActions.NOT_ACTIVE
        // this.objective      = objective;
  	
    }
    updateScale(mouse, decks){
        
    }
    update(mouse, decks){

    }
    render(){
        
    }
}
