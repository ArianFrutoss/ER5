import Event from "../Event.js";
import { CardActions, TypeId } from "../../constants.js";

export class EquipEvent extends Event{

    constructor(equipment, minionObjective){
        super()
        this.equipment          = equipment;
        this.minionObjective    = minionObjective;
    }

    execute(){

        this.equipment.action = CardActions.ON_USE;

        switch (this.equipment.category){
            case TypeId.WEAPON:
                this.minionObjective.weapon = this.equipment;
                break;
            case TypeId.ARMOR:
                this.minionObjective.armor = this.equipment;
                break;
        }

        return true;
    }
}