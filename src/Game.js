import Card from "./Cards/Card.js";
import { BoardId, BorderId, CardId, CardImageId, DecksId, GameState, GridId, IconsId, IconsPos, ImageTypes, LanguageId, RarityId, TypeId, TurnStates, SlotsState, TurnId, ButtonState } from "./constants.js";
import Board from "./Board.js";
import jsonArray from "../cards.js";
import Asset from "./Asset.js";
import globals from "./globals.js";
import CardFactory from "./Cards/CardFactory.js";
import DeckContainer from "./Cards/DeckContainer.js";
import TurnContainer from "./Turns/TurnContainer.js";
import Mouse from "./Mouse.js";
import Button from "./Button/Button.js";
import ButtonContainer from "./Button/ButtonContainer.js";
import MessagesContainer from "./MessagesContainer.js";
import EventContainer from "./Events/EventContainer.js";


export default class Game {

    constructor(turnArray, handsArray, images, cardsArray, boardMinionsArray, deckContainer, gridsArray, eventContainer, rarity,canvas, ctx, mouse, firstTurn, messagesContainer) {

        this.turnContainer = turnArray;
        this.handsArray = handsArray;
        this.images = images
        this.language = LanguageId.ENG
        this.cardsArray = cardsArray;
        this.boardMinionsArray = boardMinionsArray;
        this.deckContainer = deckContainer;
        this.gridsArray = gridsArray;
        this.eventContainer = eventContainer;
        this.turnCounter = 0;
        this.rarity = rarity;
        this.gameState = GameState.LOAD_GAME;
        this.canvas = canvas;
        this.ctx = ctx
        this.mouse = mouse;
        this.currentTurn = firstTurn;
        this.messagesContainer = messagesContainer;
    }

    static init(data, canvas, ctx) {

        const board = Board.initBoard(canvas);
        const assets = Asset.create();
        assets.loadImages(data);
        const cardImgs = assets.images
        const deckContainer = new DeckContainer();
        deckContainer.createDecks(data, cardImgs);

        const buttonContainer = ButtonContainer.create(ctx);

        const eventContainer = new EventContainer()
        const turns = new TurnContainer(board.grids, deckContainer, buttonContainer, eventContainer);
        const mouse = new Mouse(canvas);
        mouse.assignAddEventListeners();
        console.log(deckContainer.decks[DecksId.PLAYER_1_MINION_DECK].cards);
        console.log(deckContainer.decks[DecksId.PLAYER_2_MINION_DECK].cards);
        const messages = new MessagesContainer();
        
        const firstTurn = Math.floor(Math.random()*2);
        turns.CreateTurns(mouse, eventContainer);

        console.log(turns.turnContainer);

      

        return new Game(turns, null, assets, null, null, deckContainer, board, eventContainer, null, canvas, ctx, mouse, firstTurn, messages);
    }

    update() {
        switch (this.gameState) {

            case GameState.LOAD_GAME:
                for (let i = 0; i < 2; i++) {
                    this.assignCardsToHand(this.deckContainer.decks[DecksId.EVENT_DECK], this.deckContainer.decks[DecksId.PLAYER_1_HAND_DECK+i].cards);                      
                    this.turnContainer.turnContainer[i].mainCharacter.xPos = IconsPos.PLAYER_X[i]
                    this.turnContainer.turnContainer[i].mainCharacter.yPos = IconsPos.PLAYER_Y[i]
                }

                // Funcion que Spawnea los Minions en el tablero
                this.assignMinionsToBoardGrid(this.deckContainer.decks[DecksId.PLAYER_1_ACTIVE_MINION_DECK], this.deckContainer.decks[DecksId.PLAYER_2_ACTIVE_MINION_DECK], this.gridsArray.grids[GridId.BOARD_GRID]);

                this.turnContainer.turnContainer[this.currentTurn].handDeck.cards
                for (let i = 0; i < this.turnContainer.turnContainer[(this.currentTurn +1) %2].handDeck.cards.length; i++) {
                    const card = this.turnContainer.turnContainer[(this.currentTurn+1) %2].handDeck.cards[i];
                    card.state = CardId.BLOCKED
                }
                if (this.images.isLoaded) {
                    
                    this.gameState = GameState.PLAYING
                }
                
                break;

            case GameState.PLAYING:
                this.updateGame();
                this.deckContainer.updateScale(this.mouse)
                // this.deckContainer.updateDecks(this.mouse)
                this.turnContainer.turnContainer[this.currentTurn].update(this.mouse, this.turnContainer.turnContainer[(this.currentTurn+1)%2].activeMinionDeck, this.messagesContainer);

                this.gridsArray.update(this.mouse, this.deckContainer);
                this.mouse.update();
                this.turnContainer.buttonContainer.updateButtons(this.mouse);

                if(this.turnContainer.turnContainer[this.currentTurn].activeMinionDeck.cards.length === 0){
                    this.gameState = GameState.GAMEOVER
                }else{
                    if(this.turnContainer.turnContainer[this.currentTurn].finished){
                        this.turnContainer.turnContainer[this.currentTurn].finished = false
                        this.turnContainer.turnContainer[this.currentTurn].state = TurnStates.INITIALIZE;
                        this.currentTurn = (this.currentTurn + 1) % 2;
                        this.turnCounter++;
    
                    }
                    this.messagesContainer.update(this.ctx);
                }
                break;

            case GameState.GAMEOVER:
                console.log("gameover");
                break;

            default:

                break;
        }
    }

    render() {

        switch (this.gameState) {
            case GameState.LOAD_GAME:
                //draw load spinner
                break;

            case GameState.PLAYING:
                this.drawGame();
                this.turnContainer.render(this.ctx, this.language)
                this.turnContainer.buttonContainer.renderButtons();
                this.ctx.font         = "bold 30px Arial";
                this.ctx.fillText(this.mouse.x + "----------" + this.mouse.y, 100, 100);
                this.renderMessage();
                break;


            case GameState.GAMEOVER:
                this.ctx.font         = "bold 60px Arial";
                this.ctx.fillText(this.turnContainer.turnContainer[(this.currentTurn+1)%2].mainCharacter.name[LanguageId.ENG] + "  WON", 1000, 500);
                break;
            default:
                break;

        }
    }

    renderMessage(){

        for (let i = 0; i < this.messagesContainer.messages.length; i++){

            const message = this.messagesContainer.messages[i];

            this.ctx.font = "80px LongaIberica-DEMO";
            this.ctx.fillStyle = "red";
            this.ctx.globalAlpha = message.alpha;
            this.ctx.fillText(message.message, message.xPos, message.yPos);
            this.ctx.globalAlpha = 1.0;
        }    
        
        this.ctx.fillStyle = "black";
    }

    drawGame() {
        const images = this.images.images
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.fillText("FPS:" + 1 / globals.deltaTime, 30, 30);

        // Funcion para renderizar Board
        this.gridsArray.render(images, this.ctx, this.canvas, this.deckContainer)

    }

    updateGame() {
        
        // Funcion que roba las Cards del EventDeck y las asigna al HandDeck
        // this.assignMinionsToActiveMinionsDeck(this.deckContainer.decks[DecksId.PLAYER_1_MINION_DECK], this.deckContainer.decks[DecksId.PLAYER_1_ACTIVE_MINION_DECK].cards);
        // this.assignMinionsToActiveMinionsDeck(this.deckContainer.decks[DecksId.PLAYER_2_MINION_DECK], this.deckContainer.decks[DecksId.PLAYER_2_ACTIVE_MINION_DECK].cards);
        
        // Funcion que posiciona las Cards en la posicion de los Slots
        this.assignCardsToGrids(this.deckContainer.decks[DecksId.PLAYER_1_HAND_DECK], this.gridsArray.grids[GridId.PLAYER_1_HAND_GRID]);
        this.assignCardsToGrids(this.deckContainer.decks[DecksId.PLAYER_2_HAND_DECK], this.gridsArray.grids[GridId.PLAYER_2_HAND_GRID]);

        //this.updateTurns(); ---> test de cambio de turnos
    }

    // Funcion que roba las Cards del EventDeck y las asigna al HandDeck              
    assignCardsToHand(eventDeck, handDeck) {
        
        for (let i = handDeck.length; i < 5; i++) {
            handDeck.push(eventDeck.cards[eventDeck.cards.length - 1]);
            eventDeck.cards.pop();

        }

    }
    
    assignMinionsToActiveMinionsDeck(minionDeck, activeMinionDeck) {

        for (let i = activeMinionDeck.length; i < 3; i++) {
            
            for (let j = 0; j < minionDeck.cards.length; j++){
                
                if (minionDeck.cards[j].name[LanguageId.ENG] === "Villager"){

                    activeMinionDeck.push(minionDeck.cards[j]);
                    minionDeck.cards.splice(minionDeck.cards[j], 1);
                    break;
                }
            }
        }
    }

    assignMinionsToBoardGrid(player1ActiveMinionDeck, player2ActiveMinionDeck, boardGrid) {
        
        const decks = [player1ActiveMinionDeck, player2ActiveMinionDeck];

        let counter = 0;

        for (let i = 0; i < decks.length; i++) {

            counter = 0;

            const boardPos = i === 0 ? 4 : 0;

            for (let j = 0; j < decks[i].cards.length; j++){

                if (decks[i].cards[j] != undefined) {
                    
                    const card = decks[i].cards[j];
                    
                    card.xPos = boardGrid.slots[boardPos][2 + counter].xPos;
                    card.yPos = boardGrid.slots[boardPos][2 + counter].yPos;
                    card.size = BorderId.SMALL_SIZE;
                    counter++;
                }
            }
        }
    }
    
    assignCardsToGrids(decks, grids) {

        for (let i = 0; i < grids.slots.length; i++) {

            for (let j = 0; j < grids.slots[0].length; j++) {

                if (decks.cards[j]){

                    decks.cards[j].xPos = grids.slots[i][j].xPos;
                    decks.cards[j].yPos = grids.slots[i][j].yPos;
                    grids.slots[i][j].isEmpty = false;
                }
            }
        }
    }

    // mover a turncontainer 
    updateTurns(){
        this.turnChange();
    }   

    turnChange(){
        console.log(this.turnArray.turnContainer[0].active);

        setTimeout(() => {
            this.turnArray.turnContainer[0].active = true;
        }, 3000)

        if(this.turnArray.turnContainer[0].active){
            console.log("turno player 1");
            // turno player 1

        }else if(this.turnArray.turnContainer[1].active){

            // Turno player 2
            console.log("turno player 2");

        }
    }
}

