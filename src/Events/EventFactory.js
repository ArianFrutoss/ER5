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

            for (let i = 0; i < card.effect.length; i++){

                const effect = card.effect[i];
                
                switch (card.category) {
                    case TypeId.BUFF:
                        return new ModifyAttributeEvent(objectiveMinion, effect.common_effect_attribute, -effect.common_effect_value);
                    case TypeId.CURSE:
                        return new ModifyAttributeEvent(objectiveMinion, effect.common_effect_attribute, effect.common_effect_value);
                    case TypeId.SPELL:
                        return new ModifyAttributeEvent(objectiveMinion, effect.common_effect_attribute, effect.common_effect_value);
                    case TypeId.ARMOR:
                        return new EquipEvent();
                    case TypeId.WEAPON:
                        return new EquipEvent();
                    default:
                        break;
                }
            }
        }
    }
}