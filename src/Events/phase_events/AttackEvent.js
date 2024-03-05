import Event from "../Event.js";

export class AttackEvent extends Event{

    constructor(attackerMinion, objectiveMinion){

        this.attackerMinion     = attackerMinion;       // Minion atacante
        this.objectiveMinion    = objectiveMinion;      // Minion objetivo
    }
}