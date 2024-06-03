import { ParticleId, ParticleState } from "./constants.js";
import globals from "./globals.js";

export default class Particle{

    constructor(id, xPos, yPos, xSize, ySize, state, xSpeed, ySpeed, timeInFade, timeInAppear, timeInOn, rotate, color, image){

        this.id             = id;
        this.xPos           = xPos;
        this.yPos           = yPos;
        this.xSize          = xSize;
        this.ySize          = ySize;
        this.state          = state;
        this.xSpeed         = xSpeed;
        this.ySpeed         = ySpeed;
        this.timeInFade     = timeInFade;
        this.timeInAppear   = timeInAppear;
        this.timeInOn       = timeInOn;
        this.alpha          = 0.0;
        this.fadeCounter    = 0;
        this.appearCounter  = 0;
        this.onCounter      = 0;
        this.rotate         = rotate;
        this.color          = color;
        this.image          = image;
    }

    update(particles){
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
                particles.splice(this, 1);
                break;
        }

        this.xPos -= this.xSpeed * globals.deltaTime;
        this.yPos -= this.ySpeed * globals.deltaTime;
    }

    render(ctx){

        ctx.save();

        ctx.translate(this.xPos + this.xSize / 2, this.yPos + this.ySize / 2);
    
        ctx.rotate(this.rotate * Math.PI / 180);
    
        if (this.id === ParticleId.MOVIMENT){

            ctx.globalAlpha = this.alpha;
            ctx.fillStyle = this.color;
            ctx.fillRect(-this.xSize / 2, -this.ySize / 2, this.xSize, this.ySize);
            ctx.globalAlpha = 1.0;
        } 

        else{
            
            ctx.drawImage(this.image, -this.image.width / 2, -this.image.height / 2);
        }
    
        ctx.restore();
    }
    
}