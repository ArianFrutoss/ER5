import Event from "../Event.js";

export class CooldownEvent extends Event{

    constructor(id, card, cooldown){
        this.id         = id
        this.card       = card;
        this.cooldown   = cooldown;
    }
}