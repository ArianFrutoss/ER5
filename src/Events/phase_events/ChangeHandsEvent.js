import Event from "../Event.js";

export class ChangeHandsEvent extends Event{

    constructor(attackerHandArray, defenderHandArray){

        this.attackerHandArray  = attackerHandArray;
        this.defenderHandArray  = defenderHandArray;
    }
}