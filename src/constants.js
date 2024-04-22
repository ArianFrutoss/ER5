
export const FPS =  60;

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
    ATTACK:                 4,
    PREPARE_EVENT:          5,
    USE_EVENT_CARD:         6,
}

export const AttackState = {
    
    PARRY:                  5,
    SELECT_PARRY_ATTACK:    1,
    ATTACK:                 2,
    DEFAULT:                3,
    PREPARE_SELECT:         4

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
    READY:          1,
    ON_USE:         2,
    WORN_OUT:       3,
    APPLY_EVENT:    4,
    SET_TURN:       5
}

export const CardId = {
    BIG_SIZE:       0,
    SMALL_SIZE:     1,
    EVENT_SIZE:     2,
    NOT_SELECTED:   3,
    SELECTED:       4,
    HOVER:          5,
    SCALED:         6,
    NOT_ACTIVE:     7,
    ALIVE:          8,
    DEAD:           9,
    STUNNED:        0,
    ATTACK:         11,
    BLOCKED:        12,
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
    JOSEPH: 1,
}
export const BorderId = {
    NORMAL_SIZE: 0,
    SMALL_SIZE: 1,
    REVERSE: 2,
    HOVER: 3,
    SELECTED: 4,
    MINI_HOVER: 5,
    MINI_SELECTED: 6,
    EVENT_HOVER: 7,
    EVENT_SELECTED: 8
}
export const VFXId = {
    SELECTED: 0,
    HOVER: 1
}
export const StatsId = {
    DAMAGE:     0,
    DEFENSE:    1,
    LIFE:       2,
    SPEED:      3,
    RANGE:      4,
    DURABILITY: 5,
    COOLDOWN:   6,
}
export const IconsId = {
    LIFE:       0,
    DEFENSE:    1,
    DAMAGE:     2,
    SPEED:      3,
    DURABILITY: 4,
    COOLDOWN:   5,
    WEAPON:         6,
    ARMOR:          7,
    MINI_LIFE:      8,
    MINI_DEFENSE:   9,
    MINI_DAMAGE:   10,
    MINI_SPEED:    11,
    MINI_WEAPON:   12,
    MINI_ARMOR:    13,
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
    COMMON:         0,
    RARE:           1,
    EPIC:           2,
    LEGENDARY:      3,
    NONE:           4,
    MINI_COMMON:    5,
    MINI_RARE:      6,
    MINI_EPIC:      7,
    MINI_LEGENDARY: 8,
    MINI_NONE:      9,
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
    GRAVEYARD_DECK:                10,
    JOSEPH_DECK:                   11
}
export const LanguageId = {
    ENG : 0,
    EUS : 1,
}

export const EventsId = {
    COOLDOWN:0,
}
export const BoardId = {
    BOARD:              0,
    EVENT_DECK_EMPTY:   1,
    EVENT_DECK_HALF:    2,
    EVENT_DECK_FULL:    3,
    MINION_DECK_EMPTY:  4,
    MINION_DECK_HALF:   5,
    MINION_DECK_FULL:   6,
    GEM:                7,
}

export const IconsPos = {
    NAME: 0,
    DESCRIPTION: 1,
    NAME_X:121,
    NAME_Y:238,
    DESCRIPTION_X:125,
    DESCRIPTION_Y:191,
    RARITY_X:[100,47, 30],
    RARITY_Y:[-5,-12, 30],
    CATEGORY_X:115,
    CATEGORY_Y:353,
    FIRST_ICON_X:[215,100, 70],
    FIRST_ICON_Y:[345,50, 20],
    FIRST_ICON_NUMBER_X:[205,83, 60],
    FIRST_ICON_NUMBER_Y:[360,70, 30],
    SECOND_ICON_X:[175,100, 70],
    SECOND_ICON_Y:[345,90, 55],
    SECOND_ICON_NUMBER_X:[165,83, 60],
    SECOND_ICON_NUMBER_Y:[360,110, 65],
    THIRD_ICON_X:[85,10, 0],
    THIRD_ICON_Y:[345,50, 20],
    THIRD_ICON_NUMBER_X:[75,30, 30],
    THIRD_ICON_NUMBER_Y:[360,70, 30],
    FOURTH_ICON_X:[35,10, 0],
    FOURTH_ICON_Y:[345,90, 55],
    FOURTH_ICON_NUMBER_X:[25,30, 30],
    FOURTH_ICON_NUMBER_Y:[360,110, 65],
    WEAPON_X:[10,22],
    WEAPON_Y:[15,10],
    ARMOR_X:[191,91],
    ARMOR_Y:[15,10],
    PLAYER_X:[10,170],
    PLAYER_Y:[700,215],
    PLAYER_NAME_X: [200,120],
    PLAYER_NAME_Y: [787,295],
    VFX_X:[-25,-13,-10],
    VFX_Y:[-40,-15,-10],
    EVENT_FADE_WIDTH: 100,
    EVENT_FADE_HEIGTH: 100,
    EVENT_CD_X: 30,
    EVENT_CD_Y: 47,
    EVENT_CD_IMAGE_X: 48,
    EVENT_CD_IMAGE_Y: 35
}
export const MAXIMUN_CARDS_IN_HAND = 5

export const MessageState = {
    APPEAR: 0,
    ON:     1,
    FADE:   2,
    OFF:    3,
}

export const MessageType = {
    DAMAGE_MESSAGE:     0,
    HELP_MESSAGE:       1,
}

export const HelpMessagesPos = {
    X_POS:  1723,
    Y_POS:   833,
}

export const TimerId = {
    TURN_TIMER:     0,
}

export const BaseURL= [
    "http://localhost:3000",
    "https://er5-server.onrender.com" 
]

// 0 for localhost base-url
// 1 for render base-url

export const BaseURLValue = 0

export const messageDefaultPhase        = ["Select any button to enter in the phase", "Aukeratu edozein botoi fasean sartzeko"];

export const messageDiscardPhase        = ["Select any card to discard", "Aukeratu baztertzeko edozein txartel"];

export const messageAttackPhase1        = ["Select any attacker minion", "Aukeratu minioi erasotzaile bat"];
export const messageAttackPhase2        = ["Select any enemy minion to attack", "Aukeratu edozein minioi etsai erasotzeko"];

export const messageMovimentPhase1      = ["Select any minion to move", "Aukeratu minioi bat mugitzeko"];
export const messageMovimentPhase2      = ["Select any slot to move the minion", "Aukeratu edozein zirrikitu minioia mugitzeko"];

export const messagePrepareEventPhase1  = ["Select any event card to prepare", "Aukeratu prestatu beharreko edozein gertakari-txartel"];
export const messagePrepareEventPhase2  = ["Select any slot of the event grid to start to preparing the event card", "Aukeratu edozein zirrikitu gertaeraren txartela prestatzen hasteko"];

export const messageUseEventPhase1      = ["There are no cards in the event grid, Select other action", "Ez dago txartelik ekitaldien laukian, aukeratu beste ekintza bat"];
export const messageUseEventPhase2      = ["Select any prepared event card to use", "Aukeratu erabili beharreko ekitaldietarako txartel prestatua"];
export const messageUseEventPhase3      = ["Select any minion to use the event card", "Aukeratu edozein minioi gertaeraren txartela erabiltzeko"];

export const BlockStates = {
    INVALID:         -1,
    COMPLETE_BLOCK:   0,
    PARCIAL_BLOCK:    1,
    FAILED_BLOCK:     2,
}

export const renderState = {
    GAME:       0,
    PARRY:      1
}

export const ScreenSize = {
    X_SIZE: 1920,
    Y_SIZE: 1080,
}

export const CardSize = {
    X_SIZE: 197.6,
    Y_SIZE: 303.2,
}

export const MainCharacterId = {
    LUCRETIA:           2,
    ANGELO:             9,
    DECREPIT_TRHONE:    10,
    X_G_SCHOLAR:        11
}

export const BuffId = {
    HERO_EMPOWERMENT:   53
}