import { CardId } from "../../constants.js";
import Card from "../Card.js";

export default class Spell extends Card{

    constructor(id, name, description, image, rarity, type,  xPos, yPos, objective, durability, cooldown){

        super(id, name, description, image, rarity, type, xPos, yPos, objective);

        // Card attributes   
        this.durability = durability;
        this.cooldown   = cooldown;
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
    update(mouse, decks){
        super.update(mouse,decks);
        this.spellLogic()
    }
    spellLogic(){
        
    }
}

