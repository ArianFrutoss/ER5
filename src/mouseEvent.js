import globals from "./globals.js";

export function canvasMousedownHandler(event){

    globals.action.mousePressed = true;
}

export function canvasMouseupHandler(event){

    globals.action.mousePressed = false;
}

export function canvasMousemoveHandler(event){

    // Find the mouse's X and Y positions on the canvas
    globals.mouse.x = event.pageX - globals.canvas.offsetLeft;
    globals.mouse.y = event.pageY - globals.canvas.offsetTop;
}