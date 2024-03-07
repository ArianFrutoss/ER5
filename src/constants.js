
export const FPS =  30;

export const GameState = {
    INVALID:       -1,
    LOAD_LANPAGE:   0,
    LANDPAGE:       1,
    LOAD_GAME:      2,
    PLAYING:        3,
    LOAD_GAMEOVER:  4,
    GAMEOVER:       5,
    LOAD_CONTROLS:  6,
    CONTROLS:       7,
    INVALID:        8
}

export const Turn = {
    PLAYER_1:               0,
    PLAYER_2:               1,
    PHASE_DISCARD_CARD:     2,
    PHASE_DRAW_CARD:        3,
    PHASE_MOVEMENT:         4,
    PHASE_ATTACK:           5,
    PHASE_PREPARE_EVENT:    6,
    PHASE_USE_EVENT_CARD:   7,
    PHASE_DEFAULT:          8
}

export const CardId = {
    BIG_SIZE:       0,
    SMALL_SIZE:     1,
    NOT_SELECTED:   2,
    SELECTED:       3,
    HOVER:          4,
    NOT_ACTIVE:     5,
    ALIVE:          6,
    DEAD:           7,
    STUNNED:        8
}

export const Grid = {
    NOT_SELECTED:   0,
    SELECTED:       1,
    HOVER:          2
}

export const Joseph = {
    NOT_ACTIVE:   0,
    ACTIVE:       1,
    HOVER:        2
}
