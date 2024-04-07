import { MessageState } from "./constants.js";

export default class MessagesContainer{

    constructor(){

        this.messages = [];
    }

    update(ctx){

        if (this.messages.length > 0){
            
            for (let i = 0; i < this.messages.length; i++){

                const message = this.messages[i];
                message.update(this.messages);
                //message.render(ctx);
            }
        }
    }
    render(ctx){
            for (let i = 0; i < this.messages.length; i++){
                const message = this.messages[i];
                message.render(ctx)

            }    
            
            ctx.fillStyle = "black";
        }

}