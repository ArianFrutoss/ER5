import { SlotsState } from "./constants.js";
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
                let slotsXPos = gridXPos + slotsXsize * j;
                let slotsYPos = gridYpos + slotsYsize * i;

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
}