
export default class Mouse {
    
    constructor(x, y, rightClick, leftClick){
        this.x              = x;
        this.y              = y;
        this.rightClick     = rightClick;
        this.leftClick      = leftClick;
    }

    isCollidingWithSlot(grid){

        for (let i = 0; i < grid.slots.length; i++){

            for (let j = 0; j < grid.slots[0].length; j++){

                const slotFirstWidthPoint = grid.slots[i][j].xPos;
                const slotSecondWidthPoint = grid.slots[i][j].xPos + grid.slots[i][j].xSize;
                const slotFirstHeigthPoint = grid.slots[i][j].yPos;
                const slotSecondHeigthPoint = grid.slots[i][j].yPos + grid.slots[i][j].ySize;

                if (this.x > slotFirstWidthPoint & this.x < slotSecondWidthPoint & this.y > slotFirstHeigthPoint & this.y < slotSecondHeigthPoint){

                    console.log(1);
                }
            }
        }
    }
}
