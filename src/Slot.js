import { GridId, SlotsState } from "./constants.js";

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

    update(mouse, grid){

        const isSlotUsed = this.isSlotUsed(grid);
        const isSlotSelected = this.isSlotSelected(grid);
        
        if (isSlotUsed === false){
            
            const isCollidingWithMouse = mouse.isCollidingWithSlot(this);
            const isLeftClick          = mouse.leftClick;
    
            switch (this.state){
                
                case SlotsState.NOT_SELECTED:
                    
                    if (isCollidingWithMouse){

                        this.state = SlotsState.HOVER;
                    }
                    break;
    
                case SlotsState.HOVER:
                    
                    if (isCollidingWithMouse === false){
                        
                        this.state = SlotsState.NOT_SELECTED;
                    }

                    else if (isLeftClick && isSlotSelected === false){
                        
                        this.state = SlotsState.SELECTED;
                    }
                    break;

                case SlotsState.SELECTED:
                    
                    break;
            
                default:

                    break;
            }
        }
    }

    isSlotUsed(grid){

        let result = false;

        for (let i = 0; i < grid.slots.length; i++){

            const slot =  grid.slots[i];

            if (slot.isEmpty === false){

                 result = true;
                 return result;
            }
        }

        return result;
    }

    isSlotSelected(grid){

        let result = false;

        for (let i = 0; i < grid.slots.length; i++){

            const slot =  grid.slots[i];

            if (slot.state === SlotsState.SELECTED){

                 result = true;
                 return result;
            }
        }

        return result;
    }
}