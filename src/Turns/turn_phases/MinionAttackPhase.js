import Phase from "./Phase.js";
import { AttackEvent } from "../../Events/phase_events/AttackEvent.js";
import { CardId, PhaseStates, messageAttackPhase1, messageAttackPhase2 } from "../../constants.js";

export default class MinionAttackPhase extends Phase {

    constructor(activeMinionDeck, enemyActiveMinionDeck,activeEventDeck, enemyActiveEventDeck, graveyardDeck, mouse) {
        super();
        this.activeMinionDeck = activeMinionDeck;         // Deck de minions activos
        this.enemyActiveMinionDeck = enemyActiveMinionDeck;    // Deck de minions activos del rival
        this.activeEventDeck = activeEventDeck;
        this.enemyActiveEventDeck = enemyActiveEventDeck;
        this.graveyardDeck  = graveyardDeck;
        this.mouse = mouse;                    // Objeto Mouse
    }


    // funcion para realizar el ataque
    attack(messagesContainer) {

        const decks = [this.activeMinionDeck, this.enemyActiveMinionDeck]
        for (let i = 0; i < decks.length; i++) {
            const deck = decks[i];
            deck.update(this.mouse, decks)
        }

        // Comprobar si hay alguna carta seleccionada del mazo de minions activos
        let isAnyCardSelected = this.activeMinionDeck.isAnyCard(this.activeMinionDeck, CardId.SELECTED);

        // Comprobar si hay alguna carta en hover del mazo de minions activos del rival
        let isEnemyCardHovered = this.enemyActiveMinionDeck.isAnyCard(this.enemyActiveMinionDeck, CardId.HOVER);
        
        const messages = messagesContainer.messages;

        if (isAnyCardSelected[0] === false){

            messagesContainer.activeMessage(messageAttackPhase1);
        }

        if (isAnyCardSelected[0]){

            messagesContainer.activeMessage(messageAttackPhase2);
        }
        
        // Comprobar si hay enemigo seleccionado
        if (isEnemyCardHovered[0] && !this.mouse.leftClick && this.mouse.previousStateLeft) {

            // Escoger las posiciones de las cartas en los decks
            const attackerPosition = isAnyCardSelected[1];
            const enemyPosition = isEnemyCardHovered[1];
            
            // Minion atacante
            const attacker = this.activeMinionDeck.cards[attackerPosition];

            // Minion rival
            const enemy = this.enemyActiveMinionDeck.cards[enemyPosition];
            
            // Calcular distancia en slots [0] -> distancia en slots x [1] -> distancia en slots y
            const distance = this.calculateDistance(attacker, enemy);
            
            if (attacker.type === "Melee" && distance[0] <= 1 && distance[1] <= 1) {

                // Ejecucion del evento de ataque
                const attackEvent = new AttackEvent(attacker, enemy);
                attackEvent.execute(messagesContainer);
                attacker.state = CardId.NOT_SELECTED;
                enemy.state = CardId.NOT_SELECTED;
                if (attacker.weapon != undefined) {
                    const isDestroyed = attacker.weapon.removeIfWornOut(this.activeEventDeck, this.graveyardDeck)
                    if (isDestroyed) {
                        attacker.setWeapon(undefined)
                    }
                }

                if (enemy.armor != undefined) {
                    const isDestroyed = enemy.armor.removeIfWornOut(this.enemyActiveEventDeck, this.graveyardDeck)
                    if (isDestroyed) {
                        enemy.setArmor(undefined)
                    }
                }

                this.removeEnemyIfDead(enemy,enemyPosition)
                return true;
            } else {

                attacker.state = CardId.NOT_SELECTED;
                enemy.state = CardId.NOT_SELECTED;

                console.log("no puedes atacar ");
                return false;
            }
        }

        return false;
    }

    removeEnemyIfDead(enemy, enemyPosition){
        if (enemy.health <= 0) {
            this.enemyActiveMinionDeck.cards.splice(enemyPosition, 1)
            enemy.state =  CardId.DEAD
        }
    }


    calculateDistance(attacker, enemy) {
        const boardSlotXSize = 133;     // Ancho del slot en X
        const boardSlotYSize = 155;     // Alto del slot en Y

        const xPosAttacker = attacker.xPos;    // Posicion en x del Atacante
        const xPosEnemy = enemy.xPos;       // Posicion en x Del rival
        const yPosAttacker = attacker.yPos;    // Posicion en y Atacante
        const yPosEnemy = enemy.yPos;       // Posicion en y del rival

        // Calcular la diferencia en píxeles en slots
        const xDifference = Math.abs(xPosAttacker - xPosEnemy);
        const yDifference = Math.abs(yPosAttacker - yPosEnemy);

        // Calcular la distancia en  slots
        const distanceXSlots = Math.floor(xDifference / boardSlotXSize);
        const distanceYSlots = Math.floor(yDifference / boardSlotYSize);

        console.log("Distancia en slots en el eje X:", distanceXSlots);
        console.log("Distancia en slots en el eje Y:", distanceYSlots);
        
        return [distanceXSlots, distanceYSlots];
    }



    execute(messagesContainer) {
        
        let aux = this.attack(messagesContainer);
        return aux;
    }

    isPhaseCancelled(buttonContainer){
        
        const buttonState = buttonContainer.isAnyButtonSelected();

        if(buttonState === PhaseStates.DEFAULT){

            return true;
        }else {

            return false;
        }

    }
}