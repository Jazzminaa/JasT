import { QuizType } from './../model/quiztype.model';
import { Category } from './../model/category.model';
import { Quiz } from './../model/quiz.model';
import { User } from './../model/user.model';
import { Content } from './../model/content.model';
import { Score } from './../model/score.model';
import { DataService } from './../shared/data.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Component, OnInit, AfterViewInit, Input, PipeTransform, Pipe } from '@angular/core';
import { WebsocketService } from '../websocket/websocket-service';

@Component({
  selector: 'memory',
  templateUrl: './memory.component.html',
  styleUrls: ['./memory.component.css']
})
export class MemoryComponent implements OnInit {

    contents: Content[];
    content: Content = new Content;
    correctCounter: number=0;
    wrongCounter: number=0;
    givenUpCounter: number=0;
    actIndex: number=0;
    finalPoints: number=0;
    score: Score;
    user: User;
    display: string;
    quizId: number;
    categoryId: number;
    selQuiz: Quiz;
    selQuizType: QuizType;
    selCategory: Category;
    newString: string = "";
    check:boolean = false;

    //#region  Memory Variables
    contentsmixed:string[]=[];
    row1:string[]=[];
    row2:string[]=[];
    row3:string[]=[];
    row4:string[]=[];
    row5:string[]=[];
    cardIsShown:boolean[]=[];
    rowOfCard1:number;
    colOfCard1:number;
    rowOfCard2:number;
    colOfCard2:number;
    col:number;
    row: number;
    counter: number;
    counter2: number = 0;
    //#endregion
  
  
    openModal(){
        this.display='block';
    }

    onCloseHandled(){
        this.display='none';
    }

    getPoints() {
        this.finalPoints = this.correctCounter*2-this.wrongCounter-this.givenUpCounter*2;
        return this.finalPoints;

    }

    saveScore()
    {
        this.check = true;
        this.getQuizFromContent();
        this.score = new Score();
        this.score.id = 1;
        this.score.points = this.finalPoints;
        
        
        this.dataService.insertScore(this.score).subscribe(data => {
            },
            error => {
                //alert("Speichern fehlgeschlagen: " + error);
            });
        this.display='none';
    }

    timeoutgetComponent() {
        setTimeout(() => {
            if(this.contents == undefined)
            {
                this.timeoutgetComponent();
            }
            else
            {
                console.log("geladen");
                this.calculateRowAndColNumber();
                this.counter = 0;
                this.fillTable();
            }
            
        }, 1000/60);
    } 
        ngOnInit(): void {
    
            this.dataService.getContentById(this.quizId).subscribe
                (data=>{this.contents=data;},
                error=>{alert("Laden der Fragen fehlgeschlagen: "+error)})
            if(this.contents == undefined)
            {
                this.dataService.getContentById(this.quizId).subscribe
                (data=>{this.contents=data;},
                error=>{alert("Laden der Fragen fehlgeschlagen: "+error)})
            }
            this.timeoutgetComponent();
            
        }
    
                                

    getContent(){
        if(this.contents == undefined)
        {
            this.contents = null;
        }
        else{
            this.content = this.contents[0];
        }
    }



    getQuizFromContent()
    {

        this.selQuiz = this.contents[0].quiz;
   
    }


    constructor(private router: Router, private dataService: DataService, websocketService: WebsocketService,private route: ActivatedRoute) {
        
        this.user= this.dataService.user;
        this.route.params.switchMap((params: Params) => params['id']).subscribe(p=>this.quizId=+p);

    }

    //#region After pressing the Button
    proof() {
        let con1 = "";
        let con2 = "";
        switch(this.rowOfCard1)
        {
            case 1: con1= this.row1[this.colOfCard1] 
            break;
            case 2: con1= this.row2[this.colOfCard1] 
            break;
            case 3: con1= this.row3[this.colOfCard1] 
            break;
            case 4: con1= this.row4[this.colOfCard1] 
            break;
            case 5: con1= this.row5[this.colOfCard1] 
            break;
        }
        switch(this.rowOfCard2)
        {
            case 1: con2= this.row1[this.colOfCard2] 
            break;
            case 2: con2= this.row2[this.colOfCard2] 
            break;
            case 3: con2= this.row3[this.colOfCard2] 
            break;
            case 4: con2= this.row4[this.colOfCard2] 
            break;
            case 5: con2= this.row5[this.colOfCard2] 
            break;
        }
        if(con1 == con2)
        {
            console.log(con1 + " & " + con2 +" Richtig");
            this.OpenOrCloseCard(this.rowOfCard1 ,this.colOfCard1,true);
            this.OpenOrCloseCard(this.rowOfCard2 ,this.colOfCard2,true);
            this.rowOfCard1 = undefined;
            this.colOfCard1 = undefined;
            this.rowOfCard2 = undefined;
            this.colOfCard2 = undefined;
            return;
        }
        else{
            console.log(con1 + " & " + con2 +" Falsch");
            //this.timeout();
            let i =0;
            do{
                this.OpenOrCloseCard(this.rowOfCard1 ,this.colOfCard1,true);
                this.OpenOrCloseCard(this.rowOfCard2 ,this.colOfCard2,true);
                i++;
            }while(i == 100)

            this.OpenOrCloseCard(this.rowOfCard1 ,this.colOfCard1,false);
            this.OpenOrCloseCard(this.rowOfCard2 ,this.colOfCard2,false);
        }
        
        this.rowOfCard1 = undefined;
        this.colOfCard1 = undefined;
        this.rowOfCard2 = undefined;
        this.colOfCard2 = undefined;
    }

    timeout() {
        setTimeout(() => {
            if(this.rowOfCard2 != undefined && this.rowOfCard1 != undefined)
            {
                this.proof();
            }
            console.log("Loading ...");
            this.timeout();
        }, 1000 *2);
    } 
    showContent(rowname:number,index:number)
    {
        let cardBool = true;
        this.OpenOrCloseCard(rowname,index,cardBool);
        if(this.rowOfCard1 == undefined)
        {
            this.rowOfCard1 = rowname;
            this.colOfCard1 = index;
        }
        else if(this.rowOfCard2 == undefined && this.rowOfCard1 != undefined)
        {
            this.rowOfCard2 = rowname;
            this.colOfCard2 = index;
            this.timeout();
        }
        
    }

    OpenOrCloseCard(rowname: number, index: number, cardBool: boolean){
        if(rowname == 1)
        {
            switch(index)
            {
                case 0 : this.cardIsShown[0] = cardBool;
                break;
                case 1 : this.cardIsShown[1] = cardBool;
                break;
                case 2 : this.cardIsShown[2] =cardBool;
                break;
                case 3 : this.cardIsShown[3] =cardBool;
                break;
                case 4 : this.cardIsShown[4] =cardBool;
                break;
            }
           
        }
        else if(rowname == 2)
        {
            switch(index)
            {
                case 0 : this.cardIsShown[5] =cardBool;
                break;
                case 1 : this.cardIsShown[6] =cardBool;
                break;
                case 2 : this.cardIsShown[7] =cardBool;
                break;
                case 3 : this.cardIsShown[8] =cardBool;
                break;
                case 4 : this.cardIsShown[9] =cardBool;
                break;
            }
        }
        else if(rowname == 3)
        {
            switch(index)
            {
                case 0 : this.cardIsShown[10] =cardBool;
                break;
                case 1 : this.cardIsShown[11] =cardBool;
                break;
                case 2 : this.cardIsShown[12] =cardBool;
                break;
                case 3 : this.cardIsShown[13] =cardBool;
                break;
                case 4 : this.cardIsShown[14] =cardBool;
                break;
            }
        }
        else if(rowname == 4)
        {
            switch(index)
            {
                case 0 : this.cardIsShown[15] =cardBool;
                break;
                case 1 : this.cardIsShown[16] =cardBool;
                break;
                case 2 : this.cardIsShown[17] =cardBool;
                break;
                case 3 : this.cardIsShown[18] =cardBool;
                break;
                case 4 : this.cardIsShown[19] =cardBool;
                break;
            }
        }
        else if(rowname == 5)
        {
            switch(index)
            {
                case 0 : this.cardIsShown[20] =cardBool;
                break;
                case 1 : this.cardIsShown[21] =cardBool;
                break;
                case 2 : this.cardIsShown[22] =cardBool;
                break;
                case 3 : this.cardIsShown[23] =cardBool;
                break;
                case 4 : this.cardIsShown[24] =cardBool;
                break;
            }
        }
    }
    //#endregion
    //#region "Return if a Card is shown or not"
    checkBoolean(rowname:number,index:number)
    {
        let returnVal = false;
        if(rowname == 1 )
        {
            switch(index)
            {
                case 0 : returnVal = this.cardIsShown[0];
                break;
                case 1 : returnVal =  this.cardIsShown[1];
                break;
                case 2 : returnVal =  this.cardIsShown[2];
                break;
                case 3 : returnVal =  this.cardIsShown[3];
                break;
                case 4 : returnVal =  this.cardIsShown[4];
                break;
            }
        }
        else if(rowname == 2)
        {
            switch(index)
            {
                case 0 : returnVal = this.cardIsShown[5];
                break;
                case 1 : returnVal =  this.cardIsShown[6];
                break;
                case 2 : returnVal =  this.cardIsShown[7];
                break;
                case 3 : returnVal =  this.cardIsShown[8];
                break;
                case 4 : returnVal =  this.cardIsShown[9];
                break;
            }
        }
        else if(rowname == 3)
        {
            switch(index)
            {
                case 0 : returnVal = this.cardIsShown[10];
                break;
                case 1 : returnVal =  this.cardIsShown[11];
                break;
                case 2 : returnVal =  this.cardIsShown[12];
                break;
                case 3 : returnVal =  this.cardIsShown[13];
                break;
                case 4 : returnVal =  this.cardIsShown[14];
                break;
            }
        }
        else if(rowname == 4)
        {
            switch(index)
            {
                case 0 : returnVal = this.cardIsShown[15];
                break;
                case 1 : returnVal =  this.cardIsShown[16];
                break;
                case 2 : returnVal =  this.cardIsShown[17];
                break;
                case 3 : returnVal =  this.cardIsShown[18];
                break;
                case 4 : returnVal =  this.cardIsShown[19];
                break;
            }
        }
        else if(rowname == 5)
        {
            switch(index)
            {
                case 0 : returnVal = this.cardIsShown[20];
                break;
                case 1 : returnVal =  this.cardIsShown[21];
                break;
                case 2 : returnVal =  this.cardIsShown[22];
                break;
                case 3 : returnVal =  this.cardIsShown[23];
                break;
                case 4 : returnVal =  this.cardIsShown[24];
                break;
            }
        }
        return returnVal;
    }
    //#endregion 
    //#region "Fill Table"
    fillTable()
    {
        this.contents.forEach(element => {
            if(this.counter2 < 10)
            {
                this.contentsmixed.push(element.input1);
                this.contentsmixed.push(element.input2);
                this.counter2 ++;
            }
         
        });
        
        this.shuffle(this.contentsmixed);
        for (var i=0; i<this.col; i++) {
            if(this.contentsmixed[this.counter] != undefined)
            {
                this.row1.push(this.contentsmixed[this.counter]);
                this.counter++;
            }
            if(this.contentsmixed[this.counter] != undefined && this.row >= 2)
            {
                this.row2.push(this.contentsmixed[this.counter]);
                this.counter++;
            }

            if(this.contentsmixed[this.counter] != undefined && this.row >= 3)
            {
                this.row3.push(this.contentsmixed[this.counter]);
                this.counter++;
            }
            if(this.contentsmixed[this.counter] != undefined && this.row >= 4)
            {
                this.row4.push(this.contentsmixed[this.counter]);
                this.counter++;
            }
            if(this.contentsmixed[this.counter] != undefined && this.row >= 5)
            {
                this.row5.push(this.contentsmixed[this.counter]);
                this.counter++;
            }
        }
    }

    calculateRowAndColNumber(){
        if(this.contents.length >= 10)
        {
            this.col=4;
            this.row=5;
        }
        else if (this.contents.length == 6) {
            this.col=3;
            this.row=4;
        }
        else if (this.contents.length == 8) {
            this.col=4;
            this.row=4;
        }
        else if (this.contents.length < 10) {
            this.col=this.contents.length;
            this.row=2;
        }
    }
    //#endregion 
    //#region "Shuffle Array"
    shuffle(array:any[]) {
        var currentIndex = array.length, temporaryValue, randomIndex;
      
        // While there remain elements to shuffle...
        while (0 !== currentIndex) {
      
          // Pick a remaining element...
          randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex -= 1;
      
          // And swap it with the current element.
          temporaryValue = array[currentIndex];
          array[currentIndex] = array[randomIndex];
          array[randomIndex] = temporaryValue;
        }
      
        return array;
      }
      
    //#endregion 

}

