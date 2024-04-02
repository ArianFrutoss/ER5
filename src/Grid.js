import { CardId } from "./constants.js";
import Slot from "./Slot.js";

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

    // Funcion crea un Grid y sus Slots
    static initGrids(xPosGrid, yPosGrid, rowsNum, columnsNum, gridId, xSizeSlots, ySizeSlots){

        // Posicion del Grid
        const gridXPos = xPosGrid;
        const gridYpos = yPosGrid;

        // Filas y Columnas
        const rows = rowsNum;
        const columns = columnsNum;

        // Id del Grid
        const id = gridId;
        
        // Array de Slots para guardar en el Grid
        let slotsArray = [];

        for (let i = 0; i < columns; i++){

            slotsArray[i] = [];
            
            for (let j = 0; j < rows; j++){

                // Tamaño de los Slots
                const slotsXsize = xSizeSlots;
                const slotsYsize = ySizeSlots;

                // Calculo de la posicion de los Slots
                let slotsXPos = Math.floor(gridXPos + slotsXsize * j);
                let slotsYPos = Math.floor(gridYpos + slotsYsize * i);

                // Crear Slots
                const slots = new Slot(slotsXPos, slotsYPos, slotsXsize, slotsYsize);

                slotsArray[i][j] = slots;
            }
        }
        
        // Crear Grid
        return new Grid(gridXPos, gridYpos, id, rows, columns, slotsArray);
    }

    update(mouse, deck){

        for (let i = 0; i < this.slots.length; i++){

            for (let j = 0; j < this.slots[0].length; j++){

                const slot = this.slots[i][j];
                slot.update(mouse, this, deck);
            }
        }
    }

    render(ctx){
                    // Numero de filas y comumnas de los Slots
                    const rows = this.slots.length;
                    const columns = this.slots[0].length;
        
                    for (let j = 0; j < rows; j++) {
        
                        for (let k = 0; k < columns; k++) {
        
                            const slot = this.slots[j][k];
                            slot.render(ctx)
                            
                        }
                    }
    }
    aviableSlots(minionSelected){

        for (let i = 0; i < this.slots.length; i++){

            for (let j = 0; j < this.slots[0].length; j++){

                const slot = this.slots[i][j];
                const distance = slot.calculateDistance(minionSelected);
                
                if (minionSelected.speed >= distance && minionSelected.state === CardId.SELECTED){
                    
                    slot.isAviable = true;
                }
            }
        }
    }

    clearSlots(){

        for (let i = 0; i < this.slots.length; i++){

            for (let j = 0; j < this.slots[0].length; j++){

                const slot = this.slots[i][j];
                slot.isAviable = false;
            }
        }
    }

    isAnySlot(grid,state){

        let result = []
        
        for (let i = 0; i < grid.slots.length; i++){
            
            for (let j = 0; j < grid.slots[0].length; j++){

                const slot = grid.slots[i][j];
                
                if (slot.state === state){

                    result[0] = true;
                    result[1] = i;
                    result[2] = j;
                    return result
                }

                else{

                    result[0] = false;
                }
            }         
        }

        return result
    }
}