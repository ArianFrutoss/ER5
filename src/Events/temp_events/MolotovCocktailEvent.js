import Event from "../Event.js";

export default class MolotovCokctailEvent extends Event {

    constructor(card, enemyHandeck){
        super();
        this.card         = card;
        this.enemyHandeck = enemyHandeck;
        this.active       = true;
    }

    execute(){
        // Eliminar dos cartas aleatorias de la mano enemiga
        if(this.card.durability === 0){
            return true;
        }

        this.card.durability -= 0.5;

        if(this.active){
            for(let i = 0; i < 2; i++){
                const random = Math.floor(Math.random() * this.enemyHandeck.cards.length);
    
                this.enemyHandeck.cards.splice(random, 1);
    
            }
            this.active = false;
        }
    }
}