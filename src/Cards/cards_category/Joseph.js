import EventContainer from "../../Events/EventContainer.js";
import { DestroyAllMinionsEvent } from "../../Events/phase_events/DestroyAllMinionsEvent.js";
import { BorderId, CardActions, CardId, DecksId, IconsPos, VFXId } from "../../constants.js";
import Card from "../Card.js";

export default class Joseph extends Card{

    constructor(id, texts, image, rarity, category, type, xPos, yPos, imageRarity, imageAttributes, imageBorders, imageCategory, imageReverse,imageVFX, effect, durability){

        super(id,texts, image, rarity, category, type, xPos, yPos, imageRarity, imageAttributes, imageBorders, imageCategory, imageReverse, imageVFX);
        this.deckObjetives
        this.graveyardDeck
        this.eventContainer
        this.effect = effect; // efecto carta joseph
        this.durability = durability
        
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
        this.josephLogic(mouse)
    }
    josephLogic(mouse){
        switch (this.action) {
            case CardActions.READY:
                this.xPos = 1750
                this.yPos = 50
                this.size = CardId.SMALL_SIZE
                this.eventContainer.createJosephEvents(this.deckObjetives, this, mouse)
                this.action = CardActions.ON_USE
                break;

            case CardActions.ON_USE:
                if (this.durability === 0) {
                    this.action = CardActions.WORN_OUT
                }
                break;

            case CardActions.WORN_OUT:
                this.xPos = -500
                this.yPos = -500
                this.size = CardId.BIG_SIZE
                this.graveyardDeck.cards.push(this)
                this.deck.cards.pop()
                this.deck = this.graveyardDeck
                break;
                
            default:
                break;
        }
    }
    setObjetive(decks){
        this.deckObjetives = decks
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
                if (this.deck.deckId=== DecksId.PLAYER_1_HAND_DECK || this.deck.deckId === DecksId.PLAYER_2_HAND_DECK) {
                    yPos-=100 
                }
                cardVFX = this.imageVFX[VFXId.SELECTED][size]
                ctx.drawImage(
                    cardVFX,                 //Img File
                    IconsPos.VFX_X[size] + xPos,IconsPos.VFX_Y[size] + yPos                    //X & Y Position Source
                    )
            }else if(this.state === CardId.HOVER){
                if (this.deck.deckId=== DecksId.PLAYER_1_HAND_DECK || this.deck.deckId === DecksId.PLAYER_2_HAND_DECK) {
                    yPos-=100 
                }
                cardVFX = this.imageVFX[VFXId.HOVER][size]
                ctx.drawImage(
                    cardVFX,                 //Img File
                    IconsPos.VFX_X[size] + xPos,IconsPos.VFX_Y[size] + yPos                    //X & Y Position Source
                    )
            }
            ctx.drawImage(
                this.image[size],                 //Img File
                xPos,yPos                    //X & Y Position Source
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
                        this.texts.render(ctx, xPos, yPos, language);
                        
                        //CATEGORY ICON
                        ctx.drawImage(
                            this.imageCategory,
                            IconsPos.CATEGORY_X + xPos, IconsPos.CATEGORY_Y + yPos)
                    }
            //RARITY ICON
            ctx.drawImage(
                
                this.imageRarity,
                IconsPos.RARITY_X[size] + xPos, IconsPos.RARITY_Y[size] + yPos)
            } else {
                ctx.drawImage(
                    this.imageReverse,
                     xPos, yPos)
            }
                ctx.setTransform(1, 0, 0, 1, 0, 0);
            
    }

    static create(id, texts, image, rarity, category, type, xPos, yPos, imageRarity, imageAttributes, imageBorders, imageCategory, imageReverse, vfx, effect, attributes){
        const cooldown = attributes[0].attribute_value
        const joseph = new Joseph(id, texts, image, rarity, category, type, xPos, yPos, imageRarity, imageAttributes, imageBorders, imageCategory, imageReverse, vfx, effect, cooldown);

        return joseph;
    }
}
