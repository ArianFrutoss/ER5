import Card from "./Cards/Card.js";
import { BorderId, CardImageId, DecksId, GameState, IconsId, ImageTypes, LanguageId, RarityId, TypeId } from "./constants.js";
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

    static init() {

        const board = Board.initBoard();
        let images = Asset.loadImages();
        const deckContainer = new DeckContainer()
        deckContainer.createDecks()

        return new Game(null, null, images, null, null, deckContainer, board, null, null);
    }

    update() {

        switch (this.gameState) {

            case GameState.LOAD_GAME:
                console.log("load game");
                break;

            case GameState.PLAYING:

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
                this.drawAllCards()
                break;

            default:
                break;

        }
    }

    drawGame() {

        globals.ctx.clearRect(0, 0, globals.canvas.width, globals.canvas.height);

        globals.ctx.fillText("FPS:" + 1 / globals.deltaTime, 30, 30);

        // Funcion para renderizar los Grids
        this.renderGrids();

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
                this.drawCard(this.images, card, card.xPos + j * 200, card.yPos + i * 150)

            }

        }
    }
    drawCard(images, card, xPos, yPos) {

        //CARD IMAGE
        globals.ctx.drawImage(
            images[ImageTypes.CARD_IMAGE][CardImageId.DRUM_MASTER],                 //Img File
            0 + xPos, 20 + yPos                    //X & Y Position Source
        )

        // BORDER
        globals.ctx.drawImage(
            images[ImageTypes.CARD_BORDER][card.size],
            0 + xPos, 0 + yPos)

        globals.ctx.fillText(card.name[this.language], 90 + xPos, 241 + yPos);
        globals.ctx.fillText(card.description[this.language], 35 + xPos, 291 + yPos);

        //STAT ICONS
        globals.ctx.drawImage(
            images[ImageTypes.CARD_ICONS][IconsId.DEFENSE],
            215 + xPos, 343 + yPos)
        globals.ctx.fillText(card.defense, 205 + xPos, 360 + yPos);

        globals.ctx.drawImage(
            images[ImageTypes.CARD_ICONS][IconsId.SPEED],
            175 + xPos, 343 + yPos)
        globals.ctx.fillText(card.speed, 165 + xPos, 360 + yPos);

        globals.ctx.drawImage(
            images[ImageTypes.CARD_ICONS][IconsId.DAMAGE],
            85 + xPos, 343 + yPos)
        globals.ctx.fillText(card.attack, 75 + xPos, 360 + yPos);

        globals.ctx.drawImage(
            images[ImageTypes.CARD_ICONS][IconsId.LIFE],
            35 + xPos, 343 + yPos)
        globals.ctx.fillText(card.health, 25 + xPos, 360 + yPos);

        //RARITY ICON
        globals.ctx.drawImage(
            images[ImageTypes.CARD_RARITY][card.rarity],
            100 + xPos, -5 + yPos)

        //CATEGORY ICON
        globals.ctx.drawImage(
            images[ImageTypes.CARD_TYPE][card.category],
            115 + xPos, 353 + yPos)

        //EQUIPMENT RARITY
        globals.ctx.drawImage(
            images[ImageTypes.EQUIP_RARITY][RarityId.NONE],
            10 + xPos, 15 + yPos)

        globals.ctx.drawImage(
            images[ImageTypes.EQUIP_RARITY][RarityId.NONE],
            191 + xPos, 15 + yPos)


    }
}