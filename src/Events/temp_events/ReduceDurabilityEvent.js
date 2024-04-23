import { CardActions } from "../../constants.js";
import Event from "../Event.js";

export default class ReduceDurabilityEvent extends Event{

    constructor(id, card){
        super()
        this.id         = id
        this.card       = card;
    }
    execute(){
        this.card.durability -= 0.5
        if (this.card.durability === 0) {
            this.card.action =  CardActions.WORN_OUT
            return true
        } else{
            return false
        }
    }
}