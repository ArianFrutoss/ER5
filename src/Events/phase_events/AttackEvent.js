import Event from "../Event.js";

export class AttackEvent extends Event{

    constructor(attackerMinion, objectiveMinion){
        super();

        this.attackerMinion     = attackerMinion;       // Minion atacante
        this.objectiveMinion    = objectiveMinion;      // Minion objetivo
    }

    execute() {
        if (this.attackerMinion.equipedWeapon !== null && this.attackerMinion.equipedWeapon !== undefined) {
            // Ataque con los atributos del minion y del arma
            this.attackWithWeapon();
        } else {
            // Ataque con los atributos del minion
            this.attack();
        }
    }

    attack(){
        const damage = this.attackerMinion.attack;

        this.objectiveMinion.health -= damage;
    }
    
    attackWithWeapon(){
        let damage = this.attackerMinion.attack;

        for (let i = 0; i < this.attackerMinion.equipedWeapon.length; i++) {

            damage += this.attackerMinion.equipedWeapon[i].attack;
        }

        this.objectiveMinion.health -= damage;
    }
}