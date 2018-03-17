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
    checkBoolean(rowname:number,index:number)
    {
        return true;
    }
    showContent(col:number,i:number)
    {
        return true;
    }
        
}

