
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
    CARD_TYPE: 6,
    BOARD_IMAGE: 7
}
export const CardImageId = {
    DRUM_MASTER:0,
}
export const BorderId = {
    NORMAL_SIZE: 0,
    SMALL_SIZE: 1
}
export const IconsId = {
    DAMAGE:     0,
    DEFENSE:    1,
    LIFE:       2,
    SPEED:      3,
    RANGE:      4,
    DURABILITY: 5,
    COOLDOWN:   6

}

export const TypeId = {
   
    MINION: 0
}
export const RarityId = {
    COMMON: 0,
    RARE: 1,
    EPIC: 2,
    LEGENDARY: 3
}
export const DecksId = {
    INITIAL_DECK: -1,
    PLAYER_1_MINION_DECK: 0,
    PLAYER_2_MINION_DECK: 1,
    PLAYER_1_HAND_DECK: 2,
    PLAYER_2_HAND_DECK: 3,
    EVENT_DECK: 4,
    MAIN_CHARACTER_DECK: 5,
    GRAVEYARD_DECK:6
}
export const LanguageId = {
    ENG : 0,
    EUS : 1
}

export const BoardId = {
    BOARD:              0,
    EVENT_DECK_FULL:    1,
    EVENT_DECK_HALF:    2,
    EVENT_DECK_EMPTY:   3,
    MINION_DECK_FULL:   4,
    MINION_DECK_HALF:   5,
    MINION_DECK_EMPTY:  6,
    GEM:                7,
}