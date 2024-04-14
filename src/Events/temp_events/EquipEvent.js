import Event from "../Event.js";

export class EquipEvent extends Event{

    constructor(objetive, equip){
        super()
        this.objetive   = objetive;
        this.equip      = equip;
    }

    execute(){
        switch (eventCard.category){
                case TypeId.WEAPON:  
                case TypeId.ARMOR:
                    if (eventCard.action === CardActions.READY) {
                        eventCard.category === TypeId.WEAPON ?  minionCard.weapon = eventCard : minionCard.armor = eventCard
                        eventCard.state = CardId.NOT_SELECTED
                        eventCard.action = CardActions.ON_USE
                        for (let i = 0; i < this.eventGrid.slots.length; i++) {
                            const rows = this.eventGrid.slots[i];
                            for (let j = 0; j < rows.length; j++) {
                                const slot = rows[j];
                                slot.state = SlotsState.NOT_SELECTED
                            }
                            
                        }
                        return true
                    }
                    
                    break;
            
                default:
                    break;
            }
    }
}