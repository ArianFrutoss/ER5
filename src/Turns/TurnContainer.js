import Turn from "./Turn.js";
import { DecksId } from "../constants.js";

export default class TurnContainer {

    constructor(gridArray, deckContainer){

        this.turnContainer      = [];
        this.gridArray          = gridArray;
        this.deckContainer      = deckContainer;
        this.player1HandDeck    = deckContainer.decks[DecksId.PLAYER_1_HAND_DECK];
        this.player2HandDeck    = deckContainer.decks[DecksId.PLAYER_2_HAND_DECK];
        this.player1MinionDeck  = deckContainer.decks[DecksId.PLAYER_1_MINION_DECK];
        this.player2MinionDeck  = deckContainer.decks[DecksId.PLAYER_2_MINION_DECK];
        this.graveYardDeck      = deckContainer.decks[DecksId.GRAVEYARD_DECK];
        this.player1EventDeck   = deckContainer.decks[DecksId.EVENT_DECK];
        this.player2EventDeck   = deckContainer.decks[DecksId.EVENT_DECK];
        this.player1PreparingEventDeck = deckContainer.decks[DecksId.PLAYER_1_PREPARING_EVENT_DECK];
        this.player2PreparingEventDeck = deckContainer.decks[DecksId.PLAYER_2_PREPARING_EVENT_DECK];


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

        const turn1 = new Turn(this.gridArray, this.hero1, this.player1HandDeck, this.player1MinionDeck, this.graveYardDeck, this.player1EventDeck, this.player1PreparingEventDeck);
        turn1.createPhases();

        const turn2 = new Turn(this.gridArray, this.hero2, this.player2HandDeck, this.player2MinionDeck, this.graveYardDeck, this.player2EventDeck, this.player2PreparingEventDeck);
        turn2.createPhases();

        this.turnContainer = [turn1, turn2]; //player 1 pos 0, player 2 pos 1;
    }
    
}