export default class Grid{

    constructor(xPos, yPos, id, rows, columns, slotsArray){

        this.xPos               = xPos;
        this.yPos               = yPos;
        this.id                 = id;
        this.rows               = rows;
        this.columns            = columns;
        this.slots              = slotsArray;
        this.activeSlotsArray   = [];
    }
}