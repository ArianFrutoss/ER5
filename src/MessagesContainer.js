import { MessageType } from "./constants.js";
import Messages from "./Messages.js";
import { HelpMessagesPos, MessageState, messageDefaultPhase, messageDiscardPhase, messageMovimentPhase1, messageMovimentPhase2, messageAttackPhase1, messageAttackPhase2, messagePrepareEventPhase1, messagePrepareEventPhase2, messageUseEventPhase1, messageUseEventPhase2, messageUseEventPhase3 } from "./constants.js";

export default class MessagesContainer{

    constructor(){

        this.damageMessage      = [];
        this.helpMessage        = [];
        this.activeHelpMessage;
        this.previousHelpMessage;
    }

    update(){
        
        for (let i = 0; i < this.damageMessage.length; i++){

            const message = this.damageMessage[i];

            if (message != undefined){
                
                message.update(this.damageMessage);
            }
        }
            
        if (this.activeHelpMessage != undefined){

            this.activeHelpMessage.update(this.helpMessage);
        }
    }

    createHelpMessages(){

        const defaultPhase          = new Messages(HelpMessagesPos.X_POS, HelpMessagesPos.Y_POS, messageDefaultPhase, MessageType.HELP_MESSAGE, MessageState.APPEAR, 0.1, 0.2, null);
        const discardPhase          = new Messages(HelpMessagesPos.X_POS, HelpMessagesPos.Y_POS, messageDiscardPhase, MessageType.HELP_MESSAGE, MessageState.APPEAR, 0.1, 0.2, null);
        const movimentPhase1        = new Messages(HelpMessagesPos.X_POS, HelpMessagesPos.Y_POS, messageMovimentPhase1, MessageType.HELP_MESSAGE, MessageState.APPEAR, 0.1, 0.2, null);
        const movimentPhase2        = new Messages(HelpMessagesPos.X_POS, HelpMessagesPos.Y_POS, messageMovimentPhase2, MessageType.HELP_MESSAGE, MessageState.APPEAR, 0.1, 0.2, null);
        const attackPhase1          = new Messages(HelpMessagesPos.X_POS, HelpMessagesPos.Y_POS, messageAttackPhase1, MessageType.HELP_MESSAGE, MessageState.APPEAR, 0.1, 0.2, null);
        const attackPhase2          = new Messages(HelpMessagesPos.X_POS, HelpMessagesPos.Y_POS, messageAttackPhase2, MessageType.HELP_MESSAGE, MessageState.APPEAR, 0.1, 0.2, null);
        const prepareEventPhase1    = new Messages(HelpMessagesPos.X_POS, HelpMessagesPos.Y_POS, messagePrepareEventPhase1, MessageType.HELP_MESSAGE, MessageState.APPEAR, 0.1, 0.2, null);
        const prepareEventPhase2    = new Messages(HelpMessagesPos.X_POS, HelpMessagesPos.Y_POS, messagePrepareEventPhase2, MessageType.HELP_MESSAGE, MessageState.APPEAR, 0.1, 0.2, null);
        const useEventPhase1        = new Messages(HelpMessagesPos.X_POS, HelpMessagesPos.Y_POS, messageUseEventPhase1, MessageType.HELP_MESSAGE, MessageState.APPEAR, 0.1, 0.2, null);
        const useEventPhase2        = new Messages(HelpMessagesPos.X_POS, HelpMessagesPos.Y_POS, messageUseEventPhase2, MessageType.HELP_MESSAGE, MessageState.APPEAR, 0.1, 0.2, null);
        const useEventPhase3        = new Messages(HelpMessagesPos.X_POS, HelpMessagesPos.Y_POS, messageUseEventPhase3, MessageType.HELP_MESSAGE, MessageState.APPEAR, 0.1, 0.2, null);

        const messages = [defaultPhase, discardPhase, movimentPhase1, movimentPhase2, attackPhase1, attackPhase2, prepareEventPhase1, prepareEventPhase2, useEventPhase1, useEventPhase2, useEventPhase3];

        this.helpMessage = messages;
    }

    addMessage(message){
        
        this.damageMessage.push(message);
    }
        
    activeMessage(text){

        const activeMessage = this.getMessage(text);
        
        if (this.previousHelpMessage != undefined && this.previousHelpMessage != this.activeHelpMessage){

            this.previousHelpMessage.state = MessageState.OFF;
        }

        if (activeMessage != undefined){

            this.previousHelpMessage = this.activeHelpMessage;
            this.activeHelpMessage = activeMessage;
            return true;
        }
    }

    getMessage(message){
        
        for (let i = 0; i < this.helpMessage.length; i++){

            const messageText = this.helpMessage[i];
            
            if (message[0] === messageText.message[0]){

                return messageText;
            }
        }
    }

    render(ctx, language){
          
        for (let i = 0; i < this.damageMessage.length; i++){

            const message = this.damageMessage[i];

            if (message != undefined){
                
                message.render(ctx);
                ctx.fillStyle = "black";
            }
        }

        if (this.activeHelpMessage != undefined){
            
            this.activeHelpMessage.render(ctx, language);
            ctx.fillStyle = "black";
        }
    }
}
