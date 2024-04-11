import Timer from "./Timer.js";
import { TimerId } from "./constants.js";

export default class TimerContainer{

    constructor(){

        this.timer = [];
    }

    create(){

        // Crear Timer
        const timer = new Timer(60, 1, TimerId.TURN_TIMER);
        this.timer.push(timer);
    }

    update(timerId){
        
        for (let i = 0; i < this.timer.length; i++){
            
            const timer = this.timer[i];

            if (timer.timerId === timerId){

                timer.update();
                return timer.value;
            }
        }
    }

    restartTimerValue(timerId){

        for (let i = 0; i < this.timer.length; i++){
            
            const timer = this.timer[i];

            if (timer.timerId === timerId){

                timer.restart();
            }
        }
    }
}