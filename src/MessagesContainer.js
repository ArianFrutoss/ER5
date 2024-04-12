import { LanguageId, MessageState } from "./constants.js";

export default class MessagesContainer{

    constructor(){

        this.messages = [];
    }

    update(){

        if (this.messages.length > 0){
            
            for (let i = 0; i < this.messages.length; i++){

                const message = this.messages[i];

                if (message != undefined){

                    message.update(this.messages);
                }
            }
        }
    }

    render(ctx, language){

        for (let i = 0; i < this.messages.length; i++){

            const message = this.messages[i];

            if (message != undefined){

                message.render(ctx, language);
                ctx.fillStyle = "black";
            }
        }    
    }
}
