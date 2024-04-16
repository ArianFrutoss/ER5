import { IconsPos, LanguageId } from "./constants.js";
import Line from "./Line.js";

export default class Text{

    constructor(text, language, type){

        this.text       = text;
        this.language   = language;
        this.type       = type;

    }


    render(ctx, xPos, yPos){
  
        switch(this.type){

            case IconsPos.NAME:
                ctx.font = "15px LongaIberica-DEMO";
                ctx.fillText(this.text, xPos + IconsPos.NAME_X, yPos + IconsPos.NAME_Y);
                break;
            
            case IconsPos.DESCRIPTION:
                ctx.font = "13px LongaIberica-DEMO";

                const lines = this.initText(this.text, 32);

                for(let i = 0; i < lines.length; i++){
                    
                    const sentence = lines[i];

                    ctx.fillText(sentence.text, xPos + IconsPos.DESCRIPTION_X, yPos + sentence.yPos + IconsPos.DESCRIPTION_Y);
                }
                break;
        }
    }

    initText(text, lettersQuantity) {
        // const lines = Math.ceil(text.length / lettersQuantity)
        const words = text.split(" ");
        let lines   = [];
        let line    = "";
        let returnLines = [];

        for (let i = 0; i < words.length; i++){

            const word = words[i];
            if ((line + word ).length < lettersQuantity){

                line += (word + " ");

                if ((i+1) === words.length) {

                    lines.push(line)
                    break;
                }

            } else {

                lines.push(line);
                line = "";
                line += word + " ";
    
            }
        }
    
        for (let i = 0; i < lines.length; i++) {
            const lineText  = lines[i]
            const xPos      = 60
            const yPos      = 80 + 17 * i
    
            const line      = new Line(xPos, yPos, lineText)
            
            // globals.lines.push(line)
            
            returnLines.push(line);
        }

        return returnLines;
    }
}