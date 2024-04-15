import EventFactory from "./EventFactory.js"

export default class EventContainer {
    constructor() {
        this.events = []
    }

    createCooldownEvent(card){
        const event = EventFactory.createCooldownEvent(card)
        this.events.push(event)
    }

    createCommonEvent(card, objectiveMinion){
        const event = EventFactory.createCommonEvent(card, objectiveMinion)
        
        if (event != undefined){
            
            this.events.push(event)
        }
    }

    executeEvents(){
        for (let i = 0; i < this.events.length; i++) {
            const event = this.events[i];
            const isOver = event.execute()
            console.log(isOver);
            if (isOver) {
                this.events.splice(i, 1)
            }
        }
    }
}