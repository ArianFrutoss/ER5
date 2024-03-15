import { SlotsState } from "./constants.js";

export default class Mouse {
    
    constructor(canvas){
        this.x              = 0;
        this.y              = 0;
        this.rightClick     = false;
        this.leftClick      = false;
        this.canvas         = canvas;
    }

    static create(canvas){
        
        const mouse = new Mouse(canvas);

        return mouse;
    }

    assignAddEventListeners(){

        this.canvas.addEventListener("mousemove", this.canvasMousemoveHandler.bind(this), false);
        this.canvas.addEventListener("mousedown", this.mouseDown.bind(this), false);
        this.canvas.addEventListener("mouseup", this.mouseUp.bind(this), false);
        
        document.oncontextmenu = this.disableRightClickMenu
    }

    canvasMousemoveHandler(event){

        //PREGUNTAR A OSCAR/ MIGUEL SOBRE EL CANVAS DE ESTA FUNCION
        // const canvas = document.getElementById('gameScreen');
        // Find the mouse's X and Y positions on the canvas
        this.x = event.pageX - this.canvas.offsetLeft;
        this.y = event.pageY - this.canvas.offsetTop;
    }

    mouseDown(e) {
        e = e 
        switch (e.which) {
          case 1: this.leftClick = true;
            break;
          case 3: this.rightClick = true;
        }
      } 
    
    
    mouseUp(mouse){
        this.leftClick = false;
        this.rightClick= false;
    
    }
    
    disableRightClickMenu() {

        return false
    }
    
    isCollidingWithSlot(grid){

        for (let i = 0; i < grid.slots.length; i++){

            for (let j = 0; j < grid.slots[0].length; j++){

                const slotFirstWidthPoint = grid.slots[i][j].xPos;
                const slotSecondWidthPoint = grid.slots[i][j].xPos + grid.slots[i][j].xSize;
                const slotFirstHeigthPoint = grid.slots[i][j].yPos;
                const slotSecondHeigthPoint = grid.slots[i][j].yPos + grid.slots[i][j].ySize;

                if (this.x > slotFirstWidthPoint && this.x < slotSecondWidthPoint && this.y > slotFirstHeigthPoint && this.y < slotSecondHeigthPoint){
                    
                    return true;
                }
            }
        }
    }
}
