export default class Timer{

    constructor (value, timerChangeValue){

        this.value               = value;               //Valor del temporizador
        this.timerChangeCounter  = 0;                   //Temporizador para cambiar valor
        this.timerChangeValue    = timerChangeValue;    //Tiempo para cambiar valor (seconds)
    }

    update(){

        //Incrementamos el contador de cambio de valor
        this.timerChangeCounter += globals.deltaTime;

        //Si ha pasado el tiempo necesario, cambiamos el valor del timer
        if (this.timerChangeCounter > this.timerChangeValue){

            this.value--;

            //Reseteamos timeChangeCounter
            this.timerChangeCounter = 0;
        }
    }
}