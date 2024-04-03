import { CardActions, CardId, SlotsState, TypeId } from "../../constants.js";
import Phase from "./Phase.js";

export default class UseEventPhase extends Phase{

    constructor(eventGrid, eventDeck, boardGrid, activeMinions, enemyActiveMinions, mouse){
        super();
        this.eventGrid              = eventGrid;
        this.eventDeck              = eventDeck;
        this.boardGrid              = boardGrid;
        this.activeMinions          = activeMinions;
        this.enemyActiveMinions     = enemyActiveMinions;
        this.mouse                  = mouse
    }
    execute(mouse){
        const decks = [this.eventDeck, this.activeMinions, this.enemyActiveMinions]
        for (let i = 0; i < decks.length; i++) {
            const deck = decks[i];
            deck.update(mouse, decks)
        }
        const isAnyCardSelected  = this.eventDeck.isAnyCard(this.eventDeck, CardId.SELECTED)
        const isAnyMinionHovered = this.activeMinions.isAnyCard(this.activeMinions, CardId.HOVER)
        
        if (isAnyCardSelected[0] && isAnyMinionHovered[0]) {

            const eventPosition     = isAnyCardSelected[1]
            const minionPosition    = isAnyMinionHovered[1]
            const eventCard         = this.eventDeck.cards[eventPosition]
            const minionCard        = this.activeMinions.cards[minionPosition]

            if (isAnyMinionHovered[0] && !mouse.leftClick   && mouse.previousStateLeft) {
                
                switch (eventCard.category) {
                    case TypeId.WEAPON:
                    case TypeId.ARMOR:
                        if (eventCard.action === CardActions.READY) {
                            eventCard.category === TypeId.WEAPON ?  minionCard.weapon = eventCard : minionCard.armor = eventCard
                            eventCard.state = CardId.NOT_SELECTED
                            eventCard.action = CardActions.ON_USE
                            for (let i = 0; i < this.eventGrid.slots.length; i++) {
                                const rows = this.eventGrid.slots[i];
                                for (let j = 0; j < rows.length; j++) {
                                    const slot = rows[j];
                                    slot.state = SlotsState.NOT_SELECTED
                                }
                                
                            }
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