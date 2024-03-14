export function canvasMousemoveHandler(event, canvas, mouse){

    //PREGUNTAR A OSCAR/ MIGUEL SOBRE EL CANVAS DE ESTA FUNCION
    // const canvas = document.getElementById('gameScreen');
    // Find the mouse's X and Y positions on the canvas
    mouse.x = event.pageX - canvas.offsetLeft;
    mouse.y = event.pageY - canvas.offsetTop;
}
export function mouseDown(e, mouse) {
    e = e 
    switch (e.which) {
      case 1: mouse.leftClick = true;
        break;
      case 3: mouse.rightClick = true;
    }
  } 


export function mouseUp(mouse){
    mouse.leftClick = false;
    mouse.rightClick= false;

}


