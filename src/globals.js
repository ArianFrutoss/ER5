import {GameState} from "./constants.js"

export default {

    // Estados de juego. 
    gameState: GameState.INVALID,

    //Tiempo de ciclo anterior (ms.)
    previousCycleMilliseconds: -1,

    //Tiempo de ciclo de juego real (seconds)
    deltaTime: 0,
    cycleRealTime: 0,

    //Tiempo de ciclo objetivo (seconds, constante)
    frameTimeObj: 0,

    txtPruebas: {},

    cards: [],

    action: {},
    
    mouse: {},

    images: [],

    //Stores elements to load(IMG/Sounds)
    assetsToLoad: [],

    //Counter of elements loaded in game
    assetsLoaded: 0,
        
    txtPruebas: {},

    playerOneHealth: 20,
    playerTwoHealth: 20,
}

