
import Phase from "./Phase.js";
import { AttackEvent } from "../../Events/phase_events/AttackEvent.js";
import { CardId, MovePhaseStates, SlotsState } from "../../constants.js";

export default class MinionMovementPhase extends Phase{

    constructor(activeMinionDeck, enemyActiveMinionDeck, mouse){
        super();
        this.activeMinionDeck       = activeMinionDeck;         // Deck de minions activos
        this.enemyActiveMinionDeck  = enemyActiveMinionDeck;    // Deck de minions activos del rival
        this.mouse                  = mouse;                    // Objeto Mouse
        this.state                  = MovePhaseStates.NONE;     // Estado de la fase
    }

 
    // funcion para realizar el ataque
    attack(){

        let isAnyCardSelected;
        let isEnemyCardSelected;
        

        if(!this.mouse.leftClick && this.mouse.previousStateLeft){
            // Comprobar si hay alguna carta seleccionada del mazo de minions activos
            isAnyCardSelected   = this.activeMinionDeck.isAnyCard(this.activeMinionDeck, CardId.SELECTED);

            this.mouse.leftClick = false;
        }

        if(!this.mouse.leftClick && this.mouse.previousStateLeft && isAnyCardSelected != undefined){

            // Comprobar si hay alguna carta seleccionada del mazo de minions activos del rival
            isEnemyCardSelected = this.enemyActiveMinionDeck.isAnyCard(this.enemyActiveMinionDeck, CardId.SELECTED);
        }

        // Comprobar si hay enemigo seleccionado
        if(isEnemyCardSelected !== undefined){

            if(isEnemyCardSelected[0]){

                // Escoger las posiciones de las cartas en los decks
                const attacckerPosition = isAnyCardSelected[1];
                const enemyPosition     = isEnemyCardSelected[1];

                // Minion atacante
                const attacker  = this.activeMinionDeck.cards[attacckerPosition];

                // Minion rival
                const enemy     = this.enemyActiveMinionDeck.cards[enemyPosition];

                // Calcular distancia en slots [0] -> distancia en slots x [1] -> distancia en slots y
                const distance = this.calculateDistance(attacker, enemy);

                if(attacker.type === "Melee" && distance[0] < 2 && distance[1] < 2){

                    // Ejecucion del evento de ataque
                    const attackEvent = new AttackEvent(attacker, enemy);
                    attackEvent.execute();

                    // cambio el estado de la propia fase --> he metido estados a esta fase por que se puede mover y atacar.
                    this.state = MovePhaseStates.NONE;

                    return true;

            }else{
          
                attacker.state = CardId.NOT_SELECTED;
                enemy.state    = CardId.NOT_SELECTED;
                
   
                return false;
                }
            }

           
       
        }

        return false;
    }

    calculateDistance(attacker, enemy){
        const boardSlotXSize = 133;     // Ancho del slot en X
        const boardSlotYSize = 155;     // Alto del slot en Y

        const xPosAttacker  = attacker.xPos;    // Posicion en x del Atacante
        const xPosEnemy     = enemy.xPos;       // Posicion en x Del rival
        const yPosAttacker  = attacker.yPos;    // Posicion en y Atacante
        const yPosEnemy     = enemy.yPos;       // Posicion en y del rival

        // Calcular la diferencia en píxeles en slots
        const xDifference = Math.abs(xPosAttacker - xPosEnemy);
        const yDifference = Math.abs(yPosAttacker - yPosEnemy);

        // Calcular la distancia en  slots
        const distanceXSlots = Math.ceil(xDifference / boardSlotXSize);
        const distanceYSlots = Math.ceil(yDifference / boardSlotYSize); 


        return [distanceXSlots, distanceYSlots];
    }



    update(state){
        
        this.state = state;
        
        switch(this.state){

            case MovePhaseStates.MOVE:
                // añadir logica para el movimiento
                break;
            
            case MovePhaseStates.ATTACK:
                let aux = this.attack();
                return aux;
                // Añadir logica para ataque
                break;
        }
    }
}
