export function canvasMousemoveHandler(event, canvas, mouse){

    //PREGUNTAR A OSCAR/ MIGUEL SOBRE EL CANVAS DE ESTA FUNCION
    // const canvas = document.getElementById('gameScreen');
    // Find the mouse's X and Y positions on the canvas
    mouse.x = event.pageX - canvas.offsetLeft;
    mouse.y = event.pageY - canvas.offsetTop;
}

export function canvasMouseLeftClickHandler(mouse){

    mouse.leftClick = true;

}

export function canvasMouseRightClickHandler(mouse){

    mouse.rightClick = true;
}

