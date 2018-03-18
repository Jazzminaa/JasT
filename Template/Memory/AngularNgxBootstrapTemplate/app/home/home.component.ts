import { Component } from '@angular/core'
import { Content } from './content';

@Component(
    {
        selector: 'home',
        templateUrl : 'app/home/home.component.html',  
    }
)
export class HomeComponent {

    //#region  Variablen
    //contents:Content[] = [{id:0,input1:"A",input2:"A"},{id:1,input1:"B",input2:"B"},{id:1,input1:"C",input2:"C"}];
    contents:Content[] = [{id:0,input1:"A",input2:"A"},{id:1,input1:"B",input2:"B"},{id:1,input1:"C",input2:"C"},{id:1,input1:"D",input2:"D"},
                            {id:0,input1:"A1",input2:"A1"},{id:1,input1:"B1",input2:"B1"},{id:1,input1:"C1",input2:"C1"},{id:1,input1:"D1",input2:"D1"},
                            {id:0,input1:"A2",input2:"A2"},{id:1,input1:"B2",input2:"B2"},{id:1,input1:"C2",input2:"C2"},{id:1,input1:"D2",input2:"D2"}
                        ];
    contentsmixed:string[]=[];
    row1:string[]=[];
    row2:string[]=[];
    row3:string[]=[];
    rowContents: string[][] =[[null],[null],[null],[null],[null],[null],[null],[null],[null]];
    rowOfCard1:number;
    colOfCard1:number;
    rowOfCard2:number;
    colOfCard2:number;
    r1:number = 0;
    r2:number = 0;
    content:Content=new Content;
    isTrue:boolean[][]=[[false],[false],[false],[false],[false],[false],[false],[false],[false]];
    enableCard:boolean[][]=[[false],[false],[false],[false],[false],[false],[false],[false],[false]];
    count:number = 0;
    checkIfClosed:boolean = false;
    score:number = 0;
    //#endregion
    
    constructor()
    {
        this.shuffle(this.contents)
        this.fillTable();
        
    }
    //#region FillContent
    fillTable()
    {
        for(var i= 0; i < 9; i++)
        {
            this.contentsmixed.push(this.contents[i].input1);
            this.contentsmixed.push(this.contents[i].input2);
        }
        this.shuffle(this.contentsmixed);
        for (var i=0; i< this.contentsmixed.length; i+=3) {
             this.row1.push(this.contentsmixed[i]);
             this.row2.push(this.contentsmixed[i+1]);
             this.row3.push(this.contentsmixed[i+2]);
        }
        for (var i=0; i< this.row1.length; i++) {
            this.rowContents[0][i] = this.row1[i];
            this.rowContents[1][i] = this.row2[i];
            this.rowContents[2][i] = this.row3[i];
        }

        
    }  
                      
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
    checkBoolean(row:number,col:number)
    {
        if(this.isTrue[row][col])
        {
            return this.isTrue[row][col];
        }
        return this.enableCard[row][col];
    }

    showContent(row:number,col:number)
    {
        if(!this.isTrue[row][col])
        {
            this.enableCard[row][col] = true;
            this.CloseIfNotCLosed();
            if(this.rowOfCard1 == undefined)
            {
                this.rowOfCard1 = row;
                this.colOfCard1 = col;
            }
            else if(this.rowOfCard2 == undefined)
            {

                if(!(this.rowOfCard1 == row && this.colOfCard1 == col))
                {
                    this.rowOfCard2 = row;
                    this.colOfCard2 = col;
                    this.proof();
                }
            }
        }
        
    }

    proof() {
        this.checkIfClosed = true;
        this.content = this.getContent();
        if(this.content.input2 == this.rowContents[this.rowOfCard2][this.colOfCard2])
        {
            this.isTrue[this.rowOfCard1][this.colOfCard1] = true;
            this.isTrue[this.rowOfCard2][this.colOfCard2] = true;
            console.log(this.rowContents[this.rowOfCard1][this.colOfCard1]+"&& " +this.rowContents[this.rowOfCard2][this.colOfCard2]);
            this.rowOfCard1 = undefined;
            this.rowOfCard2 = undefined;
            this.score += 2;
        }
        else{
            this.r1 = this.rowOfCard1;
            this.r2 = this.rowOfCard2;
            this.rowOfCard1 = undefined;
            this.rowOfCard2 = undefined;
            this.timeout();
        }

    }

    timeout() {
        setTimeout(() => {
            console.log(this.checkIfClosed)
            if(this.rowOfCard1 == undefined)
            {
                if(this.count < 3)
                {
                    console.log("Loading....")
                    this.timeout();
                }
                else{
                    this.CloseIfNotCLosed();
                    this.checkIfClosed = false;
                    this.count = 0;
                }
                this.count++;
            }
            else{
                this.CloseIfNotCLosed();
                this.checkIfClosed = false;
                this.count = 0;
                return;
            }
            
        }, 1000);
    } 
    CloseIfNotCLosed(): any {
        
        if(this.checkIfClosed)
        {
            console.log("Close")
            if(this.colOfCard1 != undefined && this.colOfCard2!= undefined)
            {
                this.enableCard[this.r1][this.colOfCard1] = false;
                this.enableCard[this.r2][this.colOfCard2] = false;
            }
            this.checkIfClosed = false;
        }
    }
        
    getContent():any {
        /*this.contents.forEach(content => {
            console.log(this.contents[0].input1);
            if(content.input1 == this.rowContents[this.rowOfCard1][this.colOfCard1])
            {
                return content;
            }
        });*/

        for (var i=0; i< this.contents.length; i++) {
            if(this.contents[i].input1 == this.rowContents[this.rowOfCard1][this.colOfCard1])
            {
                return this.contents[i];
            }
        }

    }
        
}

