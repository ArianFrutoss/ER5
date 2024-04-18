import { MessageType } from "./constants.js";
import Messages from "./Messages.js";
import TextContainer from "./TextContainer.js";
import { HelpMessagesPos, MessageState } from "./constants.js";

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

        const textsContainer = TextContainer.createMessageText();
        const messages = [];

        for (let i = 0; i < textsContainer.texts.length; i++){

            const text = textsContainer.texts[i];
            const message = new Messages(HelpMessagesPos.X_POS, HelpMessagesPos.Y_POS, text, MessageType.HELP_MESSAGE, MessageState.APPEAR, 0.1, 0.2, null);
            messages.push(message);
        }

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
