import { CardActions, CardId, SlotsState, TypeId, MessageState, MessageType, HelpMessagesPos , PhaseStates} from "../../constants.js";
import Phase from "./Phase.js";
import Messages from "../../Messages.js";

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
    execute(mouse, messagesContainer){

        this.eventGrid.update(mouse, this.eventDeck);
        this.boardGrid.update(mouse, [this.activeMinions, this.enemyActiveMinions]);
        const decks = [this.eventDeck, this.activeMinions, this.enemyActiveMinions]
        for (let i = 0; i < decks.length; i++) {
            const deck = decks[i];
            deck.update(mouse, decks)
        }
        const isAnyCardSelected  = this.eventDeck.isAnyCard(this.eventDeck, CardId.SELECTED)
        const isAnyMinionHovered = this.activeMinions.isAnyCard(this.activeMinions, CardId.HOVER)
        
        const messages = messagesContainer.messages;

        if (messages[1] === undefined && isAnyCardSelected[0] === false){

            const message = new Messages(HelpMessagesPos.X_POS, HelpMessagesPos.Y_POS, "Select any prepared event card to use", MessageType.HELP_MESSAGE, MessageState.APPEAR, 0.2, 0.3, null);
            messages[1] = message;
            messages[1].drawMessage = true;
        }
        
        if (messages[1] === undefined && isAnyCardSelected[0]){

            const message = new Messages(HelpMessagesPos.X_POS, HelpMessagesPos.Y_POS, "Select any minion to use the event card", MessageType.HELP_MESSAGE, MessageState.APPEAR, 0.2, 0.3, null);
            messages[1] = message;
            messages[1].drawMessage = false;
        }
        
        if (messages[1].drawMessage && messages.length === 1 && isAnyCardSelected[0]){
            
            messages[1].timeInOn = 0;
        }

        if (messages[1].drawMessage === false && messages.length === 1 && isAnyCardSelected[0] === false){
            
            messages[1].timeInOn = 0;
        }

        if (isAnyCardSelected[0] && isAnyMinionHovered[0]) {

            const eventPosition     = isAnyCardSelected[1]
            const minionPosition    = isAnyMinionHovered[1]
            const eventCard         = this.eventDeck.cards[eventPosition]
            const minionCard        = this.activeMinions.cards[minionPosition]

            if (isAnyMinionHovered[0] && !mouse.leftClick   && mouse.previousStateLeft) {

                messages[1].timeInOn = 0;

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

    isEventCancelled(buttonContainer){
        
        const buttonState = buttonContainer.isAnyButtonSelected();

        if(buttonState === PhaseStates.DEFAULT){

            return true;
        }else {

            return false;
        }

    }

}