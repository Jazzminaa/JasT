import { Component } from '@angular/core'
import { Content } from './content';

@Component(
    {
        selector: 'home',
        templateUrl : 'app/home/home.component.html',  
    }
)
export class HomeComponent {
    
    contents:Content[] = [{id:0,input:"A",input2:"A"},{id:1,input:"B",input2:"B"},{id:1,input:"C",input2:"C"}];
    contentsmixed:string[]=[];
    col:number;
    row: number;

    constructor()
    {
        if(this.contents.length >= 10)
        {
            this.col=5;
            this.row=4;
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
            this.col=this.contents.length/2;
            this.row=2;
        }
        
        this.contents.forEach(element => {
           this.contentsmixed.push(element.input);
           this.contentsmixed.push(element.input2);
        });
        this.shuffle(this.contentsmixed);
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

}