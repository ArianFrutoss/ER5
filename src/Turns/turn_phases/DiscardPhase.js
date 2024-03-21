import Phase from "./Phase.js";

export default class DiscardPhase extends Phase{

    constructor(handDeck,  graveyardDeck){
        super();
        this.handDeck       = handDeck;
        this.graveyardDeck  = graveyardDeck;
    }
    execute(){
        if (this.handDeck.cards.length > 4) {
            const isAnyCardSelected = this.handDeck.isAnyCard(this.handDeck, CardId.SELECTED)
            if (isAnyCardSelected[0]) {
                const position = isAnyCardSelected[1]
                this.handDeck.cards.splice(position, 1)
                this.activeEventDeck.cards.push(card)
                card.state = CardId.NOT_SELECTED
                card.xPos =  -500
                card.yPos =  -500
                return false
            }
        }else {
            return true
        }
    } 
}