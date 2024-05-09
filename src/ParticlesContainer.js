import Particle from "./Particle.js";
import { ParticleState } from "./constants.js";

export default class ParticlesContainer{

    constructor(){

        this.particles      = [];
    }

    createMoviment(minionXPos, minionYPos, minionXSize, mininionYSize){

        const numParticles  = 8;

        for (let i = 0; i < numParticles; i++){

            const xPos          = minionXPos + minionXSize / numParticles * i;
            const yPos          = minionYPos + mininionYSize / 2;
            const xSize         = 3;
            const ySize         = Math.random() * -30 - 20;
            const xSpeed        = 0;
            const ySpeed        = Math.random() * 20 + 30;

            const particle = new Particle(xPos, yPos, xSize, ySize, ParticleState.APPEAR, xSpeed, ySpeed, 0.05, 0.05, 0.05);
            
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