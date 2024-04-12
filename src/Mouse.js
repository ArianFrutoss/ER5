import { SlotsState } from "./constants.js";
import { BorderId } from "./constants.js";

export default class Mouse {
    
    constructor(canvas){
        this.x              = 0;
        this.y              = 0;
        this.rightClick     = false;
        this.leftClick      = false;
        this.canvas         = canvas;
        this.previousStateLeft  = false;
        this.previousStateRight = false;
    }
    update(){
        this.previousStateLeft  = this.leftClick;
        this.previousStateRight = this.rightClick;
    }
    isCollidingWithCard(card){
        const cardLength = card.size === BorderId.NORMAL_SIZE ? 197.6 : 133
        const cardHeight = card.size === BorderId.NORMAL_SIZE ? 303.2 : 155
        let result
        if (this.x >= card.xPos && this.x <=card.xPos + cardLength) {
            if (this.y >= card.yPos && this.y <=card.yPos + cardHeight) {
                result = true
            } else{
                result = false
            }
        }else{
            result = false
        }
        return result
    }

    static create(canvas){
        
        const mouse = new Mouse(canvas);

        return mouse;
    }

    isCollidingWithButton(button){
        const buttonWidth   = button.width;
        const buttonHeight  = button.height;
  
        let colision;

        if(this.x >= button.x && this.x <= button.x + buttonWidth){

            if(this.y >= button.y && this.y <= button.y + buttonHeight){

                colision = true;
            }else{

                colision = false;
            }

        }else {

            colision = false;
        }

        return colision;
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
        this.x = Math.floor((event.pageX - this.canvas.offsetLeft) * (this.canvas.width / this.canvas.clientWidth));
        this.y = Math.floor((event.pageY - this.canvas.offsetTop) * (this.canvas.height / this.canvas.clientHeight));
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
    
    isCollidingWithSlot(slot){

        let result = false;

        const slotFirstWidthPoint = slot.xPos;
        const slotSecondWidthPoint = slot.xPos + slot.xSize;
        const slotFirstHeigthPoint = slot.yPos;
        const slotSecondHeigthPoint = slot.yPos + slot.ySize;

        if (this.x > slotFirstWidthPoint && this.x < slotSecondWidthPoint && this.y > slotFirstHeigthPoint && this.y < slotSecondHeigthPoint){
            
            result = true;
            return result;
        }

        return result;
    }
}
