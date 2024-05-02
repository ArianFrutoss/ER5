import Event from "../Event.js";

export default class IncreaseActionEvent extends Event{

    constructor(turn, card, value){
        super();
        this.card   = card;
        this.value  = value;
        this.turn   = turn;
    }

    // Drinks the ethazium potion and gains 2 additional actions on the next turn."
    execute(){

        this.turn.actionsCounter -= this.value;

        if (this.card.durability <= 0 && this.card.durability != null){

            return true;
        }else{
            return false
        }
    }
}