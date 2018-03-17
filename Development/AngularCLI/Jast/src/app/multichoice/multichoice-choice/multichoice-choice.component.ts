import { Content } from './../../model/content.model';
import { Component, OnInit, Input, Output, EventEmitter, NgModule } from '@angular/core';

@Component({
  selector: 'app-multichoice-choice',
  templateUrl: './multichoice-choice.component.html',
  styleUrls: ['./multichoice-choice.component.css']
})
export class MultichoiceChoiceComponent{

    @Input() isEnabled: boolean;
    @Input() check: boolean;
    @Input() content: Content = new Content();
    @Output() correctGuess = new EventEmitter<number>();
    @Output() wrongGuess = new EventEmitter<number>();
    @Output() givenUp = new EventEmitter<number>();

    isCorrect: boolean=false;
    isWrong: boolean=false;
    isGivenUp: boolean=false;
    isDone: boolean=false;
    guessedContent: string="";
    mistakes: number=0;
    newString: string;
    contents: string[] = [];
    contentcheck: boolean[] =[];
    answer: string[] =[];
    count:number =0;
    

    ngDoCheck(): void {
        if(this.content.geloestVon != undefined)
        {
          this.isDone =true;
        }
     }
    giveUp() {
        this.isGivenUp=true;
        this.guessedContent=this.content.input2;
        this.givenUp.emit(0);
    }
     searchSpaces()
        {
            this.newString = " ";
            if(this.contents.length == 0){
            for(var i = 0;i<this.content.input2.length;i++)
            {
                let str = this.content.input2[i];
                if(this.content.input2[i+1] != undefined)
                {
                   let str = this.content.input2[i]+ this.content.input2[i+1];
                }
                
                let str2 = this.content.input2[i-1]+ this.content.input2[i];
                if(str == "/+"|| str == "/-"||str2 == "/+"|| str2 == "/-")
                {
                    if(this.content.input2[i] == '/'||this.content.input2[i] == '+'||this.content.input2[i] == '-')
                    {
                        if(this.content.input2[i] == '+'){
                            this.contents[this.count]=this.newString;
                            this.contentcheck[this.count] = true;
                            this.count++;
                            this.newString = "";
                        }
                        else if(this.content.input2[i] == '-')
                        {
                            this.contents[this.count]=this.newString;
                            this.contentcheck[this.count] = false;
                            this.count++;
                            this.newString ="";
                        }
                    }
                }
                else
                {
                    if(this.content.input2[i] !== "/")
                    {
                        this.newString += this.content.input2[i];
                    }

                }
                
            }
            }
            return true;

        }

        checkForm(c:boolean, con:string)
        {
            if(c)
            {
                this.isDone = c;
                for(var i=0 ; i< this.contents.length ; i++)
                {
                    if(this.contentcheck[i]) // == seine eingabe
                    {
                        this.answer[i] = "Richtig";
                    }
                    else
                    {
                        this.answer[i] = "Falsch";
                    }
                }
            }
            return c;
        }

        constructor()
        {
            this.searchSpaces();
        }
}
