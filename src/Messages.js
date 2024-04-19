import globals from "./globals.js";
import { LanguageId, MessageState, MessageType } from "./constants.js";

export default class Messages{

    constructor(xPos, yPos, message, type, state, timeInFade, timeInAppear, timeInOn){

        this.xPos           = xPos;
        this.yPos           = yPos;
        this.message        = message;
        this.type           = type;
        this.state          = state;
        this.timeInFade     = timeInFade;
        this.timeInAppear   = timeInAppear;
        this.timeInOn       = timeInOn;
        this.alpha          = 0.0;
        this.fadeCounter    = 0;
        this.appearCounter  = 0;
        this.onCounter      = 0;
    }

    update(messages){
        switch (this.state){

            case MessageState.APPEAR:
                this.appearCounter += globals.deltaTime;
                this.alpha += 0.1;
                
                if (this.appearCounter > this.timeInAppear && this.alpha >= 1){
                    
                    this.appearCounter = 0;
                    this.state = MessageState.ON;
                }
                break;

            case MessageState.ON:
                this.onCounter += globals.deltaTime;
                
                if (this.onCounter > this.timeInOn && this.timeInOn != null){
                    
                    this.onCounter = 0;
                    this.state = MessageState.FADE;
                }
                break;
    
            case MessageState.FADE:
                this.fadeCounter += globals.deltaTime;
                this.alpha -= 0.1;
                
                if (this.fadeCounter > this.timeInFade){
                    
                    this.fadeCounter = 0;
                    this.state = MessageState.OFF;
                }
                break;
            
            case MessageState.OFF:
                this.alpha = 0.0;

                if (this.type === MessageType.DAMAGE_MESSAGE){

                    messages.splice(this, 1);
                }

                else{

                    this.state = MessageState.APPEAR;
                }
                break;
        }
    }

    render(ctx, language){

        switch (this.type){

            case MessageType.DAMAGE_MESSAGE:
                this.renderDamageMessage(ctx);
                break

            case MessageType.HELP_MESSAGE:
                this.renderHelpMessage(ctx, language);
                break

            default:
                break;
        }
    }

    renderDamageMessage(ctx){

        ctx.font = "80px LongaIberica-DEMO";
        ctx.fillStyle = "red";
        ctx.globalAlpha = this.alpha;
        ctx.fillText(this.message, this.xPos, this.yPos);
        ctx.globalAlpha = 1.0;
    }

    renderHelpMessage(ctx, language){
        
        ctx.font = "20px LongaIberica-DEMO";
        ctx.fillStyle = "white";
        ctx.globalAlpha = this.alpha;
        ctx.fillText(this.message[language], this.xPos, this.yPos);
        ctx.globalAlpha = 1.0;
    }
}