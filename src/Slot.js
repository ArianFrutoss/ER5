export default class Slot{

    constructor(xPos, yPos, xSize, ySize, state, isEmpty){

        this.xPos               = xPos;
        this.yPos               = yPos;
        this.xSize              = xSize;
        this.ySize              = ySize;
        this.state              = state;
        this.isEmpty            = isEmpty;
        this.card;
        this.grid;
    }
}