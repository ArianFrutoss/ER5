import Event from "../Event.js";
import Messages from "../../Messages.js";
import { MessageState, MessageType } from "../../constants.js";
import BlockEvent from "./BlockEvent.js";

export class AttackEvent extends Event{

    constructor(attackerMinion, objectiveMinion){
        super();

        this.attackerMinion     = attackerMinion;       // Minion atacante
        this.objectiveMinion    = objectiveMinion;      // Minion objetivo
        this.critic             = 1.75;
        this.fail               = 0;
        this.damageDone         = 0;
    }

    execute(messagesContainer) {
        const dice = this.throwDice();
        const critic = this.calculateCritic(dice);
        const fail   = this.calculateFail(dice);
     
        let damage;
        let size = 80
        let color = "red"

        if (this.attackerMinion.weapon != undefined) {
            // Ataque con los atributos del minion y del arma
            damage = this.attackWithWeapon();
        } else {
            // Ataque con los atributos del minion
            damage = this.attack();
        }

        if(critic){
            damage = Math.floor(damage * this.critic);
            this.objectiveMinion.health -= damage
            size = 100
            color= "orange"
        }else if(fail){
            damage = 0
            this.objectiveMinion.health -= damage;
            size = 100
            color= "white"
        }else{
            this.objectiveMinion.health -= damage;
        }
        
        const doneDamage = new Messages(this.objectiveMinion.xPos, this.objectiveMinion.yPos, -damage, MessageType.DAMAGE_MESSAGE, MessageState.APPEAR, 0.2, 0.2, 0.3, size, color);
        messagesContainer.addMessage(doneDamage);
        this.damageDone += damage;
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
      
        return damage;
    }

    attackWithParry(messagesContainer){
        const enemyWeapon = this.objectiveMinion.weapon;
        let damage;

        const dice = this.throwDice();
        const critic = this.calculateCritic(dice);
        const fail   = this.calculateFail(dice);


        if (this.attackerMinion.weapon != undefined) {
            // Ataque con los atributos del minion y del arma
            damage = this.attackWithWeapon();

            if(critic){
                damage = Math.floor(damage * this.critic);
                size = 100
                color= "orange"
            }else if(fail){
                damage = 0;
                size = 100
                color= "white"
            }

            if(enemyWeapon.durability > damage * 0.75){

                let defense = Math.floor(damage);

                if (defense < 1){

                    defense = 1;
                }

                enemyWeapon.durability -= defense;

                const damageRender = "BLOCKED"
                const doneDamage = new Messages(this.objectiveMinion.xPos, this.objectiveMinion.yPos, damageRender, MessageType.DAMAGE_MESSAGE, MessageState.APPEAR, 0.2, 0.2, 0.3);
                messagesContainer.addMessage(doneDamage);
                this.damageDone += damage;

            }else{
                const block = new BlockEvent(this.attackerMinion, this.objectiveMinion, damage);

                let damage = block.execute(messagesContainer, size, color);
                this.damageDone += damage;
            }
     

        } else {
            // Ataque con los atributos del minion
            damage = this.attack();
            if(critic){
                damage = Math.floor(damage * this.critic);
                size = 100
                color= "orange"
            }else if(fail){
                damage = 0;
                size = 100
                color= "white"
            }


            if(enemyWeapon.durability > damage * 0.75){

                let defense = Math.floor(damage);

                if (defense < 1){

                    defense = 1;
                }

                enemyWeapon.durability -= defense;
                const damageRender = "BLOCKED"
                const doneDamage = new Messages(this.objectiveMinion.xPos, this.objectiveMinion.yPos, damageRender, MessageType.DAMAGE_MESSAGE, MessageState.APPEAR, 0.2, 0.2, 0.3);
                messagesContainer.addMessage(doneDamage);
                this.damageDone += damage;
                
            }else{
                const block = new BlockEvent(this.attackerMinion, this.objectiveMinion, damage);

                let damage = block.execute(messagesContainer,size, color);
                this.damageDone += damage;
            }

        }
        
    }

    throwDice(){

        return Math.floor(Math.random() * 20 + 1);
    }

    calculateCritic(critic){

        if(critic * this.attackerMinion.criticModifier >= 20){

            return true;

        }else {

            return false;
        }
    }

    calculateFail(fail){

        if(fail / this.attackerMinion.failModifier <= 1){

            return true;
        }else {

            return false;
        }
    }
}