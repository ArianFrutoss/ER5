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
        
        const doneDamage = new Messages(this.objectiveMinion.xPos, this.objectiveMinion.yPos, -damage, MessageType.DAMAGE_MESSAGE, MessageState.APPEAR, 0.2, 0.2, 0.3);
        messagesContainer.addMessage(doneDamage);
    }

    attack(){
        const enemyArmor = this.objectiveMinion.armor
        let defense = this.objectiveMinion.defense
        if (enemyArmor != undefined) {
            defense += enemyArmor.defense
            enemyArmor.durability--
        }

        let damage = this.attackerMinion.attack - defense;
        if (damage <0) {
            damage = 0
        }
        this.objectiveMinion.health -= damage;

        return damage;
    }
    
    attackWithWeapon(){
        const enemyArmor = this.objectiveMinion.armor
        let defense = this.objectiveMinion.defense
        if (enemyArmor != undefined) {
            defense += enemyArmor.defense
            enemyArmor.durability--
        }

        let damage = this.attackerMinion.attack + this.attackerMinion.weapon.attack - defense;
        if (damage <0) {
            damage = 0
        }
        this.attackerMinion.weapon.durability--
        this.objectiveMinion.health -= damage;

        return damage;
    }

}