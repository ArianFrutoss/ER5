import Card from "./Cards/Card.js";
import { BoardId, BorderId, CardId, CardImageId, DecksId, GameState, GridId, IconsId, IconsPos, ImageTypes, LanguageId, RarityId, TypeId, TurnStates, SlotsState, TurnId, ButtonState, TimerId, PhaseStates, BaseURL, BaseURLValue } from "./constants.js";
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
import TimerContainer from "./TimerContainer.js";

export default class Game {

    constructor(turnArray, handsArray, images, language, cardsArray, boardMinionsArray, deckContainer, gridsArray, eventContainer, rarity,canvas, ctx, mouse, firstTurn, messagesContainer, timerContainer) {

        this.turnContainer = turnArray;
        this.handsArray = handsArray;
        this.images = images
        this.language = language;
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
        this.timerContainer = timerContainer;
        this.finished = false;
    }

    static init(data, canvas, ctx, language) {

        const board = Board.initBoard(canvas);
        const assets = Asset.create();
        assets.loadImages(data);
        const cardImgs = assets.images
        const deckContainer = new DeckContainer();
        const eventContainer = new EventContainer()
        deckContainer.createDecks(data, cardImgs, language);

        const buttonContainer = ButtonContainer.create(ctx, assets.images[ImageTypes.BUTTON][0]);

        const turns = new TurnContainer(board, deckContainer, buttonContainer, eventContainer);
        const mouse = new Mouse(canvas);
        mouse.assignAddEventListeners();
        const messages = new MessagesContainer();
        messages.createHelpMessages();
        
        const firstTurn = Math.floor(Math.random()*2);
        turns.CreateTurns(mouse, eventContainer);

        console.log(turns.turnContainer);
        
        const timerContainer = new TimerContainer();
        timerContainer.create();
       
        return new Game(turns, null, assets, language, null, null, deckContainer, board, eventContainer, null, canvas, ctx, mouse, firstTurn, messages, timerContainer);
    }

    update() {
        switch (this.gameState) {

            case GameState.LOAD_GAME:
                for (let i = 0; i < 2; i++) {
                    this.assignCardsToHand(this.deckContainer.decks[DecksId.EVENT_DECK], this.deckContainer.decks[DecksId.PLAYER_1_HAND_DECK+i]);                      
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
                const turn = this.turnContainer.turnContainer[this.currentTurn];
                const enemyTurn = this.turnContainer.turnContainer[(this.currentTurn+1)%2];
                
                this.assignCardsToGrids(turn.handDeck, this.gridsArray.grids[GridId.PLAYER_1_HAND_GRID])
                this.assignCardsToGrids(turn.preparingEventDeck, this.gridsArray.grids[GridId.PLAYER_1_EVENT_GRID])
                turn.phasesArray[PhaseStates.PREPARE_EVENT].setEventGrid(this.gridsArray.grids[GridId.PLAYER_1_EVENT_GRID])
                turn.phasesArray[PhaseStates.USE_EVENT_CARD].setEventGrid(this.gridsArray.grids[GridId.PLAYER_1_EVENT_GRID])
        
                this.assignCardsToGrids(enemyTurn.handDeck, this.gridsArray.grids[GridId.PLAYER_2_HAND_GRID])
                this.assignCardsToGrids(enemyTurn.preparingEventDeck, this.gridsArray.grids[GridId.PLAYER_2_EVENT_GRID])
                enemyTurn.phasesArray[PhaseStates.PREPARE_EVENT].setEventGrid(this.gridsArray.grids[GridId.PLAYER_2_EVENT_GRID])
                enemyTurn.phasesArray[PhaseStates.USE_EVENT_CARD].setEventGrid(this.gridsArray.grids[GridId.PLAYER_2_EVENT_GRID])

                if (this.currentTurn === 1) {
                    this.rotateBoardMinions()
                    this.rotateMainCharacters()
                }

                if (this.images.isLoaded) {
                    
                    this.gameState = GameState.PLAYING
                }
                
                break;

            case GameState.PLAYING:
                this.updateGame();
                this.deckContainer.updateScale(this.mouse)
                // this.deckContainer.updateDecks(this.mouse)
                this.turnContainer.turnContainer[this.currentTurn].update(this.mouse, this.turnContainer.turnContainer[(this.currentTurn+1)%2].activeMinionDeck, this.messagesContainer, this.timerContainer);
                
                this.mouse.update();
                this.turnContainer.buttonContainer.updateButtons(this.mouse);
                

                if(this.turnContainer.turnContainer[this.currentTurn].activeMinionDeck.cards.length + 
                   this.turnContainer.turnContainer[this.currentTurn].minionDeck.cards.length === 0){
                    this.gameState = GameState.SEND_DATA;
                }else{
                    if(this.turnContainer.turnContainer[this.currentTurn].finished){
                        this.turnContainer.turnContainer[this.currentTurn].finished = false
                        this.turnContainer.turnContainer[this.currentTurn].state = TurnStates.INITIALIZE;
                        
                        this.currentTurn = (this.currentTurn + 1) % 2;
                        this.setTurnDecksPositions()
                        this.turnCounter++;
    
                    }
                    this.messagesContainer.update();
                }
            
                break;

            case GameState.GAMEOVER:
                console.log("gameover");
                if(this.finished){
                    window.location.reload();
                }
                break;
            
            case GameState.SEND_DATA:
                
                this.sendStatsData();
                this.gameState = GameState.GAMEOVER;
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
                this.renderGame();
                break;


            case GameState.GAMEOVER:
                this.ctx.font         = "bold 60px Arial";
                // this.ctx.fillText(this.turnContainer.turnContainer[(this.currentTurn+1)%2].mainCharacter.name[LanguageId.ENG] + "  WON", 1000, 500);
                break;
            default:
                break;

        }
    }

    renderGame() {
        
        const images = this.images.images
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // Funcion para renderizar Board
        this.gridsArray.render(images, this.ctx, this.canvas, this.deckContainer, this.currentTurn);
        this.turnContainer.buttonContainer.renderButtons(this.language);
        this.turnContainer.render(this.ctx, this.language, this.mouse, this.currentTurn);
        this.messagesContainer.render(this.ctx, this.language);
        this.timerContainer.render(this.ctx)
    }

    updateGame() {
        // console.log(this.eventContainer.events);
        // Funcion que roba las Cards del EventDeck y las asigna al HandDeck
        // this.assignMinionsToActiveMinionsDeck(this.deckContainer.decks[DecksId.PLAYER_1_MINION_DECK], this.deckContainer.decks[DecksId.PLAYER_1_ACTIVE_MINION_DECK].cards);
        // this.assignMinionsToActiveMinionsDeck(this.deckContainer.decks[DecksId.PLAYER_2_MINION_DECK], this.deckContainer.decks[DecksId.PLAYER_2_ACTIVE_MINION_DECK].cards);
        
        // Funcion que posiciona las Cards en la posicion de los Slots
        const turn = this.turnContainer.turnContainer[this.currentTurn];
        const enemyTurn = this.turnContainer.turnContainer[(this.currentTurn+1)%2];


        this.assignCardsToGrids(turn.handDeck, this.gridsArray.grids[GridId.PLAYER_1_HAND_GRID])
        this.assignCardsToGrids(enemyTurn.handDeck, this.gridsArray.grids[GridId.PLAYER_2_HAND_GRID])


        //this.updateTurns(); ---> test de cambio de turnos
    }

    // Funcion que roba las Cards del EventDeck y las asigna al HandDeck              
    assignCardsToHand(eventDeck, handDeck) {
        for (let i = handDeck.cards.length; i < 5; i++) {
            const card = eventDeck.cards[eventDeck.cards.length - 1 ]
            if (card.id === CardImageId.JOSEPH) {
                i--
                eventDeck.shuffle()
            }else{
                handDeck.cards.push(card);
                card.deck = handDeck
                eventDeck.cards.pop();
            }
            
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
        let k = 0
        for (let i = 0; i < grids.slots.length; i++) {

            for (let j = 0; j < grids.slots[0].length; j++) {

                if (decks.cards[k]){

                    decks.cards[k].xPos = grids.slots[i][j].xPos;
                    decks.cards[k].yPos = grids.slots[i][j].yPos;
                    grids.slots[i][j].isEmpty = false;
                    k++
                }
                
            }
        }
    }


    setTurnDecksPositions(){
        
        const turn = this.turnContainer.turnContainer[this.currentTurn];
        const enemyTurn = this.turnContainer.turnContainer[(this.currentTurn+1)%2];
        this.gridsArray.grids[GridId.PLAYER_2_EVENT_GRID].freeSlots()
        enemyTurn.phasesArray[PhaseStates.PREPARE_EVENT].setEventGrid(this.gridsArray.grids[GridId.PLAYER_2_EVENT_GRID])
        enemyTurn.phasesArray[PhaseStates.USE_EVENT_CARD].setEventGrid(this.gridsArray.grids[GridId.PLAYER_2_EVENT_GRID])
        this.assignCardsToGrids(enemyTurn.handDeck, this.gridsArray.grids[GridId.PLAYER_2_HAND_GRID])
        this.assignCardsToGrids(enemyTurn.preparingEventDeck, this.gridsArray.grids[GridId.PLAYER_2_EVENT_GRID])
        
        this.gridsArray.grids[GridId.PLAYER_1_EVENT_GRID].freeSlots()
        turn.phasesArray[PhaseStates.PREPARE_EVENT].setEventGrid(this.gridsArray.grids[GridId.PLAYER_1_EVENT_GRID])
        turn.phasesArray[PhaseStates.USE_EVENT_CARD].setEventGrid(this.gridsArray.grids[GridId.PLAYER_1_EVENT_GRID])
        this.assignCardsToGrids(turn.handDeck, this.gridsArray.grids[GridId.PLAYER_1_HAND_GRID])
        this.assignCardsToGrids(turn.preparingEventDeck, this.gridsArray.grids[GridId.PLAYER_1_EVENT_GRID])

        this.rotateBoardMinions()
        this.rotateMainCharacters()

    }

    rotateBoardMinions(){
        const minionCards = this.deckContainer.decks[DecksId.PLAYER_1_ACTIVE_MINION_DECK].cards
        const enemyMinionCards = this.deckContainer.decks[DecksId.PLAYER_2_ACTIVE_MINION_DECK].cards
        let positions = []
        let enemyPositions = []

            for (let i = 0; i < this.gridsArray.grids[GridId.BOARD_GRID].slots.length; i++) {
                const row = this.gridsArray.grids[GridId.BOARD_GRID].slots[i]
                for (let k = 0; k < minionCards.length; k++) {
                    const card = minionCards[k];
                    if (card.yPos === row[0].yPos) {
                        positions[k] = i
                    }
                
            }
                for (let k = 0; k < enemyMinionCards.length; k++) {
                    const card = enemyMinionCards[k];
                    if (card.yPos === row[0].yPos) {
                        enemyPositions[k] = i
                    }
                    
            }    
            
        }

        for (let i = 0; i < positions.length; i++) {
            const position = positions[i];
            const card = minionCards[i]
            this.setRotationPos(card, position)
        }
        for (let i = 0; i < enemyPositions.length; i++) {
            const enemyPosition = enemyPositions[i]
            const enemyCard = enemyMinionCards[i]
            this.setRotationPos(enemyCard, enemyPosition)
        }
    }

    rotateMainCharacters(){
        const turn = this.turnContainer.turnContainer[this.currentTurn];
        const enemyTurn = this.turnContainer.turnContainer[(this.currentTurn+1)%2];

        const xTemp = turn.mainCharacter.xPos
        const yTemp = turn.mainCharacter.yPos

        turn.mainCharacter.xPos = enemyTurn.mainCharacter.xPos
        turn.mainCharacter.yPos = enemyTurn.mainCharacter.yPos

        enemyTurn.mainCharacter.xPos = xTemp
        enemyTurn.mainCharacter.yPos = yTemp
    }
    setRotationPos(card, position){
        const rows = this.gridsArray.grids[GridId.BOARD_GRID].slots
        switch (position) {
            case 0:
                card.yPos = rows[4][0].yPos
                break;

            case 1:
                card.yPos = rows[3][0].yPos
                break;

            case 3:
                card.yPos = rows[1][0].yPos
                break;

            case 4:
                card.yPos = rows[0][0].yPos
                break;
            default:
                break;
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

    sendStatsData(){
        const player1 = this.turnContainer.turnContainer[0];
        const player2 = this.turnContainer.turnContainer[1];

        const p1DoneDamage = player1.damageDone;
        const p2DoneDamage = player2.damageDone;
        const p1MeleHits   = player1.meleHits;
        const p1RangeHits  = player1.rangeHits;
        const p2MeleHits   = player2.meleHits;
        const p2RangeHits  = player2.rangeHits;

        const p1MongoId    = localStorage.getItem("mongo_id");
        const enemies      = JSON.parse(localStorage.getItem("opponents"));
        const p2MongoId    = enemies[localStorage.index].mongo_id;

        const player1hp    = player1.minionDeck.cards.length + player1.activeMinionDeck.cards.length;
    
        const winner = player1hp > 0 ? p1MongoId : p2MongoId;
        const loser  = player1hp === 0 ? p1MongoId : p2MongoId;
        

        const game = {
            players: [
                {
                    player_id: p1MongoId,
                    meleeHits: p1MeleHits,
                    rangedHits: p1RangeHits,
                    damageDone: p1DoneDamage,
                    damageReceived: p2DoneDamage
                },
                {
                    player_id: p2MongoId,
                    meleeHits: p2MeleHits,
                    rangedHits: p2RangeHits,
                    damageDone: p2DoneDamage,
                    damageReceived: p1DoneDamage
                },
            
            ],
            winner: winner,
            loser: loser
        }

        console.log(JSON.stringify(game));
        
        fetch(`http://localhost:4000/newGame`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(game)
            
        })
        .then((res) => {
            this.finished = true;
        })
    }

    
}

