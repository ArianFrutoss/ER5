import {GameState} from "./constants.js"

export default {
    // Acceso al canvas y context
    canvas: {},
    ctx: {},

    // Estados de juego. 
    gameState: GameState.INVALID,

    previousCycleMiliseconds: -1,

    deltaTime: 0,

    frameTimeObj: 0,

    images: [],

        //Stores elements to load(IMG/Sounds)
        assetsToLoad: [],

        //Counter of elements loaded in game
        assetsLoaded: 0,
        
    txtPruebas: {}
}

