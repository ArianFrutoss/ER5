import Messages from "../Messages.js"
import { IconsPos, MessageState, MessageType } from "../constants.js"
import EventFactory from "./EventFactory.js"

export default class EventContainer {
    constructor() {
        this.events = []
    }

    createCooldownEvent(card){
        const event = EventFactory.createCooldownEvent(card)
        this.events.push(event)
    }

    createDurabilityEvent(card){
        const event = EventFactory.createDurabilityEvent(card)

        if (event != undefined){

            this.events.push(event)
            return true;
        }

        return false;
    }

    createCommonEvent(card, objectiveMinion, messagesContainer){
        const event = EventFactory.createCommonEvent(card, objectiveMinion, messagesContainer)
        
        if (event != undefined){

            for (let i = 0; i < event.length; i++){

                this.events.push(event[i]);
            }

            return true;
        }

        return false;
    }

    createJosephEvents(decks, josephCard, mouse){
        const minionDecks = [decks[0],decks[1]]
        const destroyMinionEvent = EventFactory.createDestroyAllMinionsEvent(minionDecks)
        destroyMinionEvent.execute(mouse)

        const eventDecks = [decks[2],decks[3]]
        const destroyEvents = EventFactory.createDestroyAllEvents(eventDecks)
        destroyEvents.execute(mouse)

        const ModifyAttributeEvent = EventFactory.createModifyAttributeToAllMinions(minionDecks, josephCard)
        this.events.push(ModifyAttributeEvent)
    }

    executeEvents(messagesContainer,decks){
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
        this.createEventMessages(messagesContainer, decks)
    }
    createEventMessages(messagesContainer, decks){
        for (let j = 0; j < decks.length; j++) {
            const deck = decks[j];
                for (let i = 0; i < deck.cards.length; i++) {
                    const card = deck.cards[i];
                    const hpDif = card.previousHealth - card.health
                    const defDif = card.previousDefense - card.defense
                    const attDif = card.previousAttack - card.attack
                    const spdDif = card.previousSpeed - card.previousSpeed
    
                    const xPosATT = card.xPos + IconsPos.FOURTH_ICON_NUMBER_X[1]
                    const yPosATT = card.yPos + IconsPos.FOURTH_ICON_NUMBER_Y[1]
    
                    const xPosDEF = card.xPos + IconsPos.FIRST_ICON_NUMBER_X[1]
                    const yPosDEF = card.yPos + IconsPos.FIRST_ICON_NUMBER_Y[1]
    
                    const xPosSPD = card.xPos + IconsPos.SECOND_ICON_NUMBER_X[1]
                    const yPosSPD = card.yPos + IconsPos.SECOND_ICON_NUMBER_Y[1]
    
                    const xPosHP = card.xPos + IconsPos.THIRD_ICON_NUMBER_X[1]
                    const yPosHP = card.yPos + IconsPos.THIRD_ICON_NUMBER_Y[1]
    
                    const stats = [hpDif, defDif, attDif, spdDif]
                    const xPos = [xPosHP, xPosDEF, xPosATT, xPosSPD]
                    const yPos = [yPosHP, yPosDEF, yPosATT, yPosSPD]
                    for (let k = 0; k < stats.length; k++) {
                        if (stats[k] != 0) {
                            const color = stats[k] < 0 ? "green" : "red"
                            const message = new Messages(xPos[k], yPos[k] , stats[k], MessageType.DAMAGE_MESSAGE, MessageState.APPEAR, 0.2, 0.2, 0.8, 28, color);

                            messagesContainer.addMessage(message)
                        }
                        
                    }
                }
        }
    }
    createHeroEvents(activeMinionDeck, activeEnemyMinionDeck, hero, card, turn){
        
        const heroEvents = EventFactory.createHeroEventsToUseInEventContainer(activeMinionDeck, activeEnemyMinionDeck, hero, card, turn);
        
        this.events.push(heroEvents);
    }

    createIncreaseActionsEvent(turn, card, value){
        const actionEvent = EventFactory.createIncreaseActionEvent(turn, card, value);
        this.events.push(actionEvent);

    }

    createTeleportEvent(turn, card, objectiveMinion, messagesContainer){
        const actionEvent = EventFactory.createIncreaseActionEvent(turn, card, 1);
        actionEvent.execute()

        const modifyEvent = EventFactory.createCommonEvent(card, objectiveMinion, messagesContainer)
        if (modifyEvent != undefined){

            for (let i = 0; i < modifyEvent.length; i++){

                this.events.push(modifyEvent[i]);
            }

            return true;
        }

        return false;
    }
    createHandDeckSpecialEventAndPush(card, enemyHandeck, handDeck){
        
        const handDeckEvent = EventFactory.createHandDeckSpecialEvents(card, enemyHandeck, handDeck);

        this.events.push(handDeckEvent);
    }
}