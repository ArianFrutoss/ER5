import Event from "../Event.js";

export class JosephEvent extends Event{

    constructor(boardArray, modifyAttributeEvent){

        this.boardArray             = boardArray;
        this.modifyAttributeEvent   = modifyAttributeEvent;
        
    }
}