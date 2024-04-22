import Event  from "../Event.js";

export default class XGScholarEvent extends Event {

    constructor(activeMinionDeck){
        super();
        this.activeMinionDeck   = activeMinionDeck;
    }

    // Stares at an ally, granting them 2 extra health points and 2 attack points permanently.
    execute(){
        for(let i = 0; i < this.activeMinionDeck.cards.length; i++){

            const minion = this.activeMinionDeck.cards[i];

            minion.health += 2;
            minion.attack += 2;
        }
    }
}