import { Component, DoCheck, Input, EventEmitter, Output } from '@angular/core';
import { Content } from '../../model/content.model';

@Component({
  selector: 'app-clozeinput',
  templateUrl: './clozeinput.component.html',
  styleUrls: ['./clozeinput.component.css']
})
export class ClozeinputComponent implements DoCheck {
    @Input() isEnabled: boolean;
    @Input() content: Content;
    @Input() check: boolean;
    @Output() correctGuess = new EventEmitter<number>();
    @Output() wrongGuess = new EventEmitter<number>();
    @Output() givenUp = new EventEmitter<number>();

    isCorrect: boolean=false;
    isWrong: boolean=false;
    isGivenUp: boolean=false;
    isDone: boolean=false;
    guessedContent: string="";
    mistakes: number=0;
    some : string;

    ngDoCheck(): void {
      
    }
  giveUp() {
      this.isGivenUp=true;
      this.guessedContent=this.content.input2;
      this.givenUp.emit(0);
  }
  test:boolean=false;
  checkContent() {

      let words = this.content.input2.toUpperCase().split(", ");
      if (words.indexOf(this.guessedContent.toUpperCase())>=0) {
          this.isCorrect=true;
          this.isWrong=false;
          this.correctGuess.emit(this.content.id);
      }
      else {
          this.mistakes++;
          this.isWrong=true;
          this.isCorrect=false;
          this.wrongGuess.emit(0);
      }
  }

  validation(check:boolean)
  {
      
      if(check == true)
      {
        
        if(this.guessedContent != this.content.input2)
        {
            this.isWrong = true;
            this.isCorrect = false;
        }
        else
        {
            this.isWrong = false;
            this.isCorrect = true;
        }
        this.isEnabled=true;
        
      }
      return false;
  }
}