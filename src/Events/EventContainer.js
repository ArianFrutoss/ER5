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
        const destroyMinionEvent = EventFactory.createDestroyAllMinionsEvent(decks)
        destroyMinionEvent.execute(mouse)

        const ModifyAttributeEvent = EventFactory.createModifyAttributeToAllMinions(decks, josephCard)
        console.log(ModifyAttributeEvent);
        this.events.push(ModifyAttributeEvent)
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