import { IconsPos } from "./constants.js";
import Line from "./Line.js";

export default class Text{

    constructor(text, language, type, size, lettersQuantity, lineSpace, lines, maxWidth){

        this.text               = text;
        this.language           = language;
        this.type               = type;
        this.size               = size;
        this.lettersQuantity    = lettersQuantity;
        this.lineSpace          = lineSpace;
        this.lines              = lines;
        this.maxWidth           = maxWidth;
    }


    render(ctx, xPos, yPos){
  
        switch(this.type){

            case IconsPos.NAME:
                ctx.font = this.size + "px LongaIberica-DEMO";

                const names = this.initCardText();
                
                for (let i = 0; i < names.length; i++){
                    
                    const name = names[i];

                    ctx.fillText(name.text, xPos + IconsPos.NAME_X, yPos + IconsPos.NAME_Y);
                }
                break;
            
            case IconsPos.DESCRIPTION:
                ctx.font = this.size + "px LongaIberica-DEMO";

                const lines = this.initCardText();

                for (let i = 0; i < lines.length; i++){
                    
                    const sentence = lines[i];

                    ctx.fillText(sentence.text, xPos + IconsPos.DESCRIPTION_X, yPos + sentence.yPos + IconsPos.DESCRIPTION_Y);
                }
                break;
        }
    }

    initCardText(){
            
        const words = this.text.split(" ");
        const lines = [];
        const returnLines = [];
        let line = "";

        for (let j = 0; j < words.length; j++){

            const word = words[j];
            const textWidth = this.lettersQuantity * this.size;
            const maxLettersQuantity = this.calculateLettersQuantity(words);
            
            if (maxLettersQuantity < this.lettersQuantity * this.lines && textWidth < this.maxWidth){

                if ((line + word ).length < this.lettersQuantity){
                    
                    line += (word + " ");

                    if ((j+1) === words.length) {

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
    
        for (let j = 0; j < lines.length; j++){

            const lineText  = lines[j];
            const xPos      = 60;
            const modifier  = 8 * (4 - lines.length); 
            const yPos      = 80 + modifier + 15 * j;
            const line      = new Line(xPos, yPos, lineText);
            
            returnLines.push(line);
        }

        return returnLines;
    }

    initMessageText(){
        
        for (let i = 0; i < this.text.length; i++){

            for (let j = 0; j < this.text[i].length; j++){
                
                const text = this.text[i][j];
                const words = text.split(" ");
                const lines = [];
                const returnLines = [];
                let line = "";

                for (let k = 0; k < words.length; k++){

                    const word = words[k];
                    const textWidth = this.lettersQuantity * this.size;
                    const maxLettersQuantity = this.calculateLettersQuantity(words);
                    
                    if (maxLettersQuantity < this.lettersQuantity * this.lines && textWidth < this.maxWidth){

                        if ((line + word ).length < this.lettersQuantity){
                            
                            line += (word + " ");

                            if ((k+1) === words.length) {

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
            
                for (let k = 0; k < lines.length; k++){

                    const lineText  = lines[k];
                    const xPos      = 60;
                    const modifier  = 8 * (4 - lines.length); 
                    const yPos      = 80 + modifier + 15 * k;
                    const line      = new Line(xPos, yPos, lineText);
                    
                    returnLines.push(line);
                }

                text = returnLines;
            }
        }
    }

    calculateLettersQuantity(words){

        let maxLettersQuantity = 0;

        for (let i = 0; i < words.length; i++){

            const word = words[i];
            
            maxLettersQuantity += word.length;
        }

        return maxLettersQuantity;
    }
}