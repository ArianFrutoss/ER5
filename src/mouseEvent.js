import globals from "./globals.js";

export function canvasMousedownHandler(event){

    globals.action.mousePressed = true;
}

export function canvasMouseupHandler(event){

    globals.action.mousePressed = false;
}

export function canvasMousemoveHandler(event){

    //PREGUNTAR A OSCAR/ MIGUEL SOBRE EL CANVAS DE ESTA FUNCION
    const canvas = document.getElementById('gameScreen');
    // Find the mouse's X and Y positions on the canvas
    globals.mouse.x = event.pageX - canvas.offsetLeft;
    globals.mouse.y = event.pageY - canvas.offsetTop;
}