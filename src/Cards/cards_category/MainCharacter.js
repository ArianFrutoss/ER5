import { BorderId, CardActions, CardId, IconsPos, MainCharacterId, VFXId } from "../../constants.js";
import Card from "../Card.js";
import LucretiaEvent from "../../Events/temp_events/LucretiaEvent.js";
import XGScholarEvent from "../../Events/temp_events/XGScholarEvent.js";
import DecrepitThroneEvent from "../../Events/temp_events/DecrepitThroneEvent.js";
import AngeloDiMortisEvent from "../../Events/temp_events/AngeloDiMortisEvent.js";
export default class MainCharacter extends Card{
    constructor(id, texts, image, rarity, category, type, xPos, yPos, imageRarity, imageAttributes, imageBorders, imageCategory, imageReverse, imageVFX, effect, durability=0, cooldown=0){
            super(id, texts, image, rarity, category, type, xPos, yPos, imageRarity, imageAttributes, imageBorders, imageCategory, imageReverse, imageVFX);
    
            // Card attributes     		   	
            this.durability = durability;
            this.cooldown   = cooldown; 
            this.player     = 0;
            this.effect     = effect;
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
            // this.mainCharacterLogic()
        }

        logic(enemyActiveMinionDeck, activeMinionDeck, turn){

            switch(this.action){
                case CardActions.READY:
                    
                    break;

                case CardActions.APPLY_EVENT:
                    console.log("apply Event");
                    this.executeEvents(enemyActiveMinionDeck, activeMinionDeck, turn);
                    this.action = CardActions.ON_USE;
                    break;

                case CardActions.ON_USE:
                  
                    break;

                case CardActions.NOT_ACTIVE:
                    // AL usar la carta hero empowerment activar el efecto
                    this.action = CardActions.APPLY_EVENT;
                    console.log("no active");
                    break;

            }
        }

        executeEvents(enemyActiveMinionDeck, activeMinionDeck, turn){
            const id = this.id;

            switch(id){
                case MainCharacterId.LUCRETIA:
                    const lucretiaEvent = new LucretiaEvent(enemyActiveMinionDeck);
                    lucretiaEvent.execute();
                    break;

                case MainCharacterId.ANGELO:
                    const angeloEvent = new AngeloDiMortisEvent(turn);
                    angeloEvent.execute();
                    break;

                case MainCharacterId.DECREPIT_TRHONE:
                    const decrepitEvent = new DecrepitThroneEvent(enemyActiveMinionDeck, activeMinionDeck);
                    decrepitEvent.execute();
                    break;

                case MainCharacterId.X_G_SCHOLAR:
                    const xGScholarEvent = new XGScholarEvent(activeMinionDeck);
                    xGScholarEvent.execute();
                    break;
            }
        }

        setDeck(deck){
            this.deck = deck
        }
        render(ctx, language, currentTurn){
            ctx.fillStyle = "black"
            let xPos = this.xPos
            let yPos = this.yPos
                ctx.font = "25px LongaIberica-DEMO";
            let cardVFX
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
                    
                        // ctx.fillText(localStorage.getItem("username"), IconsPos.PLAYER_NAME_X[currentTurn], IconsPos.PLAYER_NAME_Y[currentTurn]);

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
                    
                    ctx.setTransform(1, 0, 0, 1, 0, 0);
        
        }

        static create(id, texts, image, rarity, category, type, xPos, yPos, imageRarity, imageAttributes, imageBorders, imageCategory, imageReverse, vfx, effect, attributes) {
            
            let durability;
            let cooldown;
            if (attributes != null) {
                durability = attributes.durability;
                cooldown = attributes.cooldown;

            }

            const mainCharacter = new MainCharacter(id, texts, image, rarity, category, type, xPos, yPos, imageRarity, imageAttributes, imageBorders, imageCategory, imageReverse, vfx, effect, durability, cooldown);
    
            return mainCharacter;
    
        }
    }