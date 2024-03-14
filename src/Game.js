import Card from "./Cards/Card.js";
import { BoardId, BorderId, CardId, CardImageId, DecksId, GameState, GridId, IconsId, IconsPos, ImageTypes, LanguageId, RarityId, TypeId } from "./constants.js";
import Board from "./Board.js";
import jsonArray from "../cards.js";
import Asset from "./Asset.js";
import globals from "./globals.js";
import CardFactory from "./Cards/CardFactory.js";
import DeckContainer from "./Cards/DeckContainer.js";
import TurnContainer from "./Turns/TurnContainer.js";


export default class Game {

    constructor(turnArray, handsArray, images, cardsArray, boardMinionsArray, deckContainer, gridsArray, activeEventsArray, rarity,canvas, ctx) {

        this.turnArray = turnArray;
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
        this.gameState = GameState.INVALID;
        this.canvas = canvas;
        this.ctx = ctx
    }

    static init(data, canvas, ctx) {

        const board = Board.initBoard(canvas);
        const assets = Asset.create();
        assets.loadImages(data);
        const deckContainer = new DeckContainer();
        deckContainer.createDecks(data);

        const turns = new TurnContainer(board.grids, deckContainer);
        
        turns.CreateTurns();
        // turns.turnContainer[0].showPlayerData();
        // turns.turnContainer[1].showPlayerData();

        return new Game(turns, null, assets.images, null, null, deckContainer, board, null, null, canvas, ctx);
    }

    update() {

        switch (this.gameState) {

            case GameState.LOAD_GAME:
                console.log("load game");
                break;

            case GameState.PLAYING:
                this.updateGame();
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
                break;

            default:
                break;

        }
    }

    drawGame() {

        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.fillText("FPS:" + 1 / globals.deltaTime, 30, 30);

        // Funcion para renderizar los Grids
        this.renderBoard(this.images);

        // Funcion para renderizar los Grids
        this.renderGrids();

        // Funcion para renderizar las Cards
        // this.drawCard(this.images, this.deckContainer.decks[DecksId.PLAYER_1_MINION_DECK].cards[0])
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

    renderGrids() {

        // Cantidad de Grids que se van a renderizar
        const gridsLength = this.gridsArray.grids.length;

        for (let i = 0; i < gridsLength; i++) {

            // Numero de filas y comumnas de los Slots
            const rows = this.gridsArray.grids[i].slots.length;
            const columns = this.gridsArray.grids[i].slots[0].length;

            for (let j = 0; j < rows; j++) {

                for (let k = 0; k < columns; k++) {

                    // Posicion y tamaño de los Slots
                    const slotsXPos = this.gridsArray.grids[i].slots[j][k].xPos;
                    const slotsYPos = this.gridsArray.grids[i].slots[j][k].yPos;
                    const slotsXSize = this.gridsArray.grids[i].slots[j][k].xSize - 2;
                    const slotsYSize = this.gridsArray.grids[i].slots[j][k].ySize - 2;

                    this.ctx.fillRect(slotsXPos, slotsYPos, slotsXSize, slotsYSize);
                }
            }
        }
    }

    drawAllCards() {
        for (let i = 0; i < 4; i++) {
            const deck = this.deckContainer.decks[i];
            for (let j = 0; j < deck.cards.length; j++) {
                const card = deck.cards[j];
                this.drawCard(this.images, card, card.xPos , card.yPos )
            }

        }
    }

    drawCard(images, card, xPos, yPos) {
        //CARD IMAGE
        this.ctx.drawImage(
            images[ImageTypes.CARD_IMAGE][card.size][card.id - 1],                 //Img File
            xPos,yPos                    //X & Y Position Source
            )
            
            // BORDER
            this.ctx.drawImage(
                images[ImageTypes.CARD_BORDER][card.size],
                xPos, yPos)
                if (card.size === BorderId.NORMAL_SIZE) {
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
            IconsPos.RARITY_X[card.size] + xPos, IconsPos.RARITY_Y[card.size] + yPos)


        switch (card.category) {
            case TypeId.MINION:
                //STAT ICONS
                this.ctx.drawImage(
                    images[ImageTypes.CARD_ICONS][IconsId.DEFENSE],
                    IconsPos.FIRST_ICON_X[card.size] + xPos, IconsPos.FIRST_ICON_Y[card.size] + yPos)

                this.ctx.fillText(card.defense, IconsPos.FIRST_ICON_NUMBER_X[card.size] + xPos, IconsPos.FIRST_ICON_NUMBER_Y[card.size] + yPos);

                this.ctx.drawImage(
                    images[ImageTypes.CARD_ICONS][IconsId.SPEED],
                    IconsPos.SECOND_ICON_X[card.size] + xPos, IconsPos.SECOND_ICON_Y[card.size] + yPos)
                this.ctx.fillText(card.speed, IconsPos.SECOND_ICON_NUMBER_X[card.size] + xPos, IconsPos.SECOND_ICON_NUMBER_Y[card.size] + yPos);

                this.ctx.drawImage(
                    images[ImageTypes.CARD_ICONS][IconsId.DAMAGE],
                    IconsPos.THIRD_ICON_X[card.size] + xPos, IconsPos.THIRD_ICON_Y[card.size] + yPos)
                this.ctx.fillText(card.attack, IconsPos.THIRD_ICON_NUMBER_X[card.size] + xPos, IconsPos.THIRD_ICON_NUMBER_Y[card.size] + yPos);

                this.ctx.drawImage(
                    images[ImageTypes.CARD_ICONS][IconsId.LIFE],
                    IconsPos.FOURTH_ICON_X[card.size] + xPos, IconsPos.FOURTH_ICON_Y[card.size] + yPos)
                this.ctx.fillText(card.health, IconsPos.FOURTH_ICON_NUMBER_X[card.size] + xPos, IconsPos.FOURTH_ICON_NUMBER_Y[card.size] + yPos);



                //EQUIPMENT RARITY
                this.ctx.drawImage(
                    images[ImageTypes.EQUIP_RARITY][RarityId.NONE],
                    IconsPos.WEAPON_X[card.size] + xPos, IconsPos.WEAPON_Y[card.size] + yPos)

                this.ctx.drawImage(
                    images[ImageTypes.EQUIP_RARITY][RarityId.NONE],
                    IconsPos.ARMOR_X[card.size] + xPos, IconsPos.ARMOR_Y[card.size] + yPos)
                break;

            case TypeId.WEAPON:
            case TypeId.ARMOR:
                this.ctx.drawImage(
                    images[ImageTypes.CARD_ICONS][IconsId.COOLDOWN],
                    IconsPos.FIRST_ICON_X[card.size] + xPos, IconsPos.FIRST_ICON_Y[card.size] + yPos)

                this.ctx.fillText(card.cooldown, IconsPos.FIRST_ICON_NUMBER_X[card.size] + xPos, IconsPos.FIRST_ICON_NUMBER_Y[card.size] + yPos);

                this.ctx.drawImage(
                    images[ImageTypes.CARD_ICONS][IconsId.DURABILITY],
                    IconsPos.SECOND_ICON_X[card.size] + xPos, IconsPos.SECOND_ICON_Y[card.size] + yPos)
                this.ctx.fillText(card.durability, IconsPos.SECOND_ICON_NUMBER_X[card.size] + xPos, IconsPos.SECOND_ICON_NUMBER_Y[card.size] + yPos);

                this.ctx.drawImage(
                    images[ImageTypes.CARD_ICONS][IconsId.DEFENSE],
                    IconsPos.THIRD_ICON_X[card.size] + xPos, IconsPos.THIRD_ICON_Y[card.size] + yPos)
                this.ctx.fillText(card.defense, IconsPos.THIRD_ICON_NUMBER_X[card.size] + xPos, IconsPos.THIRD_ICON_NUMBER_Y[card.size] + yPos);

                this.ctx.drawImage(
                    images[ImageTypes.CARD_ICONS][IconsId.DAMAGE],
                    IconsPos.FOURTH_ICON_X[card.size] + xPos, IconsPos.FOURTH_ICON_Y[card.size] + yPos)
                this.ctx.fillText(card.attack, IconsPos.FOURTH_ICON_NUMBER_X[card.size] + xPos, IconsPos.FOURTH_ICON_NUMBER_Y[card.size] + yPos);

            default:
                break;
        }

    }

    updateGame() {

        // Funcion que roba las Cards del EventDeck y las asigna al HandDeck
        this.assignCardsToHand(this.deckContainer.decks[DecksId.EVENT_DECK], this.deckContainer.decks[DecksId.PLAYER_1_HAND_DECK].cards, this.deckContainer.decks[DecksId.PLAYER_2_HAND_DECK].cards);

        // Funcion que Spawnea los Minions en el tablero
        this.assignMinionsToBoard(this.deckContainer.decks[DecksId.PLAYER_1_MINION_DECK], this.deckContainer.decks[DecksId.PLAYER_2_MINION_DECK], this.gridsArray.grids[GridId.BOARD_GRID]);
        
        // Funcion que posiciona las Cards en la posicion de los Slots
        this.assignCardsToGrids(this.deckContainer.decks[DecksId.PLAYER_1_HAND_DECK], this.gridsArray.grids[GridId.PLAYER_1_HAND_GRID]);
        this.assignCardsToGrids(this.deckContainer.decks[DecksId.PLAYER_2_HAND_DECK], this.gridsArray.grids[GridId.PLAYER_2_HAND_GRID]);
    }

    assignCardsToHand(eventDeck, player1HandDeck, player2HandDeck) {

        for (let i = player1HandDeck.length; i < 5; i++) {

            player1HandDeck.push(eventDeck.cards[eventDeck.cards.length - 1]);
            eventDeck.cards.pop();
            break;
        }

        for (let i = player2HandDeck.length; i < 5; i++) {

            player2HandDeck.push(eventDeck.cards[eventDeck.cards.length - 1]);
            eventDeck.cards.pop();
            break;
        }
    }

    assignMinionsToBoard(player1MinionDeck, player2MinionDeck, boardGrid) {

        for (let i = 0; i < 3; i++) {
                
            for (let j = 0; j < player1MinionDeck.cards.length; j++){
                
                if (player1MinionDeck.cards[j].name[0] === "Villager"){
                    
                    player1MinionDeck.cards[j].xPos = boardGrid.slots[0][2 + j].xPos;
                    player1MinionDeck.cards[j].yPos = boardGrid.slots[0][2 + j].yPos;
                    player1MinionDeck.cards[j].size = BorderId.SMALL_SIZE
                    boardGrid.slots[0][2 + j].CardId = player1MinionDeck.cards[j].xPos;

                    player2MinionDeck.cards[j].xPos = boardGrid.slots[4][2 + j].xPos;
                    player2MinionDeck.cards[j].yPos = boardGrid.slots[4][2 + j].yPos;
                    player2MinionDeck.cards[j].size = BorderId.SMALL_SIZE
                    boardGrid.slots[4][2 + j].CardId = player2MinionDeck.cards[j].xPos;
                }
            }
        }
    }
    
    assignCardsToGrids(decks, grids) {

        for (let i = 0; i < grids.slots.length; i++) {

            for (let j = 0; j < grids.slots[0].length; j++) {

                if (decks.cards[j]) {
                    decks.cards[j].xPos = grids.slots[i][j].xPos;
                    decks.cards[j].yPos = grids.slots[i][j].yPos;
                    grids.slots[i][j].CardId = decks.cards[j].id;
                    
                }
            }
        }
    }
}