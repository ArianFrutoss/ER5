import Event from "../Event.js";

export class DurabilityEvent extends Event{

    constructor(card){
        super()
        this.card       = card;
    }
    execute(){

        if (this.card.durability != null){

            this.card.durability -= 0.5
            if (this.card.durability === 0) {
                return true
            } else{
                return false
            }
        }
    }
}