import Event from "../Event.js";

export class DurabilityEvent extends Event{

    constructor(card){
        super()
        this.card       = card;
    }
    execute(){
        this.card.durability -= 0.5
        if (this.card.durability === 0) {
            return true
        } else{
            return false
        }
    }
}