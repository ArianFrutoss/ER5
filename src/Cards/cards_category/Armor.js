import { BorderId, CardActions, CardId, IconsPos, IconsId, VFXId, StatsId, DecksId} from "../../constants.js";
import Card from "../Card.js";

export default class Armor extends Card{
    constructor(id, texts, image, rarity, category, type, xPos, yPos, imageRarity, imageAttributes, imageBorders, imageCategory, imageReverse,imageVFX, health, attack, defense, speed, durability, cooldown){
        
        super(id, texts, image, rarity, category, type, xPos, yPos, imageRarity, imageAttributes, imageBorders, imageCategory, imageReverse, imageVFX);

            this.health     = health;
            this.attack     = attack;
            this.defense    = defense;
            this.speed      = speed;	
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
        this.armorLogic()
    }
    armorLogic(){
        
    }
    setDeck(deck){
        this.deck = deck
    }
    checkDurability(){
        if (this.durability <= 0) {
            this.action = CardActions.WORN_OUT
        }
    }
    render(ctx, language){
        ctx.fillStyle = "black"
        let xPos = this.xPos
        let yPos = this.yPos
        ctx.font = "25px LongaIberica-DEMO";
        let cardVFX
        if (this.deck.deckId === DecksId.PLAYER_1_HAND_DECK || this.deck.deckId === DecksId.PLAYER_2_HAND_DECK) {
            ctx.setTransform(0.8, 0, 0, 0.8, 0, 0);
            for (let i = 0; i < this.deck.cards.length; i++) {
                const card = this.deck.cards[i];
                if (this === card) {
                    xPos = this.xPos * 1.25
                    yPos = this.yPos * 1.25
                }
            }
        }
        if (this.state != CardId.BLOCKED) {
            //CARD IMAGE
            let size = this.size
            if (this.state === CardId.SCALED ) {
                ctx.setTransform(1.6, 0, 0, 1.6, 0, 0);
                xPos = 475
                yPos = 140
                size = CardId.BIG_SIZE
                
            }else if(this.state === CardId.SELECTED){
                cardVFX = this.imageVFX[VFXId.SELECTED][size]
                ctx.drawImage(
                    cardVFX,                 //Img File
                    IconsPos.VFX_X[size] + xPos,IconsPos.VFX_Y[size] + yPos                    //X & Y Position Source
                    )
            }else if(this.state === CardId.HOVER){
                cardVFX = this.imageVFX[VFXId.HOVER][size]
                ctx.drawImage(
                    cardVFX,                 //Img File
                    IconsPos.VFX_X[size] + xPos,IconsPos.VFX_Y[size] + yPos                    //X & Y Position Source
                    )
            }
            if (this.deck.deckId === DecksId.PLAYER_1_PREPARING_EVENT_DECK || this.deck.deckId === DecksId.PLAYER_2_PREPARING_EVENT_DECK) {
                let xTemp = xPos
                let yTemp = yPos
                if (this.state != CardId.SCALED) {
                    ctx.setTransform(0.366, 0, 0, 0.38, 0, 0);
                    xTemp = xPos * 2.734
                    yTemp = yPos * 2.638
                    size = CardId.EVENT_SIZE
                }
                    ctx.drawImage(
                        this.image[CardId.BIG_SIZE],                 //Img File
                        xTemp, yTemp                    //X & Y Position Source
                        )
                        
                if (this.state != CardId.SCALED)
                    ctx.setTransform(1, 0, 0, 1, 0, 0);    
                    
                
            }else{
                
            ctx.drawImage(
                this.image[size],                 //Img File
                xPos, yPos                    //X & Y Position Source
                )
            }    

            if (size != CardId.EVENT_SIZE) {
                // BORDER
                ctx.drawImage(
                    this.imageBorders[size],
                    xPos, yPos)
                    if (this.state === CardId.SCALED) {
                        console.log(size);
                        
                    }
                //RARITY ICON
                ctx.drawImage(
                    this.imageRarity,
                    IconsPos.RARITY_X[size] +      xPos, IconsPos.RARITY_Y[size] + yPos)
                
            }
                
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
                            IconsPos.CATEGORY_X + xPos, IconsPos.CATEGORY_Y + yPos)
                    }
                //ATTRIBUTES ICONS & VALUES
                ctx.drawImage(
                    this.imageAttributes[0],
                    IconsPos.FIRST_ICON_X[size] + xPos, IconsPos.FIRST_ICON_Y[size] + yPos)

                ctx.fillText(Math.ceil(this.cooldown), IconsPos.FIRST_ICON_NUMBER_X[size] + xPos, IconsPos.FIRST_ICON_NUMBER_Y[size] + yPos);
   
                ctx.drawImage(
                    this.imageAttributes[1],
                    
                    IconsPos.SECOND_ICON_X[size] + xPos, IconsPos.SECOND_ICON_Y[size] + yPos)
                ctx.fillText(this.durability, IconsPos.SECOND_ICON_NUMBER_X[size] + xPos, IconsPos.SECOND_ICON_NUMBER_Y[size] + yPos);

                ctx.drawImage(
                    this.imageAttributes[2],
                    IconsPos.THIRD_ICON_X[size] + xPos, IconsPos.THIRD_ICON_Y[size] + yPos)
                ctx.fillText(this.defense, IconsPos.THIRD_ICON_NUMBER_X[size] + xPos, IconsPos.THIRD_ICON_NUMBER_Y[size] + yPos);

                ctx.drawImage(
                    this.imageAttributes[3],
                    IconsPos.FOURTH_ICON_X[size] + xPos, IconsPos.FOURTH_ICON_Y[size] + yPos)
                ctx.fillText(this.attack, IconsPos.FOURTH_ICON_NUMBER_X[size] + xPos, IconsPos.FOURTH_ICON_NUMBER_Y[size] + yPos);
            } else {
                
                ctx.drawImage(
                    this.imageReverse,
                     xPos, yPos)
            }
            
                ctx.setTransform(1, 0, 0, 1, 0, 0);
            
    }

    static create(id, texts, image, rarity, type, xPos, yPos, attributes, imageRarity, imageAttributes, imageBorders, imageCategory, imageReverse, vfx,){
        
    let attack = attributes[StatsId.DAMAGE];
        if (!attack) {
            attack = 0
        }
        let health = attributes[StatsId.LIFE]
        if (!health) {
            health = 0
        }
        let defense = attributes[StatsId.DEFENSE];
        if (!defense) {
            defense = 0
        }
        let speed = attributes[StatsId.SPEED];
        if (!speed) {
            speed = 0
        }
        let durability = attributes[StatsId.DURABILITY];

        let cooldown = attributes[StatsId.COOLDOWN];
        if (!cooldown) {
            cooldown = 0
        }


        const armor = new Armor(id, texts, image, rarity, type, "Melee", xPos, yPos, imageRarity, imageAttributes, imageBorders, imageCategory, imageReverse, vfx, health, attack, defense, speed, durability, cooldown);

        return armor;
    }
}        



