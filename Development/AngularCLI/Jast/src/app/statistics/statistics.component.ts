import { Score } from './../model/score.model';
import { User } from 'app/model/user.model';
import { DataService } from './../shared/data.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent implements OnInit {
  user: User;
  scores: Score[];
  score: Score;
  counter: number = 0;
  beginScores: Score[];

  constructor(private router: Router,private dataService: DataService) { 
      this.user = this.dataService.user;
     
      
  }
  loadScores()
  {
      this.dataService.getScoreByUser(this.user.id).subscribe
            (data=>{this.scores=data;},
            error=>{alert("Laden der Punkte fehlgeschlagen: "+error)})
  }

  ngOnInit() {
     if(this.scores == undefined)
      {
        this.loadScores();
      }
     this.waitForLoading();
  }

   waitForLoading() {
      setTimeout(() => {
          if(this.scores == undefined)
          {
            this.waitForLoading();
          }
          else{
           this.findLatestGame();
          }
          
      }, 1000);
  } 

  findLatestGame()
  {
      for(var i = 0; i<this.scores.length; i++)
      {
        this.counter++;
      }
      this.score =this.scores[this.counter-1];
      this.counter = 0;
  }

  filterByPositivePass()
  {
     this.beginScores = this.scores;
     this.scores = [];
        this.beginScores.forEach(score => {
            if(score.points >= (score.quiz.maxScore/2))
            {
                this.scores.push(score);
            }
        });
  }
  
  displayAllScores()
  {
     this.scores = [];
        this.beginScores.forEach(score => {
            
                this.scores.push(score);
        });
  }


}
