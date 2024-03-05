
export default class Card{

    constructor(id, name, description, image, rarity, type,isBig, isSelected, state, xPos, yPos, objective){

        this.id             = id;
        this.name           = name;
        this.description    = description;
        this.image          = image;
        this.rarity         = rarity;
        this.type           = type; 
        this.isBig          = isBig;
        this.selected       = isSelected;
        this.state          = state;
        this.xPos           = xPos;
        this.yPos           = yPos;
        this.objective      = objective;
  	
    }
}
