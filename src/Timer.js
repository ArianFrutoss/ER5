import globals from "./globals.js";

export default class Timer{

    constructor (value, timerChangeValue, timerId){

        this.value               = value;               // Valor del temporizador
        this.previousValue       = value                // Valor inicial del Temporizador
        this.timerChangeCounter  = 0;                   // Temporizador para cambiar valor
        this.timerChangeValue    = timerChangeValue;    // Tiempo para cambiar valor (seconds)
        this.timerId             = timerId              // Id del temporizador
    }

    update(){

        if (this.value <= 0){
            
            // Reseteamos el Timer
            this.value = this.previousValue;
        }

        // Incrementamos el contador de cambio de valor
        this.timerChangeCounter += globals.deltaTime;

        // Si ha pasado el tiempo necesario, cambiamos el valor del timer
        if (this.timerChangeCounter > this.timerChangeValue){

            this.value--;

            // Reseteamos timeChangeCounter
            this.timerChangeCounter = 0;
        }
    }
}