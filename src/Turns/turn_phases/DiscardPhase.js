import { CardId } from "../../constants.js";
import Phase from "./Phase.js";

export default class DiscardPhase extends Phase{

    constructor(handDeck,  graveyardDeck, mouse){
        super();
        this.handDeck       = handDeck;
        this.graveyardDeck  = graveyardDeck;
        this.mouse          = mouse
    }
    execute(){
        this.handDeck.update(this.mouse, this.handDeck)
        if (this.handDeck.cards.length > 4) {
            const isAnyCardSelected = this.handDeck.isAnyCard(this.handDeck, CardId.SELECTED)
            if (isAnyCardSelected[0]) {
                const position = isAnyCardSelected[1]
                const card = this.handDeck.cards[position]
                this.handDeck.cards.splice(position, 1)
                this.graveyardDeck.cards.push(card)
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