import { CardId } from "../../constants.js";
import Phase from "./Phase.js";

export default class PrepareEventPhase extends Phase{

    constructor(handDeck, eventDeck, handGrid,eventGrid){
        super();
        this.handDeck   = handDeck;
        this.handGrid   = handGrid;
        this.activeEventDeck  = eventDeck;
        this.activeEventGrid  = eventGrid
    }
    
    execute(){
        
        const isAnyCardSelected = this.handDeck.isAnyCard(this.handDeck, CardId.SELECTED)

        const isAnyGridSelected = true
        if (isAnyCardSelected[0] && isAnyGridSelected) {
            const deckLength = this.activeEventDeck.cards.lenght === undefined ? 0 : this.activeEventDeck.cards.lenght
            console.log("entro", this.activeEventDeck, );
            
            const position = isAnyCardSelected[1]
            if (deckLength < 5) {
                const card = this.handDeck.cards[position]
                this.handDeck.cards.splice(position, 1)
                console.log("llego aqui");
                this.activeEventDeck.cards.push(card)
                const gridY = Math.floor(deckLength/3)
                const gridX = Math.floor(deckLength%3)
                card.xPos =  this.activeEventGrid.slots[gridY][gridX].xPos
                card.yPos =  this.activeEventGrid.slots[gridY][gridX].yPos
            }
            
        }
    }
}