import { CardActions, CardId, SlotsState } from "../../constants.js";
import Phase from "./Phase.js";

export default class PrepareEventPhase extends Phase{

    constructor(handDeck, eventDeck, handGrid,eventGrid, mouse){
        super();
        this.handDeck   = handDeck;
        this.handGrid   = handGrid;
        this.activeEventDeck  = eventDeck;
        this.activeEventGrid  = eventGrid;

        
    }
    
    execute(eventContainer, mouse){
        
        this.activeEventGrid.update(mouse, this.activeEventDeck);
        this.handGrid.update(mouse, this.handDeck);
        const decks = [this.handDeck, this.activeEventDeck]
        for (let i = 0; i < decks.length; i++) {
            const deck = decks[i];
            deck.update(mouse, decks)
        }

        const isAnyCardSelected = this.handDeck.isAnyCard(this.handDeck, CardId.SELECTED)
        const isAnySlotSelected = this.activeEventGrid.isAnySlot(SlotsState.SELECTED);
        
        if (isAnyCardSelected[0] && isAnySlotSelected[0]){

            const deckLength = this.activeEventDeck.cards.length 
            const position = isAnyCardSelected[1]

            if (deckLength < 5) {
                const card = this.handDeck.cards[position]
                this.handDeck.cards.splice(position, 1)
                this.activeEventDeck.cards.push(card)
                card.setDeck(this.activeEventDeck)
                const gridY = Math.floor(deckLength/3)
                const gridX = Math.floor(deckLength%3)
                const slot = this.activeEventGrid.slots[isAnySlotSelected[1]][isAnySlotSelected[2]];
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
}