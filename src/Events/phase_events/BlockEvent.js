import { BlockStates } from "../../constants.js";
import Event from "../Event.js";

export default class BlockEvent extends Event{
    
    constructor(attackerMinion, defenderMinion, damage){

        super();

        this.attackerMinion = attackerMinion;
        this.defenderMinion = defenderMinion;
        this.damage         = damage;
        this.state          = BlockStates.INVALID;

    }

    // caso 2 durabilidad < al daño
    execute(){

        this.state  = Math.floor(Math.random() * 3);
        const state = this.state;
        const enemyWeapon = this.defenderMinion.weapon;
        switch(state){

            case BlockStates.COMPLETE_BLOCK:
                console.log("completo");
                this.damage = 0;
                this.defenderMinion.health -= this.damage;
                
                break;

            case BlockStates.PARCIAL_BLOCK:
                console.log("parcial");
                this.damage = Math.floor(Math.random() * (this.damage / 2));
                this.defenderMinion.health -= this.damage;
         
                break;

            case BlockStates.FAILED_BLOCK:
                console.log("fallo");
                this.defenderMinion.health -= this.damage;
          
                break; 
        }

        // Romper el arma del defensor
        enemyWeapon.durability = 0;
    }
}