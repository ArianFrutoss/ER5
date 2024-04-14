import EventFactory from "./EventFactory.js"

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
            if (event != undefined){
                const isOver = event.execute()
                console.log(isOver);
                if (isOver) {
                    this.events.splice(i, 1)
                }

            }
        }
    }
}