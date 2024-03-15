import Turn from "./Turn.js";
import { DecksId } from "../constants.js";

export default class TurnContainer {

    constructor(gridArray, deckContainer){

        this.turnContainer      = [];
        this.gridArray          = gridArray;
        this.deckContainer      = deckContainer;
    }

    selectRandomHero(heroDeck)
    {

        const deckLength = heroDeck.length;

        const randomIndex = Math.floor(Math.random() * deckLength);

        const randomCard = heroDeck[randomIndex];

        return randomCard;
    
    }


    CreateTurns()
    {
        let hero1 = {};
        let hero2 = {};
        
        do {
            hero1 = this.selectRandomHero(this.deckContainer.decks[DecksId.MAIN_CHARACTER_DECK].cards);
            hero2 = this.selectRandomHero(this.deckContainer.decks[DecksId.MAIN_CHARACTER_DECK].cards);
        } while (hero1 === hero2);

        console.log(hero1)
        console.log(hero2)
        const player1HandDeck           = this.deckContainer.decks[DecksId.PLAYER_1_HAND_DECK];
        const player2HandDeck           = this.deckContainer.decks[DecksId.PLAYER_2_HAND_DECK];
        const player1MinionDeck         = this.deckContainer.decks[DecksId.PLAYER_1_MINION_DECK];
        const player2MinionDeck         = this.deckContainer.decks[DecksId.PLAYER_2_MINION_DECK];
        const graveYardDeck             = this.deckContainer.decks[DecksId.GRAVEYARD_DECK];
        const eventDeck                 = this.deckContainer.decks[DecksId.EVENT_DECK];
        const player1PreparingEventDeck = this.deckContainer.decks[DecksId.PLAYER_1_PREPARING_EVENT_DECK];
        const player2PreparingEventDeck = this.deckContainer.decks[DecksId.PLAYER_2_PREPARING_EVENT_DECK];
        const player1ActiveMinionDeck   = this.deckContainer.decks[DecksId.PLAYER_1_ACTIVE_MINION_DECK];
        const player2ActiveMinionDeck   = this.deckContainer.decks[DecksId.PLAYER_2_ACTIVE_MINION_DECK];

        const turn1 = new Turn(this.gridArray, hero1, player1HandDeck, player1MinionDeck, graveYardDeck, eventDeck, player1PreparingEventDeck, player1ActiveMinionDeck);
        turn1.createPhases();

        const turn2 = new Turn(this.gridArray, hero2, player2HandDeck, player2MinionDeck, graveYardDeck, eventDeck, player2PreparingEventDeck, player2ActiveMinionDeck);
        turn2.createPhases();

        this.turnContainer = [turn1, turn2]; //player 1 pos 0, player 2 pos 1;
    }
    

}