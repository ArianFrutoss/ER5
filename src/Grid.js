export default class Grid{

    constructor(xPos, yPos, id, rows, columns, positionsArray){

        this.xPos               = xPos
        this.yPos               = yPos
        this.id                 = id;
        this.rows               = rows;
        this.columns            = columns;
        this.positionsArray     = positionsArray;
        this.activeSlotsArray   = [];
    }
}