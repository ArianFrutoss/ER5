import { CardActions, CardId, TypeId } from "../../constants.js";
import Phase from "./Phase.js";

export default class UseEventPhase extends Phase{

    constructor(eventGrid, eventDeck, boardGrid, activeMinions, enemyActiveMinions){
        super();
        this.eventGrid              = eventGrid;
        this.eventDeck              = eventDeck;
        this.boardGrid              = boardGrid;
        this.activeMinions          = activeMinions;
        this.enemyActiveMinions     = enemyActiveMinions;
    }
    execute(mouse){
        
        const isAnyCardSelected  = this.eventDeck.isAnyCard(this.eventDeck, CardId.SELECTED)
        const isAnyMinionHovered = this.activeMinions.isAnyCard(this.activeMinions, CardId.SELECTED)
        
        if (isAnyCardSelected[0] && isAnyMinionHovered[0]) {

            
            const eventPosition     = isAnyCardSelected[1]
            const minionPosition    = isAnyCardSelected[1]
            const eventCard         = this.eventDeck.cards[eventPosition]
            const minionCard        = this.activeMinions.cards[minionPosition]

            if (isAnyMinionHovered[0] && !mouse.leftClick   && mouse.previousStateLeft) {
                console.log("llego");
                switch (eventCard.category) {
                    case TypeId.WEAPON:
                    case TypeId.ARMOR:
                        if (eventCard.action === CardActions.READY) {

                            eventCard.category === TypeId.WEAPON ?  minionCard.weapon = eventCard : minionCard.armor
                            eventCard.state = CardId.NOT_SELECTED
                            eventCard.action = CardActions.ON_USE
                            
                            return true
                        }
                        
                        break;
                
                    default:
                        break;
                }
            }
            
        }
    }

}