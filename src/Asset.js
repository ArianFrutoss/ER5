import globals from "./globals.js";
import { ImageTypes } from "./constants.js"

export default class Asset {

    static loadImages() {

        let images = []

        images[ImageTypes.CARD_IMAGE] = Asset.prototype.loadCardImages();
        images[ImageTypes.CARD_BORDER] = Asset.prototype.loadCardBorders();
        images[ImageTypes.CARD_ICONS] = Asset.prototype.loadCardIcons();
        images[ImageTypes.CARD_RARITY] = Asset.prototype.loadCardRarity();
        images[ImageTypes.EQUIP_RARITY] = Asset.prototype.loadEquipmentRarity();
        images[ImageTypes.GAME_RARITY] = Asset.prototype.loadGameRarity();
        images[ImageTypes.CARD_TYPE] = Asset.prototype.loadCardType();
        images[ImageTypes.BOARD_IMAGE] = Asset.prototype.loadBackground();

        return images
    }

    loadBackground() {

        let images = []
        let image

        // Crear Board
        image = new Image();
        image.addEventListener("load", this.loadHandler, false);
        image.src = "../media/images/background/board.png";
        //Preguntar si el globals.images es necesario
        images.push(image);
        globals.images.push(image)
        globals.assetsToLoad.push(image);

        // Crear Event Deck Full
        image = new Image();
        image.addEventListener("load", this.loadHandler, false);
        image.src = "../media/images/background/event_deck_full.png";
        //Preguntar si el globals.images es necesario
        images.push(image);
        globals.images.push(image)
        globals.assetsToLoad.push(image);

        // Crear Event Deck Half
        image = new Image();
        image.addEventListener("load", this.loadHandler, false);
        image.src = "../media/images/background/event_deck_half.png";
        //Preguntar si el globals.images es necesario
        images.push(image);
        globals.images.push(image)
        globals.assetsToLoad.push(image);
        
        // Crear Event Deck Empty
        image = new Image();
        image.addEventListener("load", this.loadHandler, false);
        image.src = "../media/images/background/event_deck_empty.png";
        //Preguntar si el globals.images es necesario
        images.push(image);
        globals.images.push(image)
        globals.assetsToLoad.push(image);

        // Crear Minion Deck Full
        image = new Image();
        image.addEventListener("load", this.loadHandler, false);
        image.src = "../media/images/background/minion_deck_full.png";
        //Preguntar si el globals.images es necesario
        images.push(image);
        globals.images.push(image)
        globals.assetsToLoad.push(image);

        // Crear Minion Deck Half
        image = new Image();
        image.addEventListener("load", this.loadHandler, false);
        image.src = "../media/images/background/minion_deck_half.png";
        //Preguntar si el globals.images es necesario
        images.push(image);
        globals.images.push(image)
        globals.assetsToLoad.push(image);

        // Crear Minion Deck Empty
        image = new Image();
        image.addEventListener("load", this.loadHandler, false);
        image.src = "../media/images/background/minion_deck_empty.png";
        //Preguntar si el globals.images es necesario
        images.push(image);
        globals.images.push(image)
        globals.assetsToLoad.push(image);

        // Crear Gema
        image = new Image();
        image.addEventListener("load", this.loadHandler, false);
        image.src = "../media/images/background/gem.png";
        //Preguntar si el globals.images es necesario
        images.push(image);
        globals.images.push(image)
        globals.assetsToLoad.push(image);

        return images
    }

    loadCardImages() {
        let images = []
        let image

        //Ejemplo de crear una carta
        image = new Image();
        image.addEventListener("load", this.loadHandler, false);
        image.src = "../media/images/cards_img/drum_master.png";
        //Preguntar si el globals.images es necesario
        images.push(image);
        globals.images.push(image)
        globals.assetsToLoad.push(image);
        return images
    }

    loadCardBorders() {
        let images = []
        let image
        //Ejemplo de crear una carta
        image = new Image();
        image.addEventListener("load", this.loadHandler, false);
        image.src = "../media/images/others/border_card.png";
        //Preguntar si el globals.images es necesario
        images.push(image);
        globals.images.push(image)
        globals.assetsToLoad.push(image);
        return images
    }

    loadCardIcons() {
        let images = []
        let image

        //Ejemplo de crear una carta
        image = new Image();
        image.addEventListener("load", this.loadHandler, false);
        image.src = "../media/images/icons/damage.png";
        images.push(image);
        globals.images.push(image)
        globals.assetsToLoad.push(image);

        //Ejemplo de crear una carta
        image = new Image();
        image.addEventListener("load", this.loadHandler, false);
        image.src = "../media/images/icons/defense.png";
        images.push(image);
        globals.images.push(image)
        globals.assetsToLoad.push(image);

        //Ejemplo de crear una carta
        image = new Image();
        image.addEventListener("load", this.loadHandler, false);
        image.src = "../media/images/icons/hp.png";
        images.push(image);
        globals.images.push(image)
        globals.assetsToLoad.push(image);
        

        //Ejemplo de crear una carta
        image = new Image();
        image.addEventListener("load", this.loadHandler, false);
        image.src = "../media/images/icons/speed.png";
        images.push(image);
        globals.images.push(image)
        globals.assetsToLoad.push(image);

        //Ejemplo de crear una carta
        image = new Image();
        image.addEventListener("load", this.loadHandler, false);
        image.src = "../media/images/icons/weapon2.png";
        images.push(image);
        globals.images.push(image)
        globals.assetsToLoad.push(image);

        //Ejemplo de crear una carta
        image = new Image();
        image.addEventListener("load", this.loadHandler, false);
        image.src = "../media/images/icons/durability.png";
        images.push(image);
        globals.images.push(image)
        globals.assetsToLoad.push(image);

        //Ejemplo de crear una carta
        image = new Image();
        image.addEventListener("load", this.loadHandler, false);
        image.src = "../media/images/icons/cooldown.png";
        images.push(image);
        globals.images.push(image)
        globals.assetsToLoad.push(image);



        return images
    }

    loadCardRarity() {
        let images = []
        let image
        //Ejemplo de crear una carta
        image = new Image();
        image.addEventListener("load", this.loadHandler, false);
        image.src = "../media/images/icons/common_card.png";
        images.push(image);
        globals.images.push(image)
        globals.assetsToLoad.push(image);

        //Ejemplo de crear una carta
        image = new Image();
        image.addEventListener("load", this.loadHandler, false);
        image.src = "../media/images/icons/rare_card.png";
        images.push(image);
        globals.images.push(image)
        globals.assetsToLoad.push(image);

        //Ejemplo de crear una carta
        image = new Image();
        image.addEventListener("load", this.loadHandler, false);
        image.src = "../media/images/icons/epic_card.png";
        images.push(image);
        globals.images.push(image)
        globals.assetsToLoad.push(image);

        //Ejemplo de crear una carta
        image = new Image();
        image.addEventListener("load", this.loadHandler, false);
        image.src = "../media/images/icons/legendary_card.png";
        images.push(image);
        globals.images.push(image)
        globals.assetsToLoad.push(image);

        return images
    }

    loadEquipmentRarity() {
        let images = []
        let image

        //Ejemplo de crear una carta
        image = new Image();
        image.addEventListener("load", this.loadHandler, false);
        image.src = "../media/images/icons/void_equip.png";
        images.push(image);
        globals.images.push(image)
        globals.assetsToLoad.push(image);

        //Ejemplo de crear una carta
        image = new Image();
        image.addEventListener("load", this.loadHandler, false);
        image.src = "../media/images/icons/common_equip.png";
        images.push(image);
        globals.images.push(image)
        globals.assetsToLoad.push(image);

        //Ejemplo de crear una carta
        image = new Image();
        image.addEventListener("load", this.loadHandler, false);
        image.src = "../media/images/icons/rare_equip.png";
        images.push(image);
        globals.images.push(image)
        globals.assetsToLoad.push(image);

        //Ejemplo de crear una carta
        image = new Image();
        image.addEventListener("load", this.loadHandler, false);
        image.src = "../media/images/icons/epic_equip.png";
        images.push(image);
        globals.images.push(image)
        globals.assetsToLoad.push(image);

        //Ejemplo de crear una carta
        image = new Image();
        image.addEventListener("load", this.loadHandler, false);
        image.src = "../media/images/icons/legendary_equip.png";
        images.push(image);
        globals.images.push(image)
        globals.assetsToLoad.push(image);

        return images

    }

    loadGameRarity() {
        let images = []
        let image
        //Ejemplo de crear una carta
        image = new Image();
        image.addEventListener("load", this.loadHandler, false);
        image.src = "../media/images/icons/common_rarity.png";
        images.push(image);
        globals.images.push(image)
        globals.assetsToLoad.push(image);

        //Ejemplo de crear una carta
        image = new Image();
        image.addEventListener("load", this.loadHandler, false);
        image.src = "../media/images/icons/rare_rarity.png";
        images.push(image);
        globals.images.push(image)
        globals.assetsToLoad.push(image);

        //Ejemplo de crear una carta
        image = new Image();
        image.addEventListener("load", this.loadHandler, false);
        image.src = "../media/images/icons/epic_rarity.png";
        images.push(image);
        globals.images.push(image)
        globals.assetsToLoad.push(image);

        //Ejemplo de crear una carta
        image = new Image();
        image.addEventListener("load", this.loadHandler, false);
        image.src = "../media/images/icons/legendary_rarity.png";
        images.push(image);
        globals.images.push(image)
        globals.assetsToLoad.push(image);

        return images
    }

    loadCardType() {
        let images = []
        let image
        //Ejemplo de crear una carta
        image = new Image();
        image.addEventListener("load", this.loadHandler, false);
        image.src = "../media/images/icons/minion.png";
        images.push(image);
        globals.images.push(image)
        globals.assetsToLoad.push(image);

        //Ejemplo de crear una carta
        image = new Image();
        image.addEventListener("load", this.loadHandler, false);
        image.src = "../media/images/icons/curse.png";
        images.push(image);
        globals.images.push(image)
        globals.assetsToLoad.push(image);

        //Ejemplo de crear una carta
        image = new Image();
        image.addEventListener("load", this.loadHandler, false);
        image.src = "../media/images/icons/buff.png";
        images.push(image);
        globals.images.push(image)
        globals.assetsToLoad.push(image);


        return images
    }

    loadHandler() {

        globals.assetsLoaded++; //Adds 1 to the counter

        //Once all Elements are loaded
        if (globals.assetsLoaded === globals.assetsToLoad.length) {

            //Removes Load Event Listener
            for (let i = 0; i < globals.images.length; i++) {
                globals.images[i].removeEventListener("load", this.loadHandler, false)

            }

            // for (let i = 0; i < globals.sounds.length; i++) {
            //     globals.sounds[i].removeEventListener("canplaythrough", loadHandler, false)

            // }
            console.log("Assets loaded")

        }
    }

}