import Event from "../Event.js";

export class GetExtraActionEvent extends Event{

    constructor(turnObject, actionToSum){

        this.turnObject     = turnObject;
        this.actionToSum    = actionToSum;

    }
}

