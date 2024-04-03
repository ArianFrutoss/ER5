import Event from "../Event.js";

export class modifyAttributeEvent extends Event{

    constructor(eventCardStates, objectiveMinion){

        this.eventCardStates    = eventCardStates;
        this.objectiveMinion    = objectiveMinion;
    }
}