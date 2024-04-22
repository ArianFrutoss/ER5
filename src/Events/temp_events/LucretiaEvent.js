import Event from "../Event.js";

export default class LucretiaEvent extends Event {

    constructor(enemyActiveMinionDeck){
        super();

        this.enemyActiveMinionDeck  = enemyActiveMinionDeck; // Mazo de minions enemigos activos
    
    }

    // "When activating the hero's passive ability, -1pts is applied to all statistics of enemy minions."
    execute(){

        for(let i = 0; i < this.enemyActiveMinionDeck.cards.length; i++){
            const minion = this.enemyActiveMinionDeck.cards[i];

            // console.log(minion);
            // attack, defense, health, speed
            minion.attack   -= 1;
            minion.defense  -= 1;
            minion.health   -= 1;
            minion.speed    -= 1;
        }
    }


    remove(){
        for(let i = 0; i < this.enemyActiveMinionDeck.cards.length; i++){
            const minion = this.enemyActiveMinionDeck.cards[i];

            // console.log(minion);
            // attack, defense, health, speed
            minion.attack   += 1;
            minion.defense  += 1;
            minion.health   += 1;
            minion.speed    += 1;
        }
    }
    
}