import { SlotsState } from "./constants.js";

export default class Slot{

    constructor(xPos, yPos, xSize, ySize){

        this.xPos               = xPos;
        this.yPos               = yPos;
        this.xSize              = xSize;
        this.ySize              = ySize;
        this.state              = SlotsState.NOT_SELECTED;
        this.isEmpty            = true;
        this.isAviable          = false;
        this.card;
        this.grid;
    }

    update(mouse, grid, deck){

        const isSlotSelected = this.isSlotSelected(grid);
        this.isSlotUsed(deck);
        
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

    render(ctx){
        // Posicion y tamaño de los Slots
        const slotsXPos = this.xPos;
        const slotsYPos = this.yPos;
        const slotsXSize = this.xSize;
        const slotsYSize = this.ySize;
        if (this.isAviable){
            
            ctx.fillStyle = "green";
        }

        else if (this.state === SlotsState.SELECTED){
            
            ctx.fillStyle = "white";
        }

        else if (this.state === SlotsState.HOVER){
            
            ctx.fillStyle = "purple";
        }

        else{
            ctx.globalAlpha = 0.5;
            ctx.fillStyle = "black";
        }

        ctx.fillRect(slotsXPos, slotsYPos, slotsXSize, slotsYSize);
        ctx.globalAlpha = 1;
        ctx.fillStyle = "black";
    }
    isSlotSelected(grid){
        
        let result = false;
        
        for (let i = 0; i < grid.slots.length; i++){

            for (let j = 0; j < grid.slots[0].length; j++){

                const slot = grid.slots[i][j];

                if (this.state === SlotsState.SELECTED){
                    
                    result = true;
                    return result;
                }
            }
        }

        return result;
    }
    
    isSlotUsed(decks){
        
        if (decks.length === undefined){
                
            for (let j = 0; j < decks.cards.length; j++){

                const card = decks.cards[j];

                if (card.xPos === this.xPos && card.yPos === this.yPos){
                    
                    this.isEmpty = false;
                    this.isAviable = false;
                    this.state = SlotsState.NOT_SELECTED;
                    return;
                }

                else{
                    
                    this.isEmpty = true;
                }
            }
        }

        else{
            

            for (let i = 0; i < decks.length; i++){

                const deck = decks[i];
                
                for (let j = 0; j < deck.cards.length; j++){
                    
                    const card = deck.cards[j];

                    if (card.xPos === this.xPos && card.yPos === this.yPos){
                            
                        this.isEmpty = false;
                        this.isAviable = false;
                        this.state = SlotsState.NOT_SELECTED;
                        return;
                    }
    
                    else{
                        this.isEmpty = true;
                    }
                }
            }
 
        }
    }

    calculateDistance(minion){

        const slotXSize = this.xSize;     // Ancho del slot en x
        const slotYSize = this.ySize;     // Alto del slot en y

        const xPosMinion = minion.xPos;     // Posicion en x del Minion
        const xPosSlot = this.xPos;          // Posicion en x del Slot
        const yPosMinion = minion.yPos;     // Posicion en y del Minion
        const yPosSlot = this.yPos;          // Posicion en y del Slot

        // Calcular la diferencia en píxeles en slots
        const xDifference = Math.abs(xPosMinion - xPosSlot);
        const yDifference = Math.abs(yPosMinion - yPosSlot);
        
        // Calcular la distancia en  slots
        const distanceXSlots = Math.floor(xDifference / slotXSize);
        const distanceYSlots = Math.floor(yDifference / slotYSize);
        return distanceXSlots + distanceYSlots;
    }

    deselect(){

        this.state = SlotsState.NOT_SELECTED;
        this.isAviable = false;
    }
}