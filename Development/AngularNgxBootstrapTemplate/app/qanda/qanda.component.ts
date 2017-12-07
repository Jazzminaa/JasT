import { Content } from './../model/content.model';
import { Quiz } from './../model/quiz.model';
import { OnInit, Component, Output, Input, EventEmitter } from '@angular/core';
import { DataService } from './../shared/data.service';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component(
    {
        selector: 'qanda',
        templateUrl: 'app/qanda/qanda.component.html'
    }
)
export class QAndAComponent implements OnInit {
       
        contents: Content[];
        correctCounter: number=0;
        wrongCounter: number=0;
        givenUpCounter: number=0;
        actIndex: number=0;
    
        getPoints() {
        return this.correctCounter*2-this.wrongCounter-this.givenUpCounter*2;
        }

        ngOnInit(): void {
        this.dataService.getContentById(1).subscribe
            (data=>{this.contents=data;},
            error=>{alert("Laden der Fragen fehlgeschlagen: "+error)})
        }

        givenUp(index: number) {
        this.actIndex=index+1;
        this.givenUpCounter++;
        }

        correctGuess(index: number) {
        this.actIndex=index+1;
        this.correctCounter++;
        }

        wrongGuess() {
        this.wrongCounter++;
        }


        constructor(private dataService: DataService, router: Router) {

        }

}
