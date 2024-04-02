import globals from "./globals.js";
import { MessageState } from "./constants.js";

export default class Messages{

    constructor(xPos, yPos, message, state, timeToFade, timeToAppear, timeInOn, alpha){

        this.xPos           = xPos;
        this.yPos           = yPos;
        this.message        = message;
        this.state          = state;
        this.timeToFade     = timeToFade;
        this.timeToAppear   = timeToAppear;
        this.timeInOn       = timeInOn;
        this.alpha          = alpha;
        this.fadeCounter    = 0;
        this.appearCounter  = 0;
        this.onCounter      = 0;
    }

    update(messages){

        switch (this.state){

            case MessageState.APPEAR:
                
                this.appearCounter += globals.deltaTime;
                this.alpha += 0.2;

                if (this.appearCounter > this.timeToAppear){
                    
                    this.appearCounter = 0;
                    this.state = MessageState.ON;
                }
                break;

            case MessageState.ON:

                this.onCounter += globals.deltaTime;
                
                if (this.onCounter > this.timeInOn){
                    
                    this.onCounter = 0;
                    this.state = MessageState.FADE;
                }
                break;
    
            case MessageState.FADE:
                
                this.fadeCounter += globals.deltaTime;
                this.alpha -= 0.2;
                
                if (this.fadeCounter > this.timeToFade){
                    
                    this.fadeCounter = 0;
                    this.state = MessageState.OFF;
                }
                break;
            
            case MessageState.OFF:
                
                this.alpha = 0.0;
                messages.splice(this, 1);
                break;
        }
    }

    

    render(ctx){

        ctx.font = "80px LongaIberica-DEMO";
        ctx.fillStyle = "red";
        ctx.globalAlpha = this.alpha;
        ctx.fillText(this.message, this.xPos, this.yPos);
        ctx.globalAlpha = 1.0;
    }
}