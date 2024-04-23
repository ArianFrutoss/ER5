import { BorderId, CardActions, CardId, IconsPos, MainCharacterId, TurnStates, VFXId } from "../../constants.js";
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
            this.lucretiaEvent          = null;
            this.angeloEvent            = null;
            this.xGScholarEvent         = null;
            this.decrepitTrhoneEvent    = null;
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
            console.log(this.action);

            switch(this.action){
                case CardActions.READY:
                    // console.log("ready");
                    // AL usar la carta hero empowerment activar el efecto

                    break;

                case CardActions.APPLY_EVENT:
                    console.log("aplicar evento");
                    this.executeEvents(enemyActiveMinionDeck, activeMinionDeck, turn);
                    this.action = CardActions.ON_USE;
                    break;

                case CardActions.ON_USE:
                    if(turn.state === TurnStates.INITIALIZE && this.id !== MainCharacterId.DECREPIT_TRHONE && this.id !== MainCharacterId.ANGELO){

                        this.action = CardActions.APPLY_EVENT;
                    }
                    break;

                case CardActions.NOT_ACTIVE:
                    this.action = CardActions.APPLY_EVENT;
                    // NO HACE NADA
                    break;
                
                case CardActions.WORN_OUT:
                    console.log("entro aqui");
                    break;

                case CardActions.REMOVE_EVENT:
                    console.log("entro a remove event");
                    this.removeEvents();
                    break;
            }
        }

        executeEvents(enemyActiveMinionDeck, activeMinionDeck, turn){
            const id = this.id;

            switch(id){
                case MainCharacterId.LUCRETIA:
                    this.lucretiaEvent = new LucretiaEvent(enemyActiveMinionDeck);
                    this.lucretiaEvent.execute();
                    break;

                case MainCharacterId.ANGELO:
                    this.angeloEvent = new AngeloDiMortisEvent(turn);
                    this.angeloEvent.execute();
                    break;

                case MainCharacterId.DECREPIT_TRHONE:
                    this.decrepitTrhoneEvent = new DecrepitThroneEvent(enemyActiveMinionDeck, activeMinionDeck);
                    this.decrepitTrhoneEvent.execute();
                    break;

                case MainCharacterId.X_G_SCHOLAR:
                    this.xGScholarEvent = new XGScholarEvent(activeMinionDeck);
                    this.xGScholarEvent.execute();
                    break;
            }
        }

        removeEvents(){
            const id = this.id;

            switch(id){
                case MainCharacterId.LUCRETIA:
             
                    break;

                case MainCharacterId.ANGELO:
                    console.log("quito el efecto angelo");
                    this.angeloEvent.remove();
                    this.action = CardActions.WORN_OUT;
                    break

                case MainCharacterId.DECREPIT_TRHONE:
                    console.log("quito efecto silla");
                    this.decrepitTrhoneEvent.remove();
                    this.action = CardActions.WORN_OUT;
                    break;
                
                case MainCharacterId.X_G_SCHOLAR:
            
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

                        if (size === BorderId.NORMAL_SIZE) {
                  
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