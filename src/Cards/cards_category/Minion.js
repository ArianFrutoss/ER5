import { CardActions, CardId, RarityId, BorderId, TurnId } from "../../constants.js";
import Card from "../Card.js";

export default class Minion extends Card {

    constructor(id, name, description, image, rarity, category, type, xPos, yPos, attack, defense, health, speed, weapon = undefined, armor = undefined) {

        super(id, name, description, image, rarity, category, type, xPos, yPos);

        // Card attributes   
        this.attack     = attack;
        this.defense    = defense;
        this.health     = health;
        this.speed      = speed;
        this.weapon     = undefined;
        this.armor      = undefined;
    }
    updateScale(mouse, decks){
        const isAnyCardScaled = this.deck.isAnyCard(decks, CardId.SCALED)
        if (!isAnyCardScaled[0]) {
            const isCollidingWithMouse = mouse.isCollidingWithCard(this)

            switch (this.state) {
                case CardId.NOT_SELECTED:

                    this.state = isCollidingWithMouse ? this.state = CardId.HOVER : CardId.NOT_SELECTED

                    break;

                case CardId.HOVER:
                    this.state = isCollidingWithMouse ? this.state = CardId.HOVER : CardId.NOT_SELECTED
                    this.state = !mouse.rightClick && mouse.previousStateRight ? CardId.SCALED : this.state
                    break;

                case CardId.SELECTED:
                    this.state = !mouse.rightClick && mouse.previousStateRight && isCollidingWithMouse ? CardId.SCALED : this.state
                    // console.log("selected");
                    break;
            }
        } else if (this.state === CardId.SCALED) {
            this.state = !mouse.rightClick && mouse.previousStateRight ? CardId.NOT_SELECTED : this.state
        }
    }
    
    update(mouse, decks) {
            
        const isAnyCardScaled   = this.deck.isAnyCard(decks, CardId.SCALED)
        const isAnyCardSelected = this.deck.isAnyCard(decks, CardId.SELECTED)

        if (!isAnyCardScaled[0]) {
            const isCollidingWithMouse = mouse.isCollidingWithCard(this)
    
            switch (this.state) {
                case CardId.NOT_SELECTED:
                    
                    this.state = isCollidingWithMouse ? this.state = CardId.HOVER : CardId.NOT_SELECTED
                    
                    break;
    
                    case CardId.HOVER:
                        this.state = isCollidingWithMouse   ? this.state = CardId.HOVER : CardId.NOT_SELECTED
                        this.state =
                            !mouse.leftClick    && !isAnyCardSelected[0] && mouse.previousStateLeft      ? CardId.SELECTED            : this.state
                        break;
    
                    case CardId.SELECTED:
                        this.state = 
                            !mouse.leftClick      && mouse.previousStateLeft  && isCollidingWithMouse    ? CardId.NOT_SELECTED        :  this.state
                        // console.log("selected");
                        break;

                    case CardId.SCALED:
        
                        break;
                
                    case CardId.ATTACK:

                        
                        break;
                
                default:
                    break;
            }
        } 
            this.previousState = this.state
        this.minionLogic()
    }
    minionLogic() {
        if (this.state === CardId.DEAD) {
            this.xPos = -500
            this.yPos = -500
        }
    }
    setWeapon(weapon){
        this.weapon = weapon
    }
    setDeck(deck){
        this.deck = deck
    }

    assignMinionToBoardGrid(boardGrid, turn){

        const boardYPos = turn === TurnId.PLAYER_1 ? 4 : 0;
        let aviablePositions = [];
        
        for (let i = 0; i < boardGrid.slots[boardYPos].length; i++){

            const slot = boardGrid.slots[boardYPos][i];

            if (slot.isEmpty){

                aviablePositions.push(i);
            }
        }

        const randomXPos = aviablePositions[Math.floor(Math.random() * aviablePositions.length)];
        
        this.xPos = boardGrid.slots[boardYPos][randomXPos].xPos;
        this.yPos = boardGrid.slots[boardYPos][randomXPos].yPos;
        this.size = BorderId.SMALL_SIZE;
    }
}

