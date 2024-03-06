export default class Grid{

    constructor(xPos, yPos, xSize, ySize, id, rows, columns, positionsArray, activeSlotsArray){

        this.xPos               = xPos
        this.yPos               = yPos
        this.xSize              = xSize
        this.ySize              = ySize
        this.id                 = id;
        this.rows               = rows;
        this.columns            = columns;
        this.positionsArray     = positionsArray;
        this.activeSlotsArray   = activeSlotsArray;
    }
}