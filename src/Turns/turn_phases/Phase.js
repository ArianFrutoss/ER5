
export default class Phase {

    constructor(mouse){

        this.mouse  = mouse;
    }

    createPhases(){

        const defaultPhase          = "defaultPhase";
        const discardPhase          = "discardPhase";
        const drawCardPhase         = "drawCardPhase";
        const minionMovementPhase   = "minionMovementPhase";
        const prepareEventPhase     = "prepareEventPhase";
        const useEventPhase         = "useEventPhase";

        const phasesArray = [defaultPhase, discardPhase, drawCardPhase, minionMovementPhase, prepareEventPhase, useEventPhase];

        return phasesArray;
    }
}