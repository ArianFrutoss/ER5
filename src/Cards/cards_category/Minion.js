import { CardId, RarityId } from "../../constants.js";
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
        this.minionLogic()
    }
    minionLogic() {
        if (this.state === CardId.DEAD) {
            this.xPos = -500
            this.yPos = -500
        }
    }
}

