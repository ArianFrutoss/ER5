import { BorderId, CardActions, CardId, IconsPos } from "../../constants.js";
import Card from "../Card.js";
export default class MainCharacter extends Card{
    constructor(id, texts, image, rarity, category, type, xPos, yPos, imageRarity, imageAttributes, imageBorders, imageCategory, imageReverse, durability, cooldown){
            super(id,texts, image, rarity, category, type, xPos, yPos, imageRarity, imageAttributes, imageBorders, imageCategory, imageReverse);
    
            // Card attributes     		   	
            this.durability = durability;
            this.cooldown   = cooldown; 
            this.player= 0
            	
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
            this.mainCharacterLogic()
        }
        mainCharacterLogic(){
            
        }
        setDeck(deck){
            this.deck = deck
        }
        render(ctx, language, currentTurn){
            ctx.fillStyle = "black"
            let xPos = this.xPos
            let yPos = this.yPos
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

                    // NAME
                        ctx.font = "25px LongaIberica-DEMO";
                        // ctx.fillText(this.name[language],IconsPos.PLAYER_NAME_X[currentTurn], IconsPos.PLAYER_NAME_Y[currentTurn]);

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
                //RARITY ICON
                ctx.drawImage(
                    
                    this.imageRarity,
                    IconsPos.RARITY_X[size] + xPos, IconsPos.RARITY_Y[size] + yPos)
        
        }

        static create(id, texts, image, rarity, category, type, xPos, yPos, imageRarity, imageAttributes, imageBorders, imageCategory, imageReverse, effects) {
            
            let durability = effects.durability;
            let cooldown = effects.cooldown;
    
            const mainCharacter = new MainCharacter(id, texts, image, rarity, category, type, xPos, yPos, imageRarity, imageAttributes, imageBorders, imageCategory, imageReverse, durability, cooldown);
    
            return mainCharacter;
    
        }
    }