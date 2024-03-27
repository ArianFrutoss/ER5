
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
    update(mouse,decks){

        const isAnyCardScaled   = this.deck.isAnyCard(decks, CardId.SCALED)
        const isAnyCardSelected = this.deck.isAnyCard(decks, CardId.SELECTED)

        if (!isAnyCardScaled[0]) {
            const isCollidingWithMouse = mouse.isCollidingWithCard(this)
    
            switch (this.state) {
                case CardId.NOT_SELECTED:
                    
                    this.state = isCollidingWithMouse ? this.state = CardId.HOVER : CardId.NOT_SELECTED
                    
                    break;
    
                    case CardId.HOVER:
                        this.state = isCollidingWithMouse   ? this.state = CardId.HOVER : CardId.NOT_SELECTED
                        this.state =
                            !mouse.leftClick    && !isAnyCardSelected[0] && mouse.previousStateLeft      ? CardId.SELECTED           : 
                            !mouse.rightClick   && mouse.previousStateRight                              ? CardId.SCALED             : this.state
                        break;
    
                    case CardId.SELECTED:
                        this.state = 
                            !mouse.leftClick      && mouse.previousStateLeft  && isCollidingWithMouse       ? CardId.NOT_SELECTED        : 
                            !mouse.rightClick     && mouse.previousStateRight && isCollidingWithMouse       ? CardId.SCALED              : this.state
                        // console.log("selected");
                        break;

                    case CardId.SCALED:
        
                        break;
                
                    case CardId.ATTACK:

                        
                        break;
                
                default:
                    break;
            }
        } else {
            
            if (this.state === CardId.SCALED) {
                this.state = !mouse.rightClick && mouse.previousStateRight       ? CardId.NOT_SELECTED            : this.state

            }
        }
            this.previousState = this.state
    }
}
