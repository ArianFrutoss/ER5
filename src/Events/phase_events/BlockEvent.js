import { BlockStates } from "../../constants";
import Event from "../Event";

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

        switch(state){

            case BlockStates.COMPLETE_BLOCK:
                this.damage = 0;
                this.defenderMinion.health -= this.damage;
                break;

            case BlockStates.PARCIAL_BLOCK:
                this.damage = Math.floor(Math.random() * (this.damage / 2));
                this.defenderMinion.health -= this.damage;
                break;

            case BlockStates.FAILED_BLOCK:
                this.damage = this.damage;
                this.defenderMinion.health -= this.damage;
                break; 
        }

        // Romper el arma del defensor
        
    }

    // 2 casos Durabilidad > al daño del arma 
    completeBlock(){

    }

}