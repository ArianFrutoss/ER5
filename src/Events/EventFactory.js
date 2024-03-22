import { EventsId, TypeId } from "../constants.js";
import { CooldownEvent } from "./temp_events/CooldownEvent.js";


export default class EventFactory {

    constructor() {

    }

    static create(card){

        switch (card.category) {
            case TypeId.WEAPON:
                return new CooldownEvent (EventsId.COOLDOWN, card, card.cooldown)
        
            default:
                break;
        }
    }
}