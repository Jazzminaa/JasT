import { OnInit, Component, Output, Input, EventEmitter } from '@angular/core';
import { DataService } from '../shared/data.service';
import { Router,ActivatedRoute, Params  } from '@angular/router';
import { Content } from '../model/content.model';
import { Score } from '../model/score.model';
import { User } from '../model/user.model';

@Component({
  selector: 'qanda',
  templateUrl: './qanda.component.html',
  styleUrls: ['./qanda.component.css']
})
export class QandaComponent  implements OnInit {
       
  contents: Content[];
  correctCounter: number=0;
  wrongCounter: number=0;
  givenUpCounter: number=0;
  actIndex: number=0;
  finalPoints: number=0;
  score: Score;
  user: User;


  getPoints() {
  this.finalPoints = this.correctCounter*2-this.wrongCounter-this.givenUpCounter*2;
  return this.finalPoints;
  }

  saveScore()
  {
      this.dataService.insertScore(this.score).subscribe(data => {
          },
          error => {
              //alert("Speichern fehlgeschlagen: " + error);
          });
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
       this.user= this.dataService.user;
  }

}
