import Armor from "./cards_category/Armor.js";
import Buff from "./cards_category/Buff.js";
import Curse from "./cards_category/Curse.js";
import Joseph from "./cards_category/Joseph.js";
import MainCharacter from "./cards_category/MainCharacter.js";
import Minion from "./cards_category/Minion.js";
import Spell from "./cards_category/Spell.js";
import Weapon from "./cards_category/Weapon.js";
import { CardId, IconsId, ImageTypes, RarityId, TypeId } from "../constants.js";


export default class CardFactory {

    constructor(cardData, images) {
        this.cardData = cardData;
        this.images   = images
        this.cards    = []
    }


    createCards() {
        let card

        for (let i = 0; i < this.cardData.length; i++) {
            const id = this.cardData[i].card_id;
            const name = [this.cardData[i].name, this.cardData[i].izena];
            const description = [this.cardData[i].description, this.cardData[i].deskripzioa];
            const rarity = this.setRarity(this.cardData[i].rarity)
            const category = this.cardData[i].category
            const type = this.cardData[i].type;
            const image = [this.images[ImageTypes.CARD_IMAGE][CardId.BIG_SIZE][id-1], this.images[ImageTypes.CARD_IMAGE][CardId.SMALL_SIZE][id-1] ]
            const imageRarity = this.images[ImageTypes.CARD_RARITY][rarity]
            const imageBorders = [this.images[ImageTypes.CARD_BORDER][CardId.BIG_SIZE], this.images[ImageTypes.CARD_BORDER][CardId.SMALL_SIZE]]
            const weaponRarityImage = this.images[ImageTypes.EQUIP_RARITY]
            const armorRarityImage = this.images[ImageTypes.EQUIP_RARITY]
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
                        card = this.createArmor(id, name, description, image, rarity, TypeId.ARMOR, xPos, yPos, attributes, imageRarity, imageAttributes, imageBorders, imageCategory);
                        this.cards.push(card)

                    }
                    break;

                case "Buff_card":
                    imageAttributes = [this.images[ImageTypes.CARD_ICONS][IconsId.COOLDOWN], this.images[ImageTypes.CARD_ICONS][IconsId.DURABILITY], this.images[ImageTypes.CARD_ICONS][IconsId.DEFENSE], this.images[ImageTypes.CARD_ICONS][IconsId.DAMAGE]]
                    imageCategory = this.images[ImageTypes.CARD_TYPE][TypeId.BUFF]
                    for (let i = 0; i < quantity; i++) {
                        card = this.createBuff(id, name, description, image, rarity, TypeId.BUFF, xPos, yPos, attributes, imageRarity, imageAttributes, imageBorders, imageCategory);
                        this.cards.push(card)
                    }
                    break;

                case "Curse_card":
                    imageAttributes = [this.images[ImageTypes.CARD_ICONS][IconsId.COOLDOWN], this.images[ImageTypes.CARD_ICONS][IconsId.DURABILITY], this.images[ImageTypes.CARD_ICONS][IconsId.DEFENSE], this.images[ImageTypes.CARD_ICONS][IconsId.DAMAGE]]
                    imageCategory = this.images[ImageTypes.CARD_TYPE][TypeId.CURSE]
                    for (let i = 0; i < quantity; i++) {
                        card = this.createCurse(id, name, description, image, rarity, TypeId.CURSE, xPos, yPos, attributes, imageRarity, imageAttributes, imageBorders, imageCategory);
                        this.cards.push(card)
                    }
                    break;

                case "Joseph_card":
                    imageCategory = this.images[ImageTypes.CARD_TYPE][TypeId.JOSEPH]
                    for (let i = 0; i < quantity; i++) {
                        card = this.createJoseph(id, name, description, image, rarity, TypeId.JOSEPH, type, xPos, yPos, effects, imageRarity, imageAttributes, imageBorders, imageCategory)
                        this.cards.push(card)

                    }
                    break;

                case "Hero_card":
                    imageCategory = this.images[ImageTypes.CARD_TYPE][TypeId.HERO]
                    for (let i = 0; i < quantity; i++) {
                        card = this.createMainCharacter(id, name, description, image, rarity, TypeId.HERO, type, xPos, yPos, imageRarity, imageAttributes, imageBorders, imageCategory, effects)
                        card.size = CardId.SMALL_SIZE
                        this.cards.push(card)
                    }
                    break;

                case "Minion_card":
                    imageAttributes = [this.images[ImageTypes.CARD_ICONS][IconsId.DEFENSE], this.images[ImageTypes.CARD_ICONS][IconsId.SPEED], this.images[ImageTypes.CARD_ICONS][IconsId.LIFE], this.images[ImageTypes.CARD_ICONS][IconsId.DAMAGE]]
                    imageCategory = this.images[ImageTypes.CARD_TYPE][TypeId.MINION]
                    for (let i = 0; i < quantity; i++) {
                        card = this.createMinion(id, name, description, image, rarity, TypeId.MINION,"Melee", xPos, yPos, attributes, imageRarity, imageAttributes, imageBorders, imageCategory, weaponRarityImage, armorRarityImage);
                        this.cards.push(card)
                    }
                    break;

                case "Spell_card":
                    imageAttributes = [this.images[ImageTypes.CARD_ICONS][IconsId.COOLDOWN], this.images[ImageTypes.CARD_ICONS][IconsId.DURABILITY], this.images[ImageTypes.CARD_ICONS][IconsId.DEFENSE], this.images[ImageTypes.CARD_ICONS][IconsId.DAMAGE]]
                    imageCategory = this.images[ImageTypes.CARD_TYPE][TypeId.SPELL]
                    for (let i = 0; i < quantity; i++) {
                        card = this.createSpell(id, name, description, image, rarity, TypeId.SPELL, type, xPos, yPos, attributes, imageRarity, imageAttributes, imageBorders, imageCategory);
                        this.cards.push(card)
                    }
                    break;

                case "Weapon_card":
                    imageAttributes = [this.images[ImageTypes.CARD_ICONS][IconsId.COOLDOWN], this.images[ImageTypes.CARD_ICONS][IconsId.DURABILITY], this.images[ImageTypes.CARD_ICONS][IconsId.DEFENSE], this.images[ImageTypes.CARD_ICONS][IconsId.DAMAGE]]
                    imageCategory = this.images[ImageTypes.CARD_TYPE][TypeId.WEAPON]
                    for (let i = 0; i < quantity; i++) {
                        card = this.createWeapon(id, name, description, image, rarity, TypeId.WEAPON, type, xPos, yPos, attributes, imageRarity, imageAttributes, imageBorders, imageCategory)
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
    createMinion(id, name, description, image, rarity, category, type, xPos, yPos, attributes, imageRarity, imageAttributes, imageBorders, imageCategory, weaponRarityImage, armorRarityImage) {


        attributes = this.setAttributeValues(attributes)
        let attack  = attributes[IconsId.DAMAGE]
        let defense = attributes[IconsId.DEFENSE]
        let hp = attributes[IconsId.LIFE]
        let speed = attributes[IconsId.SPEED]

        const minion = new Minion(id, name, description, image, rarity, category, type, xPos, yPos,imageRarity, imageAttributes, imageBorders, imageCategory, weaponRarityImage, armorRarityImage, attack, defense, hp, speed);

        return minion

    }


    createArmor(id, name, description, image, rarity, type, xPos, yPos, attributes, imageRarity, imageAttributes, imageBorders, imageCategory) {

        attributes = this.setAttributeValues(attributes)
        let attack = attributes[IconsId.DAMAGE];
        if (!attack) {
            attack = 0
        }
        let health = attributes[IconsId.LIFE]
        if (!health) {
            health = 0
        }
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
        if (!cooldown) {
            cooldown = 0
        }


        const armor = new Armor(id, name, description, image, rarity, type, "Melee", xPos, yPos, imageRarity, imageAttributes, imageBorders, imageCategory, health, attack, defense, speed, durability, cooldown);

        return armor

    }

    createBuff(id, name, description, image, rarity, category, xPos, yPos, attributes, imageRarity, imageAttributes, imageBorders, imageCategory) {
        let attack
        let defense
        let health
        let speed
        let durability
        let cooldown
        if (attributes != null) {
            attack = attributes.attack;
            defense = attributes.defense;
            health = attributes.hp;
            speed = attributes.speed;
            durability = attributes.durability;
            cooldown = attributes.cooldown;

        }

        const buff = new Buff(id, name, description, image, rarity, category,"Ranged", xPos, yPos, attributes, imageRarity, imageAttributes, imageBorders, imageCategory)
        return buff

    }

    createCurse(id, name, description, image, rarity, type, xPos, yPos, attributes, imageRarity, imageAttributes, imageBorders, imageCategory) {
        let attack
        let defense
        let health
        let speed
        let durability
        let cooldown
        if (attributes != null) {
            attack = attributes.attack;
            defense = attributes.defense;
            health = attributes.hp;
            speed = attributes.speed;
            durability = attributes.durability;
            cooldown = attributes.cooldown;

        }

        const curse = new Curse(id, name, description, image, rarity, type, "Ranged", xPos, yPos, imageRarity, imageAttributes, imageBorders, imageCategory, attack, defense, speed, durability, cooldown);

        return curse


    }

    createJoseph(id, name, description, image, rarity, category, type, xPos, yPos, effects, imageRarity, imageAttributes, imageBorders, imageCategory) {
        let armorEffect = effects.Armor;

        const joseph = new Joseph(id, name, description, image, rarity, category, type, xPos, yPos, imageRarity, imageAttributes, imageBorders, imageCategory, armorEffect,)
        return joseph

    }

    createMainCharacter(id, name, description, image, rarity, category, type, xPos, yPos, imageRarity, imageAttributes, imageBorders, imageCategory, effects) {
        let attack = effects.attack;
        let defense = effects.defense;
        let speed = effects.speed;
        let durability = effects.durability;
        let cooldown = effects.cooldown;

        const mainCharacter = new MainCharacter(id, name, description, image, rarity, category, type, xPos, yPos, imageRarity, imageAttributes, imageBorders, imageCategory, durability, cooldown);

        return mainCharacter

    }

    createSpell(id, name, description, image, rarity,category, type, xPos, yPos, attributes, imageRarity, imageAttributes, imageBorders, imageCategory) {
        let attack
        let defense
        let health
        let speed
        let durability
        let cooldown
        if (attributes != null) {
            attack = attributes.attack;
            defense = attributes.defense;
            health = attributes.hp;
            speed = attributes.speed;
            durability = attributes.durability;
            cooldown = attributes.cooldown;

        }

        const spell = new Spell(id, name, description, image, rarity, category, type, xPos, yPos,imageRarity, imageAttributes, imageBorders, imageCategory, durability, cooldown);
        return spell

    }

    createWeapon(id, name, description, image, rarity, category, type, xPos, yPos, attributes, imageRarity, imageAttributes, imageBorders, imageCategory) {
        attributes = this.setAttributeValues(attributes)
        let range = attributes[IconsId.RANGE];
        let attack = attributes[IconsId.DAMAGE];
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
        let weaponType = attributes.weaponType;


        const weapon = new Weapon(id, name, description, image, rarity, category, type, xPos, yPos, imageRarity, imageAttributes, imageBorders, imageCategory, range, attack, defense, speed, durability, cooldown);
        return weapon


    }


    setAttributeValues(attributesArray) {
        let attributesResult = []
        for (let i = 0; i < attributesArray.length; i++) {
            let attribute = attributesArray[i];
            
            if (!attribute) {
                
                
            }
            switch (attribute.attribute_id - 1) {
                case IconsId.DEFENSE:

                    attributesResult[IconsId.DEFENSE] = attribute.attribute_value
                    break;

                case IconsId.DAMAGE:
                    attributesResult[IconsId.DAMAGE] = attribute.attribute_value
                    break;

                case IconsId.LIFE:
                    attributesResult[IconsId.LIFE] = attribute.attribute_value
                    break;

                case IconsId.SPEED:
                    attributesResult[IconsId.SPEED] = attribute.attribute_value
                    break;
                case IconsId.RANGE:
                    attributesResult[IconsId.RANGE] = attribute.attribute_value
                    break;
                case IconsId.DURABILITY:
                    attributesResult[IconsId.DURABILITY] = attribute.attribute_value
                    break;
                case IconsId.COOLDOWN:
                    attributesResult[IconsId.COOLDOWN] = attribute.attribute_value
                    break;

                default:

                    break;
            }
        }
        return attributesResult
    }


}