import { CardActions, DecksId, EventsId, StatsId, TypeId } from "../constants.js";
import { CooldownEvent } from "./temp_events/CooldownEvent.js";
import { ModifyAttributeEvent } from "./temp_events/ModifyAttributesEvent.js";
import { EquipEvent } from "./temp_events/EquipEvent.js";
import { DestroyAllMinionsEvent } from "./phase_events/DestroyAllMinionsEvent.js";
import { ModifyAttributeToAllMinions } from "./temp_events/ModifyAttributeToAllMinions.js";
import ReduceDurabilityEvent from "./temp_events/ReduceDurabilityEvent.js";

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

    static reduceDurabilityEvent(card){

        switch (card.category) {
            case TypeId.BUFF:
            case TypeId.CURSE:
            case TypeId.SPELL:
            case TypeId.ARMOR:
            case TypeId.WEAPON:
                return new ReduceDurabilityEvent(EventsId.DURABILITY, card);
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
                        const buff = new ModifyAttributeEvent(objectiveMinion, card.effect[i].common_effect_attribute, -card.effect[i].common_effect_value, card);
                        buff.execute();
                        return buff;
                    case TypeId.CURSE:
                        const curse = new ModifyAttributeEvent(objectiveMinion, card.effect[i].common_effect_attribute, card.effect[i].common_effect_value, card);
                        curse.execute();
                        return curse;
                    case TypeId.SPELL:
                        const spell = new ModifyAttributeEvent(objectiveMinion, card.effect[i].common_effect_attribute, card.effect[i].common_effect_value, card);
                        spell.execute();
                    case TypeId.ARMOR:
                        const armor = new EquipEvent(card, objectiveMinion);
                        armor.execute();
                        break;
                    case TypeId.WEAPON:
                        const weapon = new EquipEvent(card, objectiveMinion);
                        weapon.execute();
                        break;
                    default:
                        break;
                }
            }
        }
    }

    static createDestroyAllMinionsEvent(decks, card){
        return new DestroyAllMinionsEvent(decks, card)
    }

    static createModifyAttributeToAllMinions(decks, card){
        return new ModifyAttributeToAllMinions(decks, card)
    }
    static createModifyAttributeEvent(card, objectiveMinion){
        const length = card.effect != undefined ? card.effect.length : 1;
        for (let i = 0; i < length; i++) {
            const joseph = new ModifyAttributeEvent(objectiveMinion, card.effect[i].common_effect_attribute, card.effect[i].common_effect_value);
            joseph.execute()
        }
    }
}