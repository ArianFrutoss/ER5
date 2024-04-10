import { BorderId, CardActions, CardId, IconsPos, IconsId } from "../../constants.js";
import Card from "../Card.js";

export default class Weapon extends Card{
    constructor(id, texts, image, rarity, category, type = "Melee", xPos, yPos, imageRarity, imageAttributes, imageBorders, imageCategory, imageReverse, range, attack, defense, speed, durability, cooldown){

        super(id, texts, image, rarity, category, type, xPos, yPos, imageRarity, imageAttributes, imageBorders, imageCategory, imageReverse,);

        // Card attributes   
        this.type           = type;
        this.range          = range;
        this.attack         = attack;
        this.defense        = defense;
        this.speed          = speed;
        this.durability     = durability;
        this.cooldown       = cooldown;
        this.action         = CardActions.NOT_ACTIVE      
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
        this.weaponLogic()
    }
    weaponLogic(){
        switch (this.action) {
            case CardActions.COOLDOWN:
                this.action = this.cooldown === 0 ? CardActions.READY : this.action
                break;
        
            default:
                break;
        }
    }
    setDeck(deck){
        this.deck = deck
    }
    checkDurability(){
        if (this.durability <= 0) {
            this.action = CardActions.WORN_OUT
        }
    }
    removeIfWornOut(activeEventDeck, graveyardDeck){

        this.checkDurability()
        if (this.action === CardActions.WORN_OUT) {
            for (let i = 0; i < activeEventDeck.cards.length; i++) {
                const card = activeEventDeck.cards[i];
                if (card.action === CardActions.WORN_OUT) {
                    activeEventDeck.cards.splice(i, 1)
                    graveyardDeck.cards.push(card)
                    this.setDeck(graveyardDeck)
                    return true
                }
            }  
        }
        return false
    }


    render(ctx, language){
        let xPos = this.xPos
        let yPos = this.yPos
        if (this.state != CardId.BLOCKED) {
            
            ctx.fillStyle = "black"
                ctx.font = "25px LongaIberica-DEMO";
    
                //CARD IMAGE
                let size = this.size
                if (this.state === CardId.SCALED ) {
                    xPos = 800
                    yPos = 300
                    size = CardId.BIG_SIZE
                    
                }
                ctx.drawImage(
                    this.image[size],                 //Img File
                    xPos, yPos                    //X & Y Position Source
                    )
                    
                    
                    // BORDER
                    ctx.drawImage(
                        this.imageBorders[size],
                        xPos, yPos)
    
                        if (size === BorderId.NORMAL_SIZE) {
                            // ctx.font = "25px LongaIberica-DEMO";
                            // ctx.fillText(this.name[language], IconsPos.NAME_X + xPos, IconsPos.NAME_Y + yPos);
                            // ctx.font = "15px LongaIberica-DEMO";
                            // ctx.fillText(this.description[language], IconsPos.DESCRIPTION_X + xPos, IconsPos.DESCRIPTION_Y + yPos);
                            // ctx.font = "25px LongaIberica-DEMO";
                            
                            this.texts.render(ctx, xPos, yPos);

                            //CATEGORY ICON
                            ctx.drawImage(
                                this.imageCategory,
                                IconsPos.CATEGORY_X +      xPos, IconsPos.CATEGORY_Y + yPos)
                        }
                //RARITY ICON
                ctx.drawImage(
                    
                    this.imageRarity,
                    IconsPos.RARITY_X[size] +      xPos, IconsPos.RARITY_Y[size] + yPos)
        
                    //ATTRIBUTES ICONS & VALUES
                    ctx.drawImage(
                        this.imageAttributes[0],
                        IconsPos.FIRST_ICON_X[size] +      xPos, IconsPos.FIRST_ICON_Y[size] + yPos)
    
                    ctx.fillText(this.cooldown, IconsPos.FIRST_ICON_NUMBER_X[size] +       xPos, IconsPos.FIRST_ICON_NUMBER_Y[size] + yPos);
    
                    ctx.drawImage(
                        this.imageAttributes[1],
                        IconsPos.SECOND_ICON_X[size] +     xPos, IconsPos.SECOND_ICON_Y[size] + yPos)
                    ctx.fillText(this.durability, IconsPos.SECOND_ICON_NUMBER_X[size] +    xPos, IconsPos.SECOND_ICON_NUMBER_Y[size] + yPos);
    
                    ctx.drawImage(
                        this.imageAttributes[2],
                        IconsPos.THIRD_ICON_X[size] +      xPos, IconsPos.THIRD_ICON_Y[size] + yPos)
                    ctx.fillText(this.defense, IconsPos.THIRD_ICON_NUMBER_X[size] +    xPos, IconsPos.THIRD_ICON_NUMBER_Y[size] + yPos);
    
                    ctx.drawImage(
                        this.imageAttributes[3],
                        IconsPos.FOURTH_ICON_X[size] +     xPos, IconsPos.FOURTH_ICON_Y[size] + yPos)
                    ctx.fillText(this.attack, IconsPos.FOURTH_ICON_NUMBER_X[size] +    xPos, IconsPos.FOURTH_ICON_NUMBER_Y[size] + yPos);
        } else {
            ctx.drawImage(
                this.imageReverse,
                 xPos, yPos)
        }
    }

    static create(id, texts, image, rarity, category, type, xPos, yPos, attributes, imageRarity, imageAttributes, imageBorders, imageCategory, imageReverse) {

        let range   = attributes[IconsId.RANGE];
        let attack  = attributes[IconsId.DAMAGE];
        let defense = attributes[IconsId.DEFENSE];
        if (!defense) {
            defense = 0
        }
        let speed = attributes[IconsId.SPEED];
        if (!speed) {
            speed = 0
        }
        let durability = attributes[IconsId.DURABILITY];
        let cooldown = attributes[IconsId.COOLDOWN];
        


        const weapon = new Weapon(id, texts, image, rarity, category, type, xPos, yPos, imageRarity, imageAttributes, imageBorders, imageCategory, imageReverse, range, attack, defense, speed, durability, cooldown);
        return weapon;


    }

}
