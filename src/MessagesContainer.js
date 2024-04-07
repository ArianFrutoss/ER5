import { MessageState } from "./constants.js";

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

    render(ctx){

        for (let i = 0; i < this.messages.length; i++){

            const message = this.messages[i];

            if (message != undefined){

                message.render(ctx);
                ctx.fillStyle = "black";
            }
        }    
    }
}
