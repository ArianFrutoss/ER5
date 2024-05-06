import Timer from "./Timer.js";
import { PhaseStates, TimerId } from "./constants.js";

export default class TimerContainer{

    constructor(){

        this.timer = [];
    }

    create(){

        // Crear Timer
        const turnTimer = new Timer(10, 1, TimerId.TURN_TIMER);
        const discardTimer = new Timer(30, 1, TimerId.DISCARD_TIMER);

        const timers = [turnTimer, discardTimer];

        for (let i = 0; i < timers.length; i++){

            this.timer.push(timers[i]);
        }
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
    render(ctx, phase){

        switch (phase){

            case PhaseStates.DEFAULT:
            case PhaseStates.ATTACK:
            case PhaseStates.MOVEMENT:
            case PhaseStates.PREPARE_EVENT:
            case PhaseStates.USE_EVENT_CARD:
            case PhaseStates.DRAW_CARD:
                this.timer[TimerId.TURN_TIMER].render(ctx);
                break;

            case PhaseStates.DISCARD_CARD:
                this.timer[TimerId.DISCARD_TIMER].render(ctx);
                break;

            default:
                break;
        }
    }
}