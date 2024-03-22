import { CardActions } from "../../constants.js";
import Event from "../Event.js";

export class CooldownEvent extends Event{

    constructor(id, card, cooldown){
        this.id         = id
        this.card       = card;
        this.cooldown   = cooldown;
    }
    execute(){
        this.cooldown--
        if (this.cooldown === 0) {
            this.card.state =  CardActions.READY
            return true
        } else{
            return false
        }
    }
}