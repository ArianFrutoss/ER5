import { CardActions, DecksId, EventsId, StatsId, TypeId } from "../constants.js";
import { CooldownEvent } from "./temp_events/CooldownEvent.js";
import { ModifyAttributeEvent } from "./temp_events/ModifyAttributesEvent.js";
import { EquipEvent } from "./temp_events/EquipEvent.js";

export default class EventFactory {

    constructor() {

    }

    static createCooldownEvent(card){
        
        switch (card.category) {
            case TypeId.BUFF:
            case TypeId.CURSE:
            case TypeId.SPELL:
            case TypeId.ARMOR:
            case TypeId.WEAPON:
                return new CooldownEvent (EventsId.COOLDOWN, card, card.cooldown)
        
            default:
                break;
        }
    }

    static createCommonEvent(card, objectiveMinion){
        
        if (card.action === CardActions.READY){
            
            let length;

            if (card.effect === undefined){
                
                length = 1;
            }

            else{

                length = card.effect.length;
            }
            
            for (let i = 0; i < length; i++){
                
                switch (card.category){
                    case TypeId.BUFF:
                        const buff = new ModifyAttributeEvent(objectiveMinion, card.effect[i].common_effect_attribute, -card.effect[i].common_effect_value);
                        // buff.execute();
                        return buff;
                    case TypeId.CURSE:
                        const curse = new ModifyAttributeEvent(objectiveMinion, card.effect[i].common_effect_attribute, card.effect[i].common_effect_value);
                        // curse.execute();
                        return curse;
                    case TypeId.SPELL:
                        const spell = new ModifyAttributeEvent(objectiveMinion, card.effect[i].common_effect_attribute, card.effect[i].common_effect_value);
                        spell.execute();
                    case TypeId.ARMOR:
                        const armor = new EquipEvent(card, objectiveMinion);
                        armor.execute();
                    case TypeId.WEAPON:
                        const weapon = new EquipEvent(card, objectiveMinion);
                        weapon.execute();
                    default:
                        break;
                }
            }
        }
    }
}