import { CardActions, CardId, SlotsState, TypeId, MessageState, MessageType, HelpMessagesPos , PhaseStates, messageUseEventPhase1, messageUseEventPhase2, messageUseEventPhase3 } from "../../constants.js";
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
    execute(eventContainer, mouse, messagesContainer){

        this.eventGrid.update(mouse, this.eventDeck);
        this.boardGrid.update(mouse, [this.activeMinions, this.enemyActiveMinions]);
        const decks = [this.eventDeck, this.activeMinions, this.enemyActiveMinions]
        for (let i = 0; i < decks.length; i++) {
            const deck = decks[i];
            deck.update(mouse, decks)
        }
        
        const isAnyCardSelected  = this.eventDeck.isAnyCard(this.eventDeck, CardId.SELECTED)
        const messages = messagesContainer.messages;
        
        if (isAnyCardSelected.length === 0){
            
            if (messages[MessageType.HELP_MESSAGE] === undefined){
            
                const message = new Messages(HelpMessagesPos.X_POS, HelpMessagesPos.Y_POS, messageUseEventPhase1, MessageType.HELP_MESSAGE, MessageState.APPEAR, 0.2, 0.3, null);
                messages[MessageType.HELP_MESSAGE] = message;
            }
        }

        else{

            if (messages[MessageType.HELP_MESSAGE] === undefined && isAnyCardSelected[0] === false){
            
                const message = new Messages(HelpMessagesPos.X_POS, HelpMessagesPos.Y_POS, messageUseEventPhase2, MessageType.HELP_MESSAGE, MessageState.APPEAR, 0.2, 0.3, null);
                messages[MessageType.HELP_MESSAGE] = message;
                messages[MessageType.HELP_MESSAGE].drawMessage = true;
            }
            
            if (messages[MessageType.HELP_MESSAGE] === undefined && isAnyCardSelected[0]){
    
                const message = new Messages(HelpMessagesPos.X_POS, HelpMessagesPos.Y_POS, messageUseEventPhase3, MessageType.HELP_MESSAGE, MessageState.APPEAR, 0.2, 0.3, null);
                messages[MessageType.HELP_MESSAGE] = message;
                messages[MessageType.HELP_MESSAGE].drawMessage = false;
            }
            
            if (messages[MessageType.HELP_MESSAGE].drawMessage && messages[MessageType.HELP_MESSAGE] != undefined && isAnyCardSelected[0]){
                
                messages[MessageType.HELP_MESSAGE].timeInOn = 0;
            }
    
            if (messages[MessageType.HELP_MESSAGE].drawMessage === false && messages[MessageType.HELP_MESSAGE] != undefined && isAnyCardSelected[0] === false){
                
                messages[MessageType.HELP_MESSAGE].timeInOn = 0;
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

                if (isAnyMinionHovered[0] && !mouse.leftClick   && mouse.previousStateLeft) {

                    messages[MessageType.HELP_MESSAGE].timeInOn = 0;
                    eventContainer.createCommonEvent(eventCard, minionCard)

                    return true;
                }
            }
        }
    }

    isEventCancelled(buttonContainer, messagesContainer){
        
        const buttonState = buttonContainer.isAnyButtonSelected();

        if(buttonState === PhaseStates.DEFAULT){

            messagesContainer.messages[MessageType.HELP_MESSAGE].timeInOn = 0;
            return true;
        }else {

            return false;
        }

    }

    setEventGrid(grid){
        this.activeEventGrid = grid
    }

}