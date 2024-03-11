import Card from "./Cards/Card.js";
import { BoardId, BorderId, CardId, CardImageId, DecksId, GameState, GridId, IconsId, ImageTypes, LanguageId, RarityId, TypeId } from "./constants.js";
import Board from "./Board.js";
import jsonArray from "../cards.js";
import Asset from "./Asset.js";
import globals from "./globals.js";
import CardFactory from "./Cards/CardFactory.js";
import DeckContainer from "./Cards/DeckContainer.js";


export default class Game {

    constructor(turnArray, handsArray, images, cardsArray, boardMinionsArray, deckContainer, gridsArray, activeEventsArray, rarity) {

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
    }

    static init(data) {

        const board = Board.initBoard();
        let images = Asset.loadImages(data);
        const deckContainer = new DeckContainer()
        deckContainer.createDecks(data)
        console.log(deckContainer.decks);

        return new Game(null, null, images, null, null, deckContainer, board, null, null);
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

        globals.ctx.clearRect(0, 0, globals.canvas.width, globals.canvas.height);

        globals.ctx.fillText("FPS:" + 1 / globals.deltaTime, 30, 30);

        // Funcion para renderizar los Grids
        this.renderBoard(this.images);

        // Funcion para renderizar los Grids
        this.renderGrids();

        // Funcion para renderizar las Cards
        this.drawCard(this.images, this.deckContainer.decks[DecksId.PLAYER_1_MINION_DECK].cards[0])
    }

    renderBoard(images) {

        globals.ctx.font = "30px LongaIberica-DEMO";

        let image = images[ImageTypes.BOARD_IMAGE][BoardId.BOARD];
        let xPos = 0;
        let yPos = 0;

        globals.ctx.drawImage(

            image, xPos, yPos
        )

        image = images[ImageTypes.BOARD_IMAGE][BoardId.EVENT_DECK_FULL];
        xPos = 25;
        yPos = globals.canvas.height / 2 - image.height / 2;

        globals.ctx.drawImage(

            image, xPos, yPos
        )

        image = images[ImageTypes.BOARD_IMAGE][BoardId.MINION_DECK_FULL];
        xPos = 75;
        yPos = 12;

        globals.ctx.drawImage(

            image, xPos, yPos
        )

        image = images[ImageTypes.BOARD_IMAGE][BoardId.MINION_DECK_HALF];
        xPos = 75;
        yPos = 872;

        globals.ctx.drawImage(

            image, xPos, yPos
        )

        image = images[ImageTypes.BOARD_IMAGE][BoardId.GEM];
        xPos = 295;
        yPos = 55;

        globals.ctx.drawImage(

            image, xPos, yPos
        )

        globals.ctx.fillText(this.deckContainer.decks[DecksId.PLAYER_1_MINION_DECK].cards.length, image.width / 2 + xPos, image.height / 2 + yPos);

        image = images[ImageTypes.BOARD_IMAGE][BoardId.GEM];
        xPos = 295;
        yPos = 925;

        globals.ctx.drawImage(

            image, xPos, yPos
        )

        globals.ctx.fillText(this.deckContainer.decks[DecksId.PLAYER_2_MINION_DECK].cards.length, image.width / 2 + xPos, image.height / 2 + yPos);

        image = images[ImageTypes.GAME_RARITY][RarityId.COMMON];
        xPos = 1595;
        yPos = 20;

        globals.ctx.drawImage(

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

                    globals.ctx.fillRect(slotsXPos, slotsYPos, slotsXSize, slotsYSize);
                }
            }
        }
    }

    drawAllCards() {
        for (let i = 0; i < this.deckContainer.decks.length; i++) {
            const deck = this.deckContainer.decks[i];
            for (let j = 0; j < deck.cards.length; j++) {
                const card = deck.cards[j];
                if (i > 1) {
                    card.yPos = -120
                }
                this.drawCard(this.images, card, card.xPos - 100 + j * 170, card.yPos - 100 + i * 200)

            }

        }
    }

    drawCard(images, card, xPos, yPos) {
        //CARD IMAGE
        globals.ctx.drawImage(
            images[ImageTypes.CARD_IMAGE][card.size][card.id - 1],                 //Img File
            0 + xPos, 20 + yPos                    //X & Y Position Source
        )

        // BORDER
        globals.ctx.drawImage(
            images[ImageTypes.CARD_BORDER][card.size],
            0 + xPos, 0 + yPos)
        globals.ctx.font = "25px LongaIberica-DEMO";
        globals.ctx.fillText(card.name[this.language], 85 + xPos, 245 + yPos);
        globals.ctx.font = "15px LongaIberica-DEMO";
        globals.ctx.fillText(card.description[this.language], 10 + xPos, 291 + yPos);
        globals.ctx.font = "25px LongaIberica-DEMO";
        //RARITY ICON
        globals.ctx.drawImage(
            images[ImageTypes.CARD_RARITY][card.rarity],
            100 + xPos, -5 + yPos)

        //CATEGORY ICON
        globals.ctx.drawImage(
            images[ImageTypes.CARD_TYPE][card.category],
            115 + xPos, 353 + yPos)

        switch (card.category) {
            case TypeId.MINION:
                //STAT ICONS
                globals.ctx.drawImage(
                    images[ImageTypes.CARD_ICONS][IconsId.DEFENSE],
                    215 + xPos, 345 + yPos)

                globals.ctx.fillText(card.defense, 205 + xPos, 360 + yPos);

                globals.ctx.drawImage(
                    images[ImageTypes.CARD_ICONS][IconsId.SPEED],
                    175 + xPos, 345 + yPos)
                globals.ctx.fillText(card.speed, 165 + xPos, 360 + yPos);

                globals.ctx.drawImage(
                    images[ImageTypes.CARD_ICONS][IconsId.DAMAGE],
                    85 + xPos, 345 + yPos)
                globals.ctx.fillText(card.attack, 75 + xPos, 360 + yPos);

                globals.ctx.drawImage(
                    images[ImageTypes.CARD_ICONS][IconsId.LIFE],
                    35 + xPos, 345 + yPos)
                globals.ctx.fillText(card.health, 25 + xPos, 360 + yPos);



                //EQUIPMENT RARITY
                globals.ctx.drawImage(
                    images[ImageTypes.EQUIP_RARITY][RarityId.NONE],
                    10 + xPos, 15 + yPos)

                globals.ctx.drawImage(
                    images[ImageTypes.EQUIP_RARITY][RarityId.NONE],
                    191 + xPos, 15 + yPos)
                break;

            case TypeId.WEAPON:
            case TypeId.ARMOR:
                globals.ctx.drawImage(
                    images[ImageTypes.CARD_ICONS][IconsId.COOLDOWN],
                    215 + xPos, 345 + yPos)

                globals.ctx.fillText(card.cooldown, 205 + xPos, 360 + yPos);

                globals.ctx.drawImage(
                    images[ImageTypes.CARD_ICONS][IconsId.DURABILITY],
                    175 + xPos, 345 + yPos)
                globals.ctx.fillText(card.durability, 165 + xPos, 360 + yPos);

                globals.ctx.drawImage(
                    images[ImageTypes.CARD_ICONS][IconsId.DEFENSE],
                    85 + xPos, 345 + yPos)
                globals.ctx.fillText(card.defense, 75 + xPos, 360 + yPos);

                globals.ctx.drawImage(
                    images[ImageTypes.CARD_ICONS][IconsId.DAMAGE],
                    35 + xPos, 345 + yPos)
                globals.ctx.fillText(card.attack, 25 + xPos, 360 + yPos);

            default:
                break;
        }

    }

    updateGame() {

        // Funcion que roba las Cards del EventDeck y las asigna al HandDeck
        // this.assignCardsToHand(this.deckContainer.decks[DecksId.EVENT_DECK], this.deckContainer.decks[DecksId.PLAYER_1_HAND_DECK].cards, this.deckContainer.decks[DecksId.PLAYER_2_HAND_DECK].cards);

        // // Funcion que posiciona las Cards en la posicion de los Slots
        // this.assignCardsToGrids(this.deckContainer.decks[DecksId.PLAYER_1_HAND_DECK], this.gridsArray.grids[GridId.PLAYER_1_HAND_GRID]);
        // this.assignCardsToGrids(this.deckContainer.decks[DecksId.PLAYER_2_HAND_DECK], this.gridsArray.grids[GridId.PLAYER_2_HAND_GRID]);
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

    assignCardsToGrids(decks, grids) {

        for (let i = 0; i < grids.slots.length; i++) {

            for (let j = 0; j < grids.slots[0].length; j++) {

                decks.cards[j].xPos = grids.slots[i][j].xPos;
                decks.cards[j].yPos = grids.slots[i][j].yPos;
                grids.slots[i][j].CardId = decks.cards[j].id;
            }
        }
    }
}