import Card from "./Cards/Card.js";
import { BoardId, BorderId, CardId, CardImageId, DecksId, GameState, GridId, IconsId, IconsPos, ImageTypes, LanguageId, RarityId, TypeId, TurnStates, SlotsState, TurnId } from "./constants.js";
import Board from "./Board.js";
import jsonArray from "../cards.js";
import Asset from "./Asset.js";
import globals from "./globals.js";
import CardFactory from "./Cards/CardFactory.js";
import DeckContainer from "./Cards/DeckContainer.js";
import TurnContainer from "./Turns/TurnContainer.js";
import Mouse from "./Mouse.js";
import { canvasMousemoveHandler, mouseDown, mouseUp } from "./mouseEvent.js";


export default class Game {

    constructor(turnArray, handsArray, images, cardsArray, boardMinionsArray, deckContainer, gridsArray, activeEventsArray, rarity,canvas, ctx, mouse, firstTurn) {

        this.turnContainer = turnArray;
        this.handsArray = handsArray;
        this.images = images
        this.language = LanguageId.ENG
        this.cardsArray = cardsArray;
        this.boardMinionsArray = boardMinionsArray;
        this.deckContainer = deckContainer;
        this.gridsArray = gridsArray;
        this.activeEventsArray = activeEventsArray;
        this.turnCounter = 0;
        this.rarity = rarity;
        this.gameState = GameState.LOAD_GAME;
        this.canvas = canvas;
        this.ctx = ctx
        this.mouse = mouse;
        this.currentTurn = firstTurn
        
    }

    static init(data, canvas, ctx) {

        const board = Board.initBoard(canvas);
        const assets = Asset.create();
        assets.loadImages(data);
        const deckContainer = new DeckContainer();
        deckContainer.createDecks(data);

        const turns = new TurnContainer(board.grids, deckContainer);
        
        const mouse = new Mouse(canvas);
        mouse.assignAddEventListeners();
        
  
        const firstTurn = Math.floor(Math.random()*2)
        turns.CreateTurns(mouse);
        console.log();
        console.log(turns.turnContainer);
 
        // turns.turnContainer[0].showPlayerData();
        // turns.turnContainer[1].showPlayerData();

        return new Game(turns, null, assets, null, null, deckContainer, board, null, null, canvas, ctx, mouse, firstTurn);
    }

    update() {

        switch (this.gameState) {

            case GameState.LOAD_GAME:
                for (let i = 0; i < 2; i++) {
                    this.assignCardsToHand(this.deckContainer.decks[DecksId.EVENT_DECK], this.deckContainer.decks[DecksId.PLAYER_1_HAND_DECK+i].cards);                      
                    this.turnContainer.turnContainer[i].mainCharacter.xPos = IconsPos.PLAYER_X[i]
                    this.turnContainer.turnContainer[i].mainCharacter.yPos = IconsPos.PLAYER_Y[i]
                }
                if (this.images.isLoaded) {
                    
                    this.gameState = GameState.PLAYING
                }
                
                break;

            case GameState.PLAYING:
                this.updateGame();

                this.deckContainer.updateDecks(this.mouse)
                this.turnContainer.turnContainer[this.currentTurn].mainCharacter.update(this.mouse, this.deckContainer.decks[DecksId.MAIN_CHARACTER_DECK])
                this.turnContainer.turnContainer[(this.currentTurn+1)%2].mainCharacter.update(this.mouse, this.deckContainer.decks[DecksId.MAIN_CHARACTER_DECK])
                this.turnContainer.turnContainer[this.currentTurn].update()
                this.updateAllGrids()
                // this.gridsArray.grids[GridId.BOARD_GRID].update(this.mouse);
                this.mouse.update()
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
                this.drawAllCards();

                this.ctx.font         = "bold 30px Arial";
                this.ctx.fillText(this.mouse.x + "----------" + this.mouse.y, 100, 100);
                this.ctx.fillText("Click Derecho: " + this.mouse.rightClick + "--------" + "Click Izquierdo: " + this.mouse.leftClick, 100, 150);  
                break;

            default:
                break;

        }
    }

    updateAllGrids(){
        for (let i = 0; i < this.gridsArray.grids.length; i++) {
            const grid = this.gridsArray.grids[i];
            // this.gridsArray.grids[GridId.BOARD_GRID].update(this.mouse);
            grid.update(this.mouse)
            
        }
    }
    drawGame() {
        const images = this.images.images
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.fillText("FPS:" + 1 / globals.deltaTime, 30, 30);

        // Funcion para renderizar los Grids
        this.renderBoard(images);

        // Funcion para renderizar los Grids
        this.renderGrids();

        this.renderHeroes()

    }

    renderBoard(images) {

        this.ctx.font = "30px LongaIberica-DEMO";
        

        let image = images[ImageTypes.BOARD_IMAGE][BoardId.BOARD];
        let xPos = 0;
        let yPos = 0;

        this.ctx.drawImage(

            image, xPos, yPos
        )

        image = images[ImageTypes.BOARD_IMAGE][BoardId.EVENT_DECK_FULL];
        xPos = 25;
        yPos = this.canvas.height / 2 - image.height / 2;

        this.ctx.drawImage(

            image, xPos, yPos
        )

        image = images[ImageTypes.BOARD_IMAGE][BoardId.MINION_DECK_FULL];
        xPos = 75;
        yPos = 12;

        this.ctx.drawImage(

            image, xPos, yPos
        )

        image = images[ImageTypes.BOARD_IMAGE][BoardId.MINION_DECK_HALF];
        xPos = 75;
        yPos = 872;

        this.ctx.drawImage(

            image, xPos, yPos
        )

        image = images[ImageTypes.BOARD_IMAGE][BoardId.GEM];
        xPos = 295;
        yPos = 55;

        this.ctx.drawImage(

            image, xPos, yPos
        )

        this.ctx.fillText(this.deckContainer.decks[DecksId.PLAYER_1_MINION_DECK].cards.length, image.width / 2 + xPos, image.height / 2 + yPos);

        image = images[ImageTypes.BOARD_IMAGE][BoardId.GEM];
        xPos = 295;
        yPos = 925;

        this.ctx.drawImage(

            image, xPos, yPos
        )

        this.ctx.fillText(this.deckContainer.decks[DecksId.PLAYER_2_MINION_DECK].cards.length, image.width / 2 + xPos, image.height / 2 + yPos);

        image = images[ImageTypes.GAME_RARITY][RarityId.COMMON];
        xPos = 1595;
        yPos = 20;

        this.ctx.drawImage(

            image, xPos, yPos
        )



    }

    renderHeroes(){
        
        //Hero Render
        const hero = this.turnContainer.turnContainer[this.currentTurn].mainCharacter
        const enemyTurn = (this.currentTurn+1) % 2
        const enemy = this.turnContainer.turnContainer[enemyTurn].mainCharacter
        const images = this.images.images
        this.drawCard(images, hero, IconsPos.PLAYER_X[this.currentTurn], IconsPos.PLAYER_Y[this.currentTurn])
        this.ctx.fillText(hero.name[this.language],IconsPos.PLAYER_NAME_X[this.currentTurn], IconsPos.PLAYER_NAME_Y[this.currentTurn])

        this.drawCard(images, enemy, IconsPos.PLAYER_X[(this.currentTurn+1)%2], IconsPos.PLAYER_Y[(this.currentTurn+1)%2])
        this.ctx.fillText(enemy.name[this.language],IconsPos.PLAYER_NAME_X[(this.currentTurn+1)%2], IconsPos.PLAYER_NAME_Y[(this.currentTurn+1)%2])

    }
    renderGrids() {

        // Cantidad de Grids que se van a renderizar
        const gridsLength = this.gridsArray.grids.length;

        for (let i = 0; i < gridsLength; i++) {

            // Numero de filas y comumnas de los Slots
            const rows = this.gridsArray.grids[i].slots.length;
            const columns = this.gridsArray.grids[i].slots[0].length;

            for (let j = 0; j < rows; j++) {

                for (let k = 0; k < columns; k++) {

                    const slot = this.gridsArray.grids[i].slots[j][k];

                    // Posicion y tamaño de los Slots
                    const slotsXPos = slot.xPos;
                    const slotsYPos = slot.yPos;
                    const slotsXSize = slot.xSize - 2;
                    const slotsYSize = slot.ySize - 2;

                    if (slot.state === SlotsState.SELECTED){
                        
                        this.ctx.fillStyle = "white"
                    }

                    else if (slot.state === SlotsState.HOVER){
                        
                        this.ctx.fillStyle = "purple"
                    }

                    else{
                        
                        this.ctx.fillStyle = "black"
                    }

                    this.ctx.fillRect(slotsXPos, slotsYPos, slotsXSize, slotsYSize);
                }
            }
        }
    }

    drawAllCards() {
        for (let i = 2; i < 8; i++) {
            const deck = this.deckContainer.decks[i];
            
                for (let j = 0; j < deck.cards.length; j++) {
                    const card = deck.cards[j];
                    this.drawCard(this.images.images, card, card.xPos , card.yPos )
            
                
            }

        }

    }

    drawCard(images, card, xPos, yPos) {
        this.ctx.font = "25px LongaIberica-DEMO";

        //CARD IMAGE
        let size = card.size
        if (card.state === CardId.SCALED ) {
            xPos = 800
            yPos = 300
            size = CardId.BIG_SIZE
            
        }


        this.ctx.drawImage(
            images[ImageTypes.CARD_IMAGE][size][card.id - 1],                 //Img File
            xPos,yPos                    //X & Y Position Source
            )
            
            
            // BORDER
            this.ctx.drawImage(
                images[ImageTypes.CARD_BORDER][size],
                xPos, yPos)
                if (size === BorderId.NORMAL_SIZE) {
                    this.ctx.font = "25px LongaIberica-DEMO";
                    this.ctx.fillText(card.name[this.language], IconsPos.NAME_X + xPos, IconsPos.NAME_Y + yPos);
                    this.ctx.font = "15px LongaIberica-DEMO";
                    this.ctx.fillText(card.description[this.language], IconsPos.DESCRIPTION_X + xPos, IconsPos.DESCRIPTION_Y + yPos);
                    this.ctx.font = "25px LongaIberica-DEMO";
                    
                    //CATEGORY ICON
                    this.ctx.drawImage(
                        images[ImageTypes.CARD_TYPE][card.category],
                        IconsPos.CATEGORY_X + xPos, IconsPos.CATEGORY_Y + yPos)
                }
        //RARITY ICON
        this.ctx.drawImage(
            images[ImageTypes.CARD_RARITY][card.rarity],
            IconsPos.RARITY_X[size] + xPos, IconsPos.RARITY_Y[size] + yPos)


        switch (card.category) {
            case TypeId.MINION:
                //STAT ICONS
                this.ctx.drawImage(
                    images[ImageTypes.CARD_ICONS][IconsId.DEFENSE],
                    IconsPos.FIRST_ICON_X[size] + xPos, IconsPos.FIRST_ICON_Y[size] + yPos)

                this.ctx.fillText(card.defense, IconsPos.FIRST_ICON_NUMBER_X[size] + xPos, IconsPos.FIRST_ICON_NUMBER_Y[size] + yPos);

                this.ctx.drawImage(
                    images[ImageTypes.CARD_ICONS][IconsId.SPEED],
                    IconsPos.SECOND_ICON_X[size] + xPos, IconsPos.SECOND_ICON_Y[size] + yPos)
                this.ctx.fillText(card.speed, IconsPos.SECOND_ICON_NUMBER_X[size] + xPos, IconsPos.SECOND_ICON_NUMBER_Y[size] + yPos);

                this.ctx.drawImage(
                    images[ImageTypes.CARD_ICONS][IconsId.DAMAGE],
                    IconsPos.THIRD_ICON_X[size] + xPos, IconsPos.THIRD_ICON_Y[size] + yPos)
                this.ctx.fillText(card.attack, IconsPos.THIRD_ICON_NUMBER_X[size] + xPos, IconsPos.THIRD_ICON_NUMBER_Y[size] + yPos);

                this.ctx.drawImage(
                    images[ImageTypes.CARD_ICONS][IconsId.LIFE],
                    IconsPos.FOURTH_ICON_X[size] + xPos, IconsPos.FOURTH_ICON_Y[size] + yPos)
                this.ctx.fillText(card.health, IconsPos.FOURTH_ICON_NUMBER_X[size] + xPos, IconsPos.FOURTH_ICON_NUMBER_Y[size] + yPos);



                //EQUIPMENT RARITY
                this.ctx.drawImage(
                    images[ImageTypes.EQUIP_RARITY][RarityId.NONE],
                    IconsPos.WEAPON_X[size] + xPos, IconsPos.WEAPON_Y[size] + yPos)

                this.ctx.drawImage(
                    images[ImageTypes.EQUIP_RARITY][RarityId.NONE],
                    IconsPos.ARMOR_X[size] + xPos, IconsPos.ARMOR_Y[size] + yPos)
                break;

            case TypeId.WEAPON:
            case TypeId.ARMOR:
                this.ctx.drawImage(
                    images[ImageTypes.CARD_ICONS][IconsId.COOLDOWN],
                    IconsPos.FIRST_ICON_X[size] + xPos, IconsPos.FIRST_ICON_Y[size] + yPos)

                this.ctx.fillText(card.cooldown, IconsPos.FIRST_ICON_NUMBER_X[size] + xPos, IconsPos.FIRST_ICON_NUMBER_Y[size] + yPos);

                this.ctx.drawImage(
                    images[ImageTypes.CARD_ICONS][IconsId.DURABILITY],
                    IconsPos.SECOND_ICON_X[size] + xPos, IconsPos.SECOND_ICON_Y[size] + yPos)
                this.ctx.fillText(card.durability, IconsPos.SECOND_ICON_NUMBER_X[size] + xPos, IconsPos.SECOND_ICON_NUMBER_Y[size] + yPos);

                this.ctx.drawImage(
                    images[ImageTypes.CARD_ICONS][IconsId.DEFENSE],
                    IconsPos.THIRD_ICON_X[size] + xPos, IconsPos.THIRD_ICON_Y[size] + yPos)
                this.ctx.fillText(card.defense, IconsPos.THIRD_ICON_NUMBER_X[size] + xPos, IconsPos.THIRD_ICON_NUMBER_Y[size] + yPos);

                this.ctx.drawImage(
                    images[ImageTypes.CARD_ICONS][IconsId.DAMAGE],
                    IconsPos.FOURTH_ICON_X[size] + xPos, IconsPos.FOURTH_ICON_Y[size] + yPos)
                this.ctx.fillText(card.attack, IconsPos.FOURTH_ICON_NUMBER_X[size] + xPos, IconsPos.FOURTH_ICON_NUMBER_Y[size] + yPos);

            default:
                break;
        }

    }

    updateGame() {

        // Funcion que roba las Cards del EventDeck y las asigna al HandDeck
        this.assignMinionsToActiveMinionsDeck(this.deckContainer.decks[DecksId.PLAYER_1_MINION_DECK], this.deckContainer.decks[DecksId.PLAYER_1_ACTIVE_MINION_DECK].cards);
        this.assignMinionsToActiveMinionsDeck(this.deckContainer.decks[DecksId.PLAYER_2_MINION_DECK], this.deckContainer.decks[DecksId.PLAYER_2_ACTIVE_MINION_DECK].cards);

        // Funcion que Spawnea los Minions en el tablero
        this.assignMinionsToBoardGrid(this.deckContainer.decks[DecksId.PLAYER_1_ACTIVE_MINION_DECK], this.deckContainer.decks[DecksId.PLAYER_2_ACTIVE_MINION_DECK], this.gridsArray.grids[GridId.BOARD_GRID]);
        
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

            const boardPos = i === 0 ? 0 : 4;

            for (let j = 0; j < decks[i].cards.length; j++){

                if (decks[i].cards[j] != undefined) {
                    
                    const card = decks[i].cards[j];
                    
                    card.xPos = boardGrid.slots[boardPos][2 + counter].xPos;
                    card.yPos = boardGrid.slots[boardPos][2 + counter].yPos;
                    card.size = BorderId.SMALL_SIZE;
                    boardGrid.slots[boardPos][2 + counter].isEmpty = false;
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

