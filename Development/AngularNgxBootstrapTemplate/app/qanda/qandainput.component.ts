import { Content } from './../model/content.model';
import { Component, Input, Output, EventEmitter } from '@angular/core';
@Component(
    {
        selector: 'qandainput',
        templateUrl: 'app/qanda/qandainput.component.html'
    }
)

export class QAndAInputComponent {
    @Input() isEnabled: boolean;
    @Input() content: Content;
    @Output() correctGuess = new EventEmitter<number>();
    @Output() wrongGuess = new EventEmitter<number>();
    @Output() givenUp = new EventEmitter<number>();

    isCorrect: boolean=false;
    isWrong: boolean=false;
    isGivenUp: boolean=false;
    guessedContent: string="";
    mistakes: number=0;

    giveUp() {
        this.isGivenUp=true;
        this.guessedContent=this.content.input2;
        this.givenUp.emit(0);
    }

    checkContent() {
        let words = this.content.input2.toUpperCase().split(", ");
        if (words.indexOf(this.guessedContent.toUpperCase())>=0) {
            this.isCorrect=true;
            this.isWrong=false;
            this.correctGuess.emit(0);
        }
        else {
            this.mistakes++;
            this.isWrong=true;
            this.isCorrect=false;
            this.wrongGuess.emit(0);
        }
    }
}