import Particle from "./Particle.js";
import { BoardCardSizes, ImageTypes, ParticleId, ParticleState } from "./constants.js";

export default class ParticlesContainer{

    constructor(images){
        
        this.images         = images;
        this.particles      = [];
    }

    createMovement(minionXPos, minionYPos, minionXSize, minionYSize, minionXV, minionYV){

        const numParticles = 9;

        for (let i = 0; i < numParticles; i++){

            let xPos;
            let yPos;
            let xSize;
            let ySize;
            let rotate = 0;

            if (minionXV != 0 && minionYV != 0){

                xPos = minionXPos + minionXSize / 2;
                yPos = minionYPos + (minionYSize / (numParticles - 1)) * i;
                xSize = Math.random() * - 30 - 20;
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
                ySize = Math.random() * - 30 - 20;
            } 
            
            else if (minionXV != 0){

                xPos = minionXPos + minionXSize / 2 + 35;
                yPos = minionYPos + minionYSize / (numParticles - 1) * i;
                xSize = Math.random() * - 30 - 20;
                ySize = 3;
            }

            const timeInFade    = Math.random() * 1;
            const timeInOn      = Math.random() * 0.5;
            const timeInAppear  = 0.05;
            const color         = "rgba(191, 191, 191, 0.2)";
            
            const particle = new Particle(ParticleId.MOVIMENT, xPos, yPos, xSize, ySize, ParticleState.APPEAR, minionXV, minionYV, timeInFade, timeInAppear, timeInOn, rotate, color, null);
            
            this.particles.push(particle);
        }
    }

    createAttack(minionXPos, minionYPos, minionXSize, minionYSize){

        const numParticles = Math.floor(Math.random() * 3 + 1);

        for (let i = 0; i < numParticles; i++){

            let xPos;
            let yPos;
            let xSize;
            let ySize;
            let rotate;

            const image         = this.images.images[ImageTypes.PARTICLE][0];
            
            xPos                = minionXPos + minionXSize / 2;
            yPos                = minionYPos + minionYSize / 2;
            xSize               = image.width;
            ySize               = image.height;
            rotate              = Math.floor(Math.random() * 360);
            
            const timeInFade    = 0.05;
            const timeInOn      = 1;
            const timeInAppear  = 0.05;
            
            const particle = new Particle(ParticleId.ATTACK, xPos, yPos, 0, 0, ParticleState.APPEAR, 0, 0, timeInFade, timeInAppear, timeInOn, rotate, null, image);
            
            this.particles.push(particle);
        }
    }

    update(){

        for (let i = 0; i < this.particles.length; i++){

            const particle = this.particles[i];

            particle.update(this.particles);
        }
    }

    renderMovement(ctx){

        for (let i = 0; i < this.particles.length; i++){

            const particle = this.particles[i];

            if (particle.id === ParticleId.MOVIMENT){

                particle.render(ctx);
            }
        }
    }

    renderAttack(ctx){

        for (let i = 0; i < this.particles.length; i++){

            const particle = this.particles[i];

            if (particle.id === ParticleId.ATTACK){

                particle.render(ctx);
            }
        }
    }
}