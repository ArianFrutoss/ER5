import { BorderId } from "./constants.js";

export default class Mouse {
    
    constructor(){
        this.x              = 0;
        this.y              = 0;
        this.rightClick     = false;
        this.leftClick      = false;
        this.previousStateLeft  = false;
        this.previousStateRight = false;
    }
    update(){
        this.previousStateLeft  = this.leftClick;
        this.previousStateRight = this.rightClick;
    }
    isCollidingWithCard(card){
        const cardLength = card.size === BorderId.NORMAL_SIZE ? 247 : 133
        const cardHeight = card.size === BorderId.NORMAL_SIZE ? 379 : 155
        let result
        if (this.x >= card.xPos && this.x <=card.xPos + cardLength) {
            if (this.y >= card.yPos && this.y <=card.yPos + cardHeight) {
                result = true
            } else{
                result = false
            }
        }else{
            result = false
        }
        return result
    }
}
