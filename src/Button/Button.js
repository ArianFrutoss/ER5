import { ButtonState, LanguageId } from "../constants.js";
import ButtonContainer from "./ButtonContainer.js";

export default class Button {

    constructor(id, ctx, x, y, width, height,  text, state, phaseState, renderState, img){
        
        this.id         = id;
        this.ctx        = ctx;
        this.x          = x;
        this.y          = y;
        this.width      = width;
        this.height     = height;
        this.text       = text;
        this.state      = state;
        this.phaseState = phaseState;
        this.color      = "#582900";
        this.img        = img;
}

    render(language){
        if (this.height>70) {
            this.ctx.drawImage(this.img, this.x, this.y)
            
        }

        if (this.state === ButtonState.SELECTED) {
            this.ctx.fillStyle = "#C36F29";
            this.ctx.fillRect(this.x+8, this.y+9, this.width, this.height); // Llamada a la función para dibujar un rectángulo redondeado
            this.ctx.fillStyle = 'rgb(22, 22, 2)';
        }else{
            this.ctx.fillStyle = 'rgb(242, 211, 6)';
        }
        
        // Texto del botón
        
        this.ctx.font           = '20px Trajan Color';
        this.ctx.textAlign      = 'center';
        this.ctx.textBaseline   = 'middle';

        const text = this.text[language].split("\n")
        for (let i = 0; i < text.length; i++) {
            const line = text[i];
            let modifier = 0
            if (text.length >1) {
                modifier = 13
            }
            const xPos = (this.x + this.width / 2) + 8
            const yPos = (this.y + this.height / 2) + 8 + i*25-modifier
            this.ctx.fillText(line, xPos , yPos);

            
        }
       
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

    update(mouse, buttonContainer){

        const state = this.state;
        const isCollidingWithMouse = mouse.isCollidingWithButton(this);
        const isAnyButtonSelected = buttonContainer.isAnyButtonSelected();

        // MAQUINA DE ESTADOS
        switch(state){
            case ButtonState.NOT_SELECTED:
            
                this.state = isCollidingWithMouse ? this.state = ButtonState.HOVER : ButtonState.NOT_SELECTED;
                this.color = "#582900";
                break;

            case ButtonState.HOVER:

                this.state = isCollidingWithMouse ? this.state = ButtonState.HOVER : ButtonState.NOT_SELECTED;
                this.state = !mouse.leftClick && !isAnyButtonSelected && mouse.previousStateLeft ? ButtonState.SELECTED : this.state;
                break;

            case ButtonState.SELECTED:
                
                this.state = !mouse.leftClick && mouse.previousStateLeft && isCollidingWithMouse ? ButtonState.NOT_SELECTED : this.state;
                this.color = "red";
                break;
        }
    }

    deselect(){

        this.state = ButtonState.NOT_SELECTED;
    }
    
}