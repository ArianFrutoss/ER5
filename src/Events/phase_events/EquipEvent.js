import Event from "../Event";

export class EquipEvent extends Event{

    constructor(equipmentStats, minionObjective){
        this.equipmentStats     = equipmentStats;
        this.minionObjective    = minionObjective;
    }
}