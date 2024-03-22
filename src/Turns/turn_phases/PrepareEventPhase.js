import { CardActions, CardId, SlotsState } from "../../constants.js";
import Phase from "./Phase.js";

export default class PrepareEventPhase extends Phase{

    constructor(handDeck, eventDeck, handGrid,eventGrid){
        super();
        this.handDeck   = handDeck;
        this.handGrid   = handGrid;
        this.activeEventDeck  = eventDeck;
        this.activeEventGrid  = eventGrid;
        
    }
    
    execute(eventContainer){
        
        const isAnyCardSelected = this.handDeck.isAnyCard(this.handDeck, CardId.SELECTED)

        const isAnyGridSelected = this.isGridSelected(this.activeEventGrid)
        if (isAnyCardSelected[0] && isAnyGridSelected[0]) {

            const deckLength = this.activeEventDeck.cards.length 
            
            const position = isAnyCardSelected[1]
            if (deckLength < 5) {
                const card = this.handDeck.cards[position]
                this.handDeck.cards.splice(position, 1)
                this.activeEventDeck.cards.push(card)
                const gridY = Math.floor(deckLength/3)
                const gridX = Math.floor(deckLength%3)
                const slot = isAnyGridSelected[1]
                card.xPos =  slot.xPos
                card.yPos =  slot.yPos
                card.state = CardId.NOT_SELECTED
                card.size = CardId.SMALL_SIZE
                card.action = CardActions.COOLDOWN
                eventContainer.createEvent(card)
                slot.state = SlotsState.NOT_SELECTED

                return true
            }
            
        }
    }
    isGridSelected(grid){
        for (let i = 0; i < grid.slots.length; i++) {
            const slotArray = grid.slots[i];
            for (let j = 0; j < slotArray.length; j++) {
                const slot = slotArray[j];
                if (slot.state === SlotsState.SELECTED) {
                    return [true, slot]
                }
                
            }
            
        }
        return [false]
    }
}