import EventFactory from "./EventFactory"

export default class EventContainer {
    constructor() {
        this.events = []
    }

    createEvent(card){
        const event = EventFactory.create(card)
        this.events.push(event)
    }

    executeEvents(){
        for (let i = 0; i < this.events.length; i++) {
            const event = this.events[i];
            event.execute()
            
        }
    }
}