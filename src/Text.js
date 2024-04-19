import { IconsPos } from "./constants.js";
import Line from "./Line.js";

export default class Text{

    constructor(text, type, size, lettersQuantity, lineSpace, lines, maxWidth){

        this.text               = text;
        this.type               = type;
        this.size               = size;
        this.lettersQuantity    = lettersQuantity;
        this.lineSpace          = lineSpace;
        this.lines              = lines;
        this.maxWidth           = maxWidth;
    }

    render(ctx, xPos, yPos, language){
        
        switch(this.type){

            case IconsPos.NAME:
                ctx.font = this.size + "px LongaIberica-DEMO";

                const names = this.initText(language);
                
                for (let i = 0; i < names.length; i++){
                    
                    const name = names[i];

                    ctx.fillText(name.text, xPos + IconsPos.NAME_X, yPos + IconsPos.NAME_Y);
                }
                break;
            
            case IconsPos.DESCRIPTION:
                ctx.font = this.size + "px LongaIberica-DEMO";

                const lines = this.initText(language);

                for (let i = 0; i < lines.length; i++){
                    
                    const line = lines[i];

                    ctx.fillText(line.text, xPos + IconsPos.DESCRIPTION_X, yPos + line.yPos + IconsPos.DESCRIPTION_Y);
                }
                break;
        }
    }

    initText(language){

        const words = this.text[language].split(" ");
        const lines = [];
        const returnLines = [];
        let line = "";

        for (let i = 0; i < words.length; i++){

            const word = words[i];
            const textWidth = this.lettersQuantity * this.size;
            const maxLettersQuantity = this.calculateLettersQuantity(words);
            
            if (this.lettersQuantity === null){

                this.lettersQuantity = maxLettersQuantity;
            }

            if (maxLettersQuantity <= this.lettersQuantity * this.lines && textWidth <= this.maxWidth){

                if ((line + word ).length < this.lettersQuantity){
                    
                    line += (word + " ");

                    if ((i+1) === words.length) {

                        lines.push(line);
                        break;
                    }

                } else {

                    lines.push(line);
                    line = "";
                    line += word + " ";
                }
            }

            else{
                
                if (textWidth < this.maxWidth){

                    this.lettersQuantity += 5;
                }
                
                else{

                    this.size -= 1;
                    this.lineSpace -= 10;
                }
            }
        }
    
        for (let i = 0; i < lines.length; i++){

            const lineText  = lines[i];
            const xPos      = 60;
            const modifier  = 8 * (4 - lines.length); 
            const yPos      = 80 + modifier + 15 * i;
            const line      = new Line(xPos, yPos, lineText);
            
            returnLines.push(line);
        }
console.log(returnLines);
        return returnLines;
    }

    calculateLettersQuantity(words){

        let maxLettersQuantity = 0;

        for (let i = 0; i < words.length; i++){

            const word = words[i];
            
            maxLettersQuantity += (" " + word).length;
        }

        return maxLettersQuantity;
    }
}