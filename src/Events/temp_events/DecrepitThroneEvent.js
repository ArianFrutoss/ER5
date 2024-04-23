import Event from "../Event.js";

export default class DecrepitThroneEvent extends Event{

    constructor(enemyActiveMinionDeck, activeMinionDeck){
        super();

        this.enemyActiveMinionDeck  = enemyActiveMinionDeck;
        this.activeMinionDeck       = activeMinionDeck;
        this.minion                 = null;
    }

    // Possesses an enemy minion, turning it into an ally until the end of the turn and granting it +3 attack and +1 speed until the end of the turn.
    execute(){

        const randomMinion = Math.floor(Math.random() * 3);
        
        this.minion = this.enemyActiveMinionDeck.cards[randomMinion];
        this.activeMinionDeck.cards.push(this.minion);
        this.enemyActiveMinionDeck.cards.splice(randomMinion, 1);

        // Apply the effect
        this.minion.attack += 3;
        this.minion.speed  += 1;
    }

    remove(){
        this.minion.attack -= 3;
        this.minion.speed  -= 1;

        this.activeMinionDeck.cards.pop();

        this.enemyActiveMinionDeck.cards.push(this.minion);
    }
}