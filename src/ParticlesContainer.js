import Particle from "./Particle.js";
import { ParticleState } from "./constants.js";

export default class ParticlesContainer{

    constructor(){

        this.particles      = [];
    }

    createMoviment(minionXPos, minionYPos, minionXSize, minionYSize, minionXV, minionYV){

        const numParticles  = 9;

        for (let i = 0; i < numParticles; i++){

            let xPos;
            let yPos;
            let xSize;
            let ySize;
            let rotate = 0;

            if (minionXV != 0 && minionYV != 0){

                xPos = minionXPos + minionXSize / 2;
                yPos = minionYPos + (minionYSize / (numParticles - 1)) * i;
                xSize = Math.random() * -30 - 20;
                ySize = 3;
                rotate = 45;

                if (minionXV > 0 && minionYV < 0 || minionXV < 0 && minionYV > 0){

                    rotate = 135;
                }
            } 
            
            else if (minionYV != 0){
                
                xPos = minionXPos + minionXSize / (numParticles - 1) * i;
                yPos = minionYPos + minionYSize / 2 + 35;
                xSize = 3;
                ySize = Math.random() * -30 - 20;
            } 
            
            else if (minionXV != 0){

                xPos = minionXPos + minionXSize / 2 + 35;
                yPos = minionYPos + minionYSize / (numParticles - 1) * i;
                xSize = Math.random() * -30 - 20;
                ySize = 3;
            }

            const timeInFade    = Math.random() * 1;
            const timeInOn      = Math.random() * 0.5;
            const timeInAppear  = 0.05;
            
            const particle = new Particle(xPos, yPos, xSize, ySize, ParticleState.APPEAR, minionXV, minionYV, timeInFade, timeInAppear, timeInOn, rotate);
            
            this.particles.push(particle);
        }
    }

    update(){

        for (let i = 0; i < this.particles.length; i++){

            const particle = this.particles[i];

            particle.update(this.particles);
        }
    }

    render(ctx){

        for (let i = 0; i < this.particles.length; i++){

            const particle = this.particles[i];

            particle.render(ctx);
        }
    }
}