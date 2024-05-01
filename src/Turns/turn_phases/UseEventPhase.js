import { CardId, TypeId, PhaseStates, messageUseEventPhase1, messageUseEventPhase2, messageUseEventPhase3 } from "../../constants.js";
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
    execute(eventContainer, mouse, messagesContainer){

        this.eventGrid.update(mouse, this.eventDeck);
        this.boardGrid.update(mouse, [this.activeMinions, this.enemyActiveMinions]);
        const decks = [this.eventDeck, this.activeMinions, this.enemyActiveMinions]
        for (let i = 0; i < decks.length; i++) {
            const deck = decks[i];
            deck.update(mouse, decks)
            
        }
        
        const isAnyCardSelected  = this.eventDeck.isAnyCard(this.eventDeck, CardId.SELECTED);
        
        if (isAnyCardSelected.length === 0){
            
            messagesContainer.activeMessage(messageUseEventPhase1);
        }

        else{

            if (isAnyCardSelected[0] === false){

                messagesContainer.activeMessage(messageUseEventPhase2);
            }
    
            if (isAnyCardSelected[0]){
    
                messagesContainer.activeMessage(messageUseEventPhase3);
            }
        }

        if (isAnyCardSelected[0]) {
            
            const eventPosition     = isAnyCardSelected[1]
            const eventCard         = this.eventDeck.cards[eventPosition]
            
            let minionDeck;

            switch (eventCard.category){

                case TypeId.BUFF:
                    minionDeck = this.activeMinions;
                    break;
                case TypeId.CURSE:
                    minionDeck = this.enemyActiveMinions;
                    break;
                case TypeId.SPELL:
                    minionDeck = this.enemyActiveMinions;
                    break;
                case TypeId.WEAPON:
                    minionDeck = this.activeMinions;
                    break;
                case TypeId.ARMOR:
                    minionDeck = this.activeMinions;
                    break;
                default:
                    break;
            }
            
            const isAnyMinionHovered = this.activeMinions.isAnyCard(minionDeck, CardId.HOVER)
            
            if (isAnyMinionHovered[0]){

                const minionPosition    = isAnyMinionHovered[1]
                const minionCard        = minionDeck.cards[minionPosition]

                if (isAnyMinionHovered[0] && !mouse.leftClick && mouse.previousStateLeft) {

                    let result;

                    result = eventContainer.createDurabilityEvent(eventCard);
                    result = eventContainer.createCommonEvent(eventCard, minionCard);

                    return result;
                }
            }
        }
    }

    isEventCancelled(buttonContainer){
        
        const buttonState = buttonContainer.isAnyButtonSelected();

        if(buttonState === PhaseStates.DEFAULT){

            return true;
        }else {

            return false;
        }

    }

    setEventGrid(grid){
        this.activeEventGrid = grid
    }

}