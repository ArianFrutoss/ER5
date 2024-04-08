import { CardActions, CardId, IconsPos, BorderId, TurnId, RarityId, IconsId } from "../../constants.js";
import Card from "../Card.js";

export default class Minion extends Card {

    constructor(id, name, description, image, rarity, category, type, xPos, yPos,imageRarity, imageAttributes, imageBorders, imageCategory, imageReverse, weaponRarityImage, armorRarityImage, attack, defense, health, speed) {

        super(id, name, description, image, rarity, category, type, xPos, yPos, imageRarity, imageAttributes, imageBorders, imageCategory, imageReverse);

        // Card attributes   
        this.attack             = attack;
        this.defense            = defense;
        this.health             = health;
        this.speed              = speed;
        this.weapon             = undefined;
        this.armor              = undefined;
        this.weaponRarityImage  = weaponRarityImage
        this.armorRarityImage   = armorRarityImage
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
    render(ctx, language){
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
                xPos,yPos                    //X & Y Position Source
                )
                
                
                // BORDER
                ctx.drawImage(
                    this.imageBorders[size],
                    xPos, yPos)

                    if (size === BorderId.NORMAL_SIZE) {
                        ctx.font = "25px LongaIberica-DEMO";
                        ctx.fillText(this.name[language], IconsPos.NAME_X + xPos, IconsPos.NAME_Y + yPos);
                        ctx.font = "15px LongaIberica-DEMO";
                        ctx.fillText(this.description[language], IconsPos.DESCRIPTION_X + xPos, IconsPos.DESCRIPTION_Y + yPos);
                        ctx.font = "25px LongaIberica-DEMO";
                        
                        //CATEGORY ICON
                        ctx.drawImage(
                            this.imageCategory,
                            IconsPos.CATEGORY_X + xPos, IconsPos.CATEGORY_Y + yPos)
                    }
            //RARITY ICON
            ctx.drawImage(
                
                this.imageRarity,
                IconsPos.RARITY_X[size] + xPos, IconsPos.RARITY_Y[size] + yPos)
    
                //ATTRIBUTES ICONS & VALUES
                ctx.drawImage(
                    this.imageAttributes[0],
                    IconsPos.FIRST_ICON_X[size] + xPos, IconsPos.FIRST_ICON_Y[size] + yPos)

                ctx.fillText(this.defense, IconsPos.FIRST_ICON_NUMBER_X[size] + xPos, IconsPos.FIRST_ICON_NUMBER_Y[size] + yPos);

                ctx.drawImage(
                    this.imageAttributes[1],
                    IconsPos.SECOND_ICON_X[size] + xPos, IconsPos.SECOND_ICON_Y[size] + yPos)
                ctx.fillText(this.speed, IconsPos.SECOND_ICON_NUMBER_X[size] + xPos, IconsPos.SECOND_ICON_NUMBER_Y[size] + yPos);

                ctx.drawImage(
                    this.imageAttributes[2],
                    IconsPos.THIRD_ICON_X[size] + xPos, IconsPos.THIRD_ICON_Y[size] + yPos)
                ctx.fillText(this.health, IconsPos.THIRD_ICON_NUMBER_X[size] + xPos, IconsPos.THIRD_ICON_NUMBER_Y[size] + yPos);

                ctx.drawImage(
                    this.imageAttributes[3],
                    IconsPos.FOURTH_ICON_X[size] + xPos, IconsPos.FOURTH_ICON_Y[size] + yPos)
                ctx.fillText(this.attack, IconsPos.FOURTH_ICON_NUMBER_X[size] + xPos, IconsPos.FOURTH_ICON_NUMBER_Y[size] + yPos);

                //WEAPON RARITY
                let equipRarityImg
                    if (this.weapon != undefined) {
                        equipRarityImg = this.weaponRarityImage[this.weapon.rarity]
                    } else {
                        equipRarityImg = this.weaponRarityImage[RarityId.NONE]
                    }
                ctx.drawImage(
                    equipRarityImg,
                    IconsPos.WEAPON_X[size] + xPos, IconsPos.WEAPON_Y[size] + yPos)

                //WEAPON RARITY
                    if (this.armor != undefined) {
                        equipRarityImg = this.armorRarityImage[this.armor.rarity]
                    } else {
                        equipRarityImg = this.armorRarityImage[RarityId.NONE]
                    }
                ctx.drawImage(
                    equipRarityImg,
                    IconsPos.ARMOR_X[size] + xPos, IconsPos.ARMOR_Y[size] + yPos)
    }

    static create(id, name, description, image, rarity, category, type, xPos, yPos,imageRarity, imageAttributes, imageBorders, imageCategory, imageReverse, weaponRarityImage, armorRarityImage, attributes){

        
            let attack  = attributes[IconsId.DAMAGE]
            let defense = attributes[IconsId.DEFENSE]
            let hp      = attributes[IconsId.LIFE]
            let speed   = attributes[IconsId.SPEED]
    
            const minion = new Minion(id, name, description, image, rarity, category, type, xPos, yPos,imageRarity, imageAttributes, imageBorders, imageCategory, imageReverse, weaponRarityImage, armorRarityImage, attack, defense, hp, speed);
    
            return minion
    
    }
}

