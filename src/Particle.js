import { ParticleState } from "./constants";

export default class Particle{

    constructor(xPos, yPos, state, timeInFade, timeInAppear, timeInOn){

        this.xPos           = xPos;
        this.yPos           = yPos;
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

            case ParticleState.APPEAR:
                this.appearCounter += globals.deltaTime;
                this.alpha += 0.1;
                
                if (this.appearCounter > this.timeInAppear && this.alpha >= 1){
                    
                    this.appearCounter = 0;
                    this.state = ParticleState.ON;
                }
                break;

            case ParticleState.ON:
                this.onCounter += globals.deltaTime;
             
                if (this.onCounter > this.timeInOn && this.timeInOn != null){
                    
                    this.onCounter = 0;
                    this.state = ParticleState.FADE;
                }
                break;
    
            case ParticleState.FADE:
                this.fadeCounter += globals.deltaTime;
                this.alpha -= 0.1;
               
                if (this.fadeCounter > this.timeInFade){
                    
                    this.fadeCounter = 0;
                    this.state = ParticleState.OFF;
                }
                break;
            
            case ParticleState.OFF:

                this.alpha = 0.0;
                messages.splice(this, 1);
                break;
        }
    }
}