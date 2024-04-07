import Event from "../Event.js";
import Messages from "../../Messages.js";
import { MessageState, MessageType } from "../../constants.js";

export class AttackEvent extends Event{

    constructor(attackerMinion, objectiveMinion){
        super();

        this.attackerMinion     = attackerMinion;       // Minion atacante
        this.objectiveMinion    = objectiveMinion;      // Minion objetivo
    }

    execute(messagesContainer) {

        let damage;

        if (this.attackerMinion.weapon != undefined) {
            // Ataque con los atributos del minion y del arma
            damage = this.attackWithWeapon();
        } else {
            // Ataque con los atributos del minion
            damage = this.attack();
        }
        
        const doneDamage = new Messages(this.objectiveMinion.xPos, this.objectiveMinion.yPos, -damage, MessageType.DAMAGE_MESSAGE, MessageState.APPEAR, 0.2, 0.3, 0.5);
        messagesContainer.messages.push(doneDamage);
    }

    attack(){
        const damage = this.attackerMinion.attack;
        this.objectiveMinion.health -= damage;

        return damage;
    }
    
    attackWithWeapon(){
        let damage = this.attackerMinion.attack + this.attackerMinion.weapon.attack;
        this.attackerMinion.weapon.durability--
        this.objectiveMinion.health -= damage;

        return damage;
    }
}