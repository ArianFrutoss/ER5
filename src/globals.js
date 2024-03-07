import {Game} from "./constants.js"

export default {
    // Acceso al canvas y context
    canvas: {},
    ctx: {},

    // Estados de juego. 
    gameState: Game.INVALID,

    previousCycleMiliseconds: -1,

    deltaTime: 0,

    frameTimeObj: 0,

    txtPruebas: {},

    cards: []
}

