import Event from "../Event.js";

export class AttackEvent extends Event{

    constructor(attackerMinion, objectiveMinion){
        super();

        this.attackerMinion     = attackerMinion;       // Minion atacante
        this.objectiveMinion    = objectiveMinion;      // Minion objetivo
    }

    execute(){

        if(this.attackerMinion.equipedWeapon.length <= 0){
 
            // ataque con los atributos del minion
            this.attack();

        }else{

            // Ataque con los atributtos del minion y del arma
            this.attackWithWeapon();
   
        }
    }

    attack(){
        const damage = this.attackerMinion.attack;

        this.objectiveMinion.health -= damage;
    }

    attackWithWeapon(){
        let damage = this.attackerMinion.attack;

        for(let i = 0; i < this.attackerMinion.equipedWeapon.length; i++){

            damage += this.attackerMinion.equipedWeapon[i].attack;
        }

        this.objectiveMinion.health -= damage;
    }
}