import Armor from "./cards_category/Armor.js";
import Buff from "./cards_category/Buff.js";
import Curse from "./cards_category/Curse.js";
import Joseph from "./cards_category/Joseph.js";
import MainCharacter from "./cards_category/MainCharacter.js";
import Minion from "./cards_category/Minion.js";
import Spell from "./cards_category/Spell.js";
import Weapon from "./cards_category/Weapon.js";
import TextContainer from "../TextContainer.js";
import { BorderId, CardId, IconsId, ImageTypes, RarityId, StatsId, TypeId } from "../constants.js";



export default class CardFactory {

    constructor(cardData, images) {
        this.cardData = cardData;
        this.images   = images
        this.cards    = []
    }


    createCards(language) {
        let card

        for (let i = 0; i < this.cardData.length; i++) {
            const id = this.cardData[i].card_id;
            // const name = [this.cardData[i].name, this.cardData[i].izena];
            // const description = [this.cardData[i].description, this.cardData[i].deskripzioa];
            const texts  = TextContainer.create(this.cardData[i], language);

            const rarity = this.setRarity(this.cardData[i].rarity)
            const category = this.cardData[i].category
            const type = this.cardData[i].type;
            const image = [this.images[ImageTypes.CARD_IMAGE][CardId.BIG_SIZE][id-1], this.images[ImageTypes.CARD_IMAGE][CardId.SMALL_SIZE][id-1] ]
            const imageRarity = this.images[ImageTypes.CARD_RARITY][rarity]
            const imageBorders = [this.images[ImageTypes.CARD_BORDER][CardId.BIG_SIZE], this.images[ImageTypes.CARD_BORDER][CardId.SMALL_SIZE]]
            const imageReverse = this.images[ImageTypes.CARD_BORDER][BorderId.REVERSE]
            const vfx = [[this.images[ImageTypes.CARD_BORDER][BorderId.SELECTED], this.images[ImageTypes.CARD_BORDER][BorderId.MINI_SELECTED]], [this.images[ImageTypes.CARD_BORDER][BorderId.HOVER], this.images[ImageTypes.CARD_BORDER][BorderId.MINI_HOVER]]]
            
            const images = this.images[ImageTypes.EQUIP_RARITY]
            let normalSize = []
            let smallSize = []
            for (let i = 0; i < 5; i++) {
                normalSize.push(images[i]);
                smallSize.push(images[i+5])
                
            }
            const weaponRarityImage = [normalSize, smallSize]

            // console.log(weaponRarityImage);
            const armorRarityImage = [normalSize, smallSize]
            let imageCategory 
            let imageAttributes
            // HAY QUE AÑADIR EL TYPE AL CONSTRUCTOR DE  LAS CARTAS
            const quantity = this.cardData[i].quantity
            const xPos = -400;
            const yPos = -400;
            const objective = "objective";
            const attributes = this.cardData[i].attributes;
            const effects = this.cardData[i].common_effect;

            switch (category) {
                case "Armor_card":
                    imageAttributes = [this.images[ImageTypes.CARD_ICONS][IconsId.COOLDOWN], this.images[ImageTypes.CARD_ICONS][IconsId.DURABILITY], this.images[ImageTypes.CARD_ICONS][IconsId.DEFENSE], this.images[ImageTypes.CARD_ICONS][IconsId.DAMAGE]]
                    imageCategory = this.images[ImageTypes.CARD_TYPE][TypeId.ARMOR]
                
                    for (let i = 0; i < quantity; i++) {
                        card = this.createArmor(id, texts, image, rarity, TypeId.ARMOR, xPos, yPos, attributes, imageRarity, imageAttributes, imageBorders, imageCategory, imageReverse, vfx);
                        this.cards.push(card)

                    }
                    break;

                case "Buff_card":
                    imageAttributes = [this.images[ImageTypes.CARD_ICONS][IconsId.COOLDOWN], this.images[ImageTypes.CARD_ICONS][IconsId.DURABILITY], this.images[ImageTypes.CARD_ICONS][IconsId.DEFENSE], this.images[ImageTypes.CARD_ICONS][IconsId.DAMAGE]]
                    imageCategory = this.images[ImageTypes.CARD_TYPE][TypeId.BUFF]
                    for (let i = 0; i < quantity; i++) {
                        // card = this.createBuff(id, texts, image, rarity, TypeId.BUFF, xPos, yPos, attributes, imageRarity, imageAttributes, imageBorders, imageCategory, imageReverse);
                        card = Buff.create(id, texts, image, rarity, TypeId.BUFF, xPos, yPos, attributes, imageRarity, imageAttributes, imageBorders, imageCategory, imageReverse, vfx);
                        this.cards.push(card)
                    }
                    break;

                case "Curse_card":
                    imageAttributes = [this.images[ImageTypes.CARD_ICONS][IconsId.COOLDOWN], this.images[ImageTypes.CARD_ICONS][IconsId.DURABILITY], this.images[ImageTypes.CARD_ICONS][IconsId.DEFENSE], this.images[ImageTypes.CARD_ICONS][IconsId.DAMAGE]]
                    imageCategory = this.images[ImageTypes.CARD_TYPE][TypeId.CURSE]
                    for (let i = 0; i < quantity; i++) {
                        // card = this.createCurse(id, texts, image, rarity, TypeId.CURSE, xPos, yPos, attributes, imageRarity, imageAttributes, imageBorders, imageCategory, imageReverse);
                        card = Curse.create(id, texts, image, rarity, TypeId.CURSE, xPos, yPos, attributes, imageRarity, imageAttributes, imageBorders, imageCategory, imageReverse, vfx);
                        this.cards.push(card)
                    }
                    break;

                case "Joseph_card":
                    imageCategory = this.images[ImageTypes.CARD_TYPE][TypeId.JOSEPH]
                    for (let i = 0; i < quantity; i++) {
                        // card = this.createJoseph(id, texts, image, rarity, TypeId.JOSEPH, type, xPos, yPos, effects, imageRarity, imageAttributes, imageBorders, imageCategory, imageReverse);
                        card = Joseph.create(id, texts, image, rarity, TypeId.JOSEPH, type, xPos, yPos, effects, imageRarity, imageAttributes, imageBorders, imageCategory, imageReverse, vfx);
                        this.cards.push(card)

                    }
                    break;

                case "Hero_card":
                    imageCategory = this.images[ImageTypes.CARD_TYPE][TypeId.HERO]
                    for (let i = 0; i < quantity; i++) {
                        // card = this.createMainCharacter(id, texts, image, rarity, TypeId.HERO, type, xPos, yPos, imageRarity, imageAttributes, imageBorders, imageCategory, imageReverse, effects)
                        card = MainCharacter.create(id, texts, image, rarity, TypeId.HERO, type, xPos, yPos, imageRarity, imageAttributes, imageBorders, imageCategory, imageReverse, vfx, effects);
                        card.size = CardId.SMALL_SIZE
                        this.cards.push(card)
                    }
                    break;

                case "Minion_card":
                    imageAttributes = [this.images[ImageTypes.CARD_ICONS][IconsId.DEFENSE], this.images[ImageTypes.CARD_ICONS][IconsId.SPEED], this.images[ImageTypes.CARD_ICONS][IconsId.LIFE], this.images[ImageTypes.CARD_ICONS][IconsId.DAMAGE]]
                    imageCategory = this.images[ImageTypes.CARD_TYPE][TypeId.MINION]
                    for (let i = 0; i < quantity; i++) {
                        card = this.createMinion(id, texts, image, rarity, TypeId.MINION,"Melee", xPos, yPos, attributes, imageRarity, imageAttributes, imageBorders, imageCategory, imageReverse, vfx, weaponRarityImage, armorRarityImage);
                        this.cards.push(card)
                    }
                    break;

                case "Spell_card":
                    imageAttributes = [this.images[ImageTypes.CARD_ICONS][IconsId.COOLDOWN], this.images[ImageTypes.CARD_ICONS][IconsId.DURABILITY], this.images[ImageTypes.CARD_ICONS][IconsId.DEFENSE], this.images[ImageTypes.CARD_ICONS][IconsId.DAMAGE]]
                    imageCategory = this.images[ImageTypes.CARD_TYPE][TypeId.SPELL]
                    for (let i = 0; i < quantity; i++) {
                        // card = this.createSpell(id, texts, image, rarity, TypeId.SPELL, type, xPos, yPos, attributes, imageRarity, imageAttributes, imageBorders, imageCategory, imageReverse);
                        card = Spell.create(id, texts, image, rarity, TypeId.SPELL, type, xPos, yPos, attributes, imageRarity, imageAttributes, imageBorders, imageCategory, imageReverse, vfx);
                        this.cards.push(card)
                    }
                    break;

                case "Weapon_card":
                    imageAttributes = [this.images[ImageTypes.CARD_ICONS][IconsId.COOLDOWN], this.images[ImageTypes.CARD_ICONS][IconsId.DURABILITY], this.images[ImageTypes.CARD_ICONS][IconsId.DEFENSE], this.images[ImageTypes.CARD_ICONS][IconsId.DAMAGE]]
                    imageCategory = this.images[ImageTypes.CARD_TYPE][TypeId.WEAPON]
                    for (let i = 0; i < quantity; i++) {
                        card = this.createWeapon(id, texts, image, rarity, TypeId.WEAPON, type, xPos, yPos, attributes, imageRarity, imageAttributes, imageBorders, imageCategory, imageReverse, vfx);
                        this.cards.push(card)
                    }
                    break;

                default:
                    break;
            }



        }


    }

    setRarity(rarity) {
        switch (rarity) {
            case 'Common':
                return 0
                break;
            case 'Rare':
                return 1
                break;
            case 'Epic':
                return 2
                break;
            case 'Legendary':
                return 3
                break;

            default:
                return -1
                break;
        }
    }

    createMinion(id, texts, image, rarity, category, type, xPos, yPos, attributes, imageRarity, imageAttributes, imageBorders, imageCategory, imageReverse, vfx, weaponRarityImage, armorRarityImage) {


        attributes = this.setAttributeValues(attributes);
        const minion = Minion.create(id, texts, image, rarity, category, type, xPos, yPos, imageRarity, imageAttributes, imageBorders, imageCategory, imageReverse, vfx, weaponRarityImage, armorRarityImage, attributes);

        return minion

    }


    createArmor(id, texts, image, rarity, type, xPos, yPos, attributes, imageRarity, imageAttributes, imageBorders, imageCategory, imageReverse, vfx) {

        attributes = this.setAttributeValues(attributes)
        
        const armor = Armor.create(id, texts, image, rarity, type, xPos, yPos, attributes, imageRarity, imageAttributes, imageBorders, imageCategory, imageReverse, vfx);

        return armor

    }

 

    createWeapon(id, texts, image, rarity, category, type, xPos, yPos, attributes, imageRarity, imageAttributes, imageBorders, imageCategory, imageReverse, vfx) {
        attributes = this.setAttributeValues(attributes)

        const weapon = Weapon.create(id, texts, image, rarity, category, type, xPos, yPos, attributes, imageRarity, imageAttributes, imageBorders, imageCategory, imageReverse, vfx);
        
        return weapon;
    }


    setAttributeValues(attributesArray) {
        let attributesResult = []
        for (let i = 0; i < attributesArray.length; i++) {
            let attribute = attributesArray[i];
            
            if (!attribute) {
                
                
            }
            switch (attribute.attribute_id - 1) {
                case StatsId.DEFENSE:
                
                    attributesResult[StatsId.DEFENSE] = attribute.attribute_value
                    break;

                case StatsId.DAMAGE:
                    attributesResult[StatsId.DAMAGE] = attribute.attribute_value
                    break;

                case StatsId.LIFE:
                    attributesResult[StatsId.LIFE] = attribute.attribute_value
                    break;

                case StatsId.SPEED:
                    attributesResult[StatsId.SPEED] = attribute.attribute_value
                    break;
                case StatsId.RANGE:
                    attributesResult[StatsId.RANGE] = attribute.attribute_value
                    break;
                case StatsId.DURABILITY:
                    attributesResult[StatsId.DURABILITY] = attribute.attribute_value
                    break;
                case StatsId.COOLDOWN:
                    attributesResult[StatsId.COOLDOWN] = attribute.attribute_value
                    break;

                default:

                    break;
            }
        }
        return attributesResult
    }


}