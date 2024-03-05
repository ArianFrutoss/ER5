export default class Turn {

    constructor(playerName, playerImage, hand, minionDeck, gridArray, mainCharacter, phasesArray, actionsLeft){

        this.playerName     = playerName;
        this.playerImage    = playerImage;
        this.hand           = hand;
        this.minionDeck     = minionDeck;
        this.gridArray      = gridArray;
        this.mainCharacter  = mainCharacter;
        this.phasesArray    = phasesArray;
        this.actionsLeft    = actionsLeft;
    }
}