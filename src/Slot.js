export default class Slot{

    constructor(xPos, yPos, xSize, ySize, id, state, card, isEmpty, grid){

        this.xPos               = xPos;
        this.yPos               = yPos;
        this.xSize              = xSize;
        this.ySize              = ySize;
        this.id                 = id;
        this.state              = state;
        this.card               = card;
        this.state              = state;
        this.isEmpty            = isEmpty;
        this.grid               = grid;
    }
}