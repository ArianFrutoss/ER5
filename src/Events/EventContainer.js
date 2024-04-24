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

    createJosephEvents(decks, josephCard, mouse){
        const minionDecks = [decks[0],decks[1]]
        const destroyMinionEvent = EventFactory.createDestroyAllMinionsEvent(minionDecks)
        destroyMinionEvent.execute(mouse)

        const eventDecks = [decks[2],decks[3]]
        const destroyEvents = EventFactory.createDestroyAllEvents(eventDecks)
        destroyEvents.execute(mouse)

        const ModifyAttributeEvent = EventFactory.createModifyAttributeToAllMinions(decks, josephCard)
        this.events.push(ModifyAttributeEvent)
    }

    executeEvents(){
        for (let i = 0; i < this.events.length; i++) {
            const event = this.events[i];
            if (event != undefined){
                const isOver = event.execute()
                if (isOver) {
                    this.events.splice(i, 1)
                    i -= 1;
                }
            }
        }
    }
}