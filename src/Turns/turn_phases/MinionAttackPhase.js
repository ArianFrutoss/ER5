
import Phase from "./Phase.js";
import { AttackEvent } from "../../Events/phase_events/AttackEvent.js";
import { CardId, MessageState, MessageType, HelpMessagesPos } from "../../constants.js";
import Messages from "../../Messages.js";

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

        if (messages.length === 0 && isAnyCardSelected[0] === false){

            const message = new Messages(HelpMessagesPos.X_POS, HelpMessagesPos.Y_POS, "Select any minion", MessageType.HELP_MESSAGE, MessageState.APPEAR, 0.2, 0.3, null);
            messages[0] = message;
            messages[0].drawMessage = true;
        }
        
        if (messages.length === 0 && isAnyCardSelected[0]){

            const message = new Messages(HelpMessagesPos.X_POS, HelpMessagesPos.Y_POS, "Select any enemy minion to attack", MessageType.HELP_MESSAGE, MessageState.APPEAR, 0.2, 0.3, null);
            messages[0] = message;
            messages[0].drawMessage = false;
        }
        
        if (messages[0].drawMessage && messages.length === 1 && isAnyCardSelected[0]){
            
            messages[0].timeInOn = 0;
        }
        
        // Comprobar si hay enemigo seleccionado
        if (isEnemyCardHovered[0] && !this.mouse.leftClick && this.mouse.previousStateLeft) {
            
            messages[0].timeInOn = 0;

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
        const distanceXSlots = Math.ceil(xDifference / boardSlotXSize);
        const distanceYSlots = Math.ceil(yDifference / boardSlotYSize);

        console.log("Distancia en slots en el eje X:", distanceXSlots);
        console.log("Distancia en slots en el eje Y:", distanceYSlots);
        
        return [distanceXSlots, distanceYSlots];
    }



    execute(messages) {
        
        let aux = this.attack(messages);
        return aux;
    }
}