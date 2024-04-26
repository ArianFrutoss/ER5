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
    }

    execute(messagesContainer) {
        const critic = this.calculateCritic();
        const fail  = this.calculateFail();
        console.log(fail);
        let damage;

        if (this.attackerMinion.weapon != undefined) {
            // Ataque con los atributos del minion y del arma
            damage = this.attackWithWeapon();
      
            if(critic){
           
                this.objectiveMinion.health -= Math.floor(damage * this.critic);
            }else if(fail){
                this.objectiveMinion.health -= 0;
            }else{
                this.objectiveMinion.health -= damage;
            }

        } else {
            // Ataque con los atributos del minion
            damage = this.attack();
            if(critic){
                this.objectiveMinion.health -= Math.floor(damage * this.critic);
            }else if(fail){
                this.objectiveMinion.health -= 0;
            }else{
                this.objectiveMinion.health -= damage;
            }

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
        const critic = this.calculateCritic();
        const fail   = this.calculateFail();

        console.log(fail);

        if (this.attackerMinion.weapon != undefined) {
            // Ataque con los atributos del minion y del arma
            damage = this.attackWithWeapon();

            if(critic){
                damage = damage * this.critic;
            }else if(fail){
                damage = 0;
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


            }else{
                const block = new BlockEvent(this.attackerMinion, this.objectiveMinion, damage);

                block.execute(messagesContainer);
            }
     

        } else {
            // Ataque con los atributos del minion
            damage = this.attack();
            console.log(damage);
            if(critic){
                damage = damage * this.critic;
            }else if(fail){
                damage = 0;
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
                
            }else{
                const block = new BlockEvent(this.attackerMinion, this.objectiveMinion, damage);

                block.execute(messagesContainer);
            }

        }
        
    }

    calculateCritic(){
        const critic = Math.floor(Math.random() * 20 + 1);

        if(critic >= 19){

            return true;

        }else {

            return false;
        }

    }

    calculateFail(){

        const fail = Math.floor(Math.random() * 20 + 1);

        if(fail <= 1){

            return true;
        }else {

            return false;
        }
    }
    
}