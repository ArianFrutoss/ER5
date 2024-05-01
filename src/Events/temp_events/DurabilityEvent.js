import { CardActions } from "../../constants.js";
import Event from "../Event.js";

export class DurabilityEvent extends Event{

    constructor(card){
        super()
        this.card       = card;
    }

    execute(){
        
        if (this.card.durability != null){

            this.card.durability -= 0.5;
            
            if (this.card.durability === 0 || this.card.action === CardActions.WORN_OUT){

                return true;
            }
        }

        else if (this.card.action === CardActions.WORN_OUT){

            return true;
        }

        return false;
    }
}