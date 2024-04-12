
import Text from "./Text.js";
import { LanguageId , IconsPos} from "./constants.js";

export default class TextContainer{

    constructor(texts, language){

        this.texts      = texts;
        this.language   = language;

    }

    static create(cardData, language){

        const description = new Text(cardData.description, LanguageId.ENG, IconsPos.DESCRIPTION);
        const deskripzioa = new Text(cardData.deskripzioa , LanguageId.EUS, IconsPos.DESCRIPTION);
        const name  = new Text(cardData.name, LanguageId.ENG, IconsPos.NAME);
        const izena = new Text(cardData.izena, LanguageId.EUS, IconsPos.NAME);
        const container = [description, deskripzioa, name, izena];

        return new TextContainer(container, language);
    }

    render(ctx, xPos, yPos){
        for(let i = 0; i < this.texts.length; i++){

            const text = this.texts[i];
            
            switch(this.language){

                case LanguageId.ENG:
                    if(text.language === LanguageId.ENG){
                        text.render(ctx, xPos, yPos);
                    }
                    break;

                case LanguageId.EUS:
                    if(text.language === LanguageId.EUS){
                        text.render(ctx, xPos, yPos);
                    }
                    break;
            }
        }
    }
}