import { ButtonState } from "../constants.js";

export default class Button {

    constructor(ctx, x, y, width, height, text, state, phaseState, color){
        
        this.ctx        = ctx;
        this.x          = x;
        this.y          = y;
        this.width      = width;
        this.height     = height;
        this.text       = text;
        this.state      = state;
        this.phaseState = phaseState;
        this.color      = color;
}

    render(){
        this.ctx.fillStyle = this.color;
        this.roundRect(this.ctx, this.x, this.y, this.width, this.height, 10); // Llamada a la función para dibujar un rectángulo redondeado
        this.ctx.fill();
    
        // Texto del botón
        this.ctx.fillStyle      = '#ffffff';
        this.ctx.font           = '20px Arial';
        this.ctx.textAlign      = 'center';
        this.ctx.textBaseline   = 'middle';
        this.ctx.fillText(this.text, this.x + this.width / 2, this.y + this.height / 2);
    }
    
    // Función para dibujar un rectángulo redondeado
    roundRect(ctx, x, y, width, height, radius) {
        ctx.beginPath();
        ctx.moveTo(x + radius, y);
        ctx.lineTo(x + width - radius, y);
        ctx.arcTo(x + width, y, x + width, y + radius, radius);
        ctx.lineTo(x + width, y + height - radius);
        ctx.arcTo(x + width, y + height, x + width - radius, y + height, radius);
        ctx.lineTo(x + radius, y + height);
        ctx.arcTo(x, y + height, x, y + height - radius, radius);
        ctx.lineTo(x, y + radius);
        ctx.arcTo(x, y, x + radius, y, radius);
        ctx.closePath();
    }

    update(mouse){
        const state = this.state;
   
    
        const isCollidingWithMouse = mouse.isCollidingWithButton(this);
        
        // MAQUINA DE ESTADOS
        switch(state){
            case ButtonState.NOT_SELECTED:
            
                this.state = isCollidingWithMouse ? ButtonState.HOVER : ButtonState.NOT_SELECTED;
                this.color = "#582900";

                break;

            case ButtonState.SELECTED:
                this.color = "red";
                this.state = mouse.rightClick ? ButtonState.NOT_SELECTED : ButtonState.SELECTED;
                break;

            case ButtonState.HOVER:
    
                this.state = isCollidingWithMouse ?  ButtonState.HOVER : ButtonState.NOT_SELECTED;
                this.state = mouse.leftClick ? ButtonState.SELECTED: ButtonState.NOT_SELECTED;
                break;
        }


    }


    
}