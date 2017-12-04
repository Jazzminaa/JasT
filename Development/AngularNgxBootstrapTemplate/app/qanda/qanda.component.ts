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

    quiz: Quiz; 
    contents: Content[];
    quizId: number=0;
    _content: Content;
    counter: number = 0;
    inputValue: string = "";
    solutionIsCorrect:boolean = false;
    actualSolutions : string[] = [];

    counterCorr: number = 0;
    counterError: number = 0;

    @Output() correct = new EventEmitter<boolean>();

    @Input()
    set content(value : Content){
        this._content = value;
        this.actualSolutions = this._content.input2.split(" ");
    }
    get content(){
        return this._content;
    }
       
    constructor(private router: Router,  private route: ActivatedRoute, private dataService: DataService)  {
        
    }

     ngOnInit() {
        this.route.params.switchMap((params: Params) => params['id']).subscribe(p=>this.quizId=+p);
        this.getAllContent();
     }

     getAllContent()
     {
        this.dataService.getContentById(this.quizId).subscribe(data =>{
        this.contents = data;
      })
     }

     check(){
        if(this.actualSolutions.indexOf(this.inputValue) >= 0 || this._content.input2.indexOf(this.inputValue) == 0){
            this.solutionIsCorrect = true;
            this.correct.emit(true);
        }
        else
            this.counter++;
            this.correct.emit(false);
    }

    countCorrect(correct : boolean){
        if(correct ==true)
            this.counterCorr++;
        else  
            this.counterError++;
    } 
}
