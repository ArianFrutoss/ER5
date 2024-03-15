
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
    
    
    
    
}
