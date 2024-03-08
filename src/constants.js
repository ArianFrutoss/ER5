
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

export const GridId = {
    BOARD_GRID:         0,
    EVENT_BOARD_GRID:   1,
    HAND_GRID:          2,
} 

export const SlotsState = {
    NOT_SELECTED:   0,
    SELECTED:       1,
    HOVER:          2
}

export const Joseph = {
    NOT_ACTIVE:   0,
    ACTIVE:       1,
    HOVER:        2
}

export const ImageTypes = {
    CARD_IMAGE:  0,
    CARD_BORDER: 1,
    CARD_ICONS: 2,
    CARD_RARITY: 3,
    EQUIP_RARITY: 4,
    GAME_RARITY:5,
    CARD_TYPE: 6
}
export const CardImageId = {
    DRUM_MASTER:0,
}
export const BorderId = {
    NORMAL_SIZE: 0,
    SMALL_SIZE: 1
}
export const IconsId = {
    DEFENSE: 0,
    SPEED: 1,
    DAMAGE: 2,
    LIFE: 3

}

export const TypeId = {
   
    MINION: 0
}
export const RarityId = {
    NONE : 0,
    COMMON: 1,
    RARE: 2,
    EPIC: 3,
    LEGENDARY: 4
}
