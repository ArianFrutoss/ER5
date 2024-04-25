import Event from "../Event.js";

export default class AngeloDiMortisEvent extends Event{

    constructor(turn){
        super();
        
        this.turn   = turn;
    }

    // Drinks the ethazium potion and gains 2 additional actions on the next turn."
    execute(){

        this.turn.maxActions += 2;
    }

    static remove(turn){
        turn.maxActions -= 2;
    }
}