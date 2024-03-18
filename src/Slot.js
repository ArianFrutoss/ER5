import { SlotsState } from "./constants.js";

export default class Slot{

    constructor(xPos, yPos, xSize, ySize){

        this.xPos               = xPos;
        this.yPos               = yPos;
        this.xSize              = xSize;
        this.ySize              = ySize;
        this.state              = SlotsState.NOT_SELECTED;
        this.isEmpty            = true;
        this.card;
        this.grid;
    }

    update(mouse, grid, deck){

        const isSlotSelected = this.isSlotSelected(grid);
        const isSlotUsed = this.isSlotUsed(deck);
        
        if (this.isEmpty === true){
            
            const isCollidingWithMouse = mouse.isCollidingWithSlot(this);
            const isLeftClick          = mouse.leftClick;
            const isLeftClickPrevious  = mouse.previousStateLeft;
    
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

                    else if (isLeftClick === false && isSlotSelected === false && isLeftClickPrevious){
                        
                        this.state = SlotsState.SELECTED;
                    }
                    break;

                case SlotsState.SELECTED:
                    
                    if (isLeftClick === false && isLeftClickPrevious && isCollidingWithMouse){
                        
                        this.state = SlotsState.NOT_SELECTED;
                    }
                    break;
            
                default:

                    break;
            }
        }
    }

    isSlotSelected(grid){

        let result = false;
        
        for (let i = 0; i < grid.slots.length; i++){

            for (let j = 0; j < grid.slots[0].length; j++){

                const slot = grid.slots[i][j];

                if (slot.state === SlotsState.SELECTED){
                    
                    result = true;
                    return result;
                }
            }
        }

        return result;
    }
    
    isSlotUsed(deck){

        let result = false;
        console.log(deck.cards.length);
        for (let i = 0; i < deck.cards.length; i++){

            const slot = grid.slots[i][j];

            if (slot.state === SlotsState.SELECTED){
                
                result = true;
                return result;
            }
        }

        return result;
    }
}