
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

export const TurnId = {
    PLAYER_1:               0,
    PLAYER_2:               1,
}

export const TurnStates = {

    INITIALIZE:     0,
    EXECUTION:      1,
    END:            2,
    INVALID:        3,
}
    
export const PhaseStates = {
    DEFAULT:                0,
    DISCARD_CARD:           1,
    DRAW_CARD:              2,
    MOVEMENT:               3,
    PREPARE_EVENT:          4,
    USE_EVENT_CARD:         5,
}

export const MovePhaseStates = {
    NONE:       0,
    MOVE:       1,
    ATTACK:     2,
    SELECT_ATTACKER:    3,
    SELECT_OBJECTIVE:   4,

}

export const CardActions = {
    NOT_ACTIVE:    -1,
    COOLDOWN:       0,
}

export const CardId = {
    BIG_SIZE:       0,
    SMALL_SIZE:     1,
    NOT_SELECTED:   2,
    SELECTED:       3,
    HOVER:          4,
    SCALED:         5,
    NOT_ACTIVE:     6,
    ALIVE:          7,
    DEAD:           8,
    STUNNED:        9,
    ATTACK:         10
}

export const GridId = {
    BOARD_GRID:             0,
    PLAYER_1_EVENT_GRID:    1,
    PLAYER_2_EVENT_GRID:    2,
    PLAYER_1_HAND_GRID:     3,
    PLAYER_2_HAND_GRID:     4,
} 

export const SlotsState = {
    NOT_SELECTED:   0,
    SELECTED:       1,
    HOVER:          2
}

export const ButtonState = {
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
    MINION: 0,
    BUFF: 1,
    CURSE:2,
    HERO:3,
    JOSEPH:4,
    ARMOR:5,
    WEAPON:6,
    SPELL: 7,

}
export const RarityId = {
    COMMON: 0,
    RARE: 1,
    EPIC: 2,
    LEGENDARY: 3,
    NONE : 4,
}
export const DecksId = {
    INITIAL_DECK:                  -1,
    PLAYER_1_MINION_DECK:           0,
    PLAYER_2_MINION_DECK:           1,
    PLAYER_1_HAND_DECK:             2,
    PLAYER_2_HAND_DECK:             3,
    PLAYER_1_ACTIVE_MINION_DECK:    4,
    PLAYER_2_ACTIVE_MINION_DECK:    5,
    PLAYER_1_PREPARING_EVENT_DECK:  6,
    PLAYER_2_PREPARING_EVENT_DECK:  7,
    EVENT_DECK:                     8,
    MAIN_CHARACTER_DECK:            9,
    GRAVEYARD_DECK:                10
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

export const IconsPos = {
    NAME_X:85,
    NAME_Y:245,
    DESCRIPTION_X:10,
    DESCRIPTION_Y:291,
    RARITY_X:[100,47],
    RARITY_Y:[-5,-12],
    CATEGORY_X:115,
    CATEGORY_Y:353,
    FIRST_ICON_X:[215,100],
    FIRST_ICON_Y:[345,50],
    FIRST_ICON_NUMBER_X:[205,83],
    FIRST_ICON_NUMBER_Y:[360,70],
    SECOND_ICON_X:[175,100],
    SECOND_ICON_Y:[345,90],
    SECOND_ICON_NUMBER_X:[165,83],
    SECOND_ICON_NUMBER_Y:[360,110],
    THIRD_ICON_X:[85,10],
    THIRD_ICON_Y:[345,50],
    THIRD_ICON_NUMBER_X:[75,30],
    THIRD_ICON_NUMBER_Y:[360,70],
    FOURTH_ICON_X:[35,10],
    FOURTH_ICON_Y:[345,90],
    FOURTH_ICON_NUMBER_X:[25,30],
    FOURTH_ICON_NUMBER_Y:[360,110],
    WEAPON_X:[10,],
    WEAPON_Y:[15,],
    ARMOR_X:[191,],
    ARMOR_Y:[15,],
    PLAYER_X:[10,170],
    PLAYER_Y:[700,215],
    PLAYER_NAME_X: [140,30],
    PLAYER_NAME_Y: [790,300],
}