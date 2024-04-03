import Event from "../Event.js";

export class DrawSpecifyCardEvent extends Event{

    constructor(randomCurseCardEvent, handArray){

        this.randomCurseCardEvent   = randomCurseCardEvent;
        this.handArray              = handArray;
        
    }
}