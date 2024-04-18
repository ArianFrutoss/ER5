
import Text from "./Text.js";
import { LanguageId , IconsPos, messageDefaultPhase, messageDiscardPhase, messageMovimentPhase1, messageMovimentPhase2, messageAttackPhase1, messageAttackPhase2, messagePrepareEventPhase1, messagePrepareEventPhase2, messageUseEventPhase1, messageUseEventPhase2, messageUseEventPhase3 } from "./constants.js";

export default class TextContainer{

    constructor(texts, language){

        this.texts      = texts;
        this.language   = language;
    }

    static createCardText(cardData, language){

        const description   = new Text(cardData.description, LanguageId.ENG, IconsPos.DESCRIPTION, 12, 40, 15, 4, 420);
        const deskripzioa   = new Text(cardData.deskripzioa, LanguageId.EUS, IconsPos.DESCRIPTION, 12, 40, 15, 4, 420);
        const name          = new Text(cardData.name, LanguageId.ENG, IconsPos.NAME, 15, null, 15, 1, 300);
        const izena         = new Text(cardData.izena, LanguageId.EUS, IconsPos.NAME, 15, null, 15, 1, 300);
        const container     = [description, deskripzioa, name, izena];

        return new TextContainer(container, language);
    }

    static createMessageText(){
        
        const defaultPhase          = new Text(messageDefaultPhase, null, null, 14, 40, 15, 4, 320);
        const discardPhase          = new Text(messageDiscardPhase, null, null, 14, 40, 15, 4, 320);
        const movimentPhase1        = new Text(messageMovimentPhase1, null, null, 14, 40, 15, 4, 320);
        const movimentPhase2        = new Text(messageMovimentPhase2, null, null, 14, 40, 15, 4, 320);
        const attackPhase1          = new Text(messageAttackPhase1, null, null, 14, 40, 15, 4, 320);
        const attackPhase2          = new Text(messageAttackPhase2, null, null, 14, 40, 15, 4, 320);
        const prepareEventPhase1    = new Text(messagePrepareEventPhase1, null, null, 14, 40, 15, 4, 320);
        const prepareEventPhase2    = new Text(messagePrepareEventPhase2, null, null, 14, 40, 15, 4, 320);
        const useEventPhase1        = new Text(messageUseEventPhase1, null, null, 14, 40, 15, 4, 320);
        const useEventPhase2        = new Text(messageUseEventPhase2, null, null, 14, 40, 15, 4, 320);
        const useEventPhase3        = new Text(messageUseEventPhase3, null, null, 14, 40, 15, 4, 320);
        const container             = [defaultPhase, discardPhase, movimentPhase1, movimentPhase2, attackPhase1, attackPhase2, prepareEventPhase1, prepareEventPhase2, useEventPhase1, useEventPhase2, useEventPhase3];
        
        for (let i = 0; i < container.length; i++){

            const textContainer = container[i];

            textContainer.initMessageText();
        }

        return new TextContainer(container);
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