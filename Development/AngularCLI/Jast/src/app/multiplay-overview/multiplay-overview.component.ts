import { Multiplay } from './../model/multiplay.model';
import { Component, OnInit } from '@angular/core';
import { Params, ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../shared/data.service';
import { User } from '../model/user.model';

@Component({
  selector: 'app-multiplay-overview',
  templateUrl: './multiplay-overview.component.html',
  styleUrls: ['./multiplay-overview.component.css']
})
export class MultiplayOverviewComponent implements OnInit {

  multiplays: Multiplay[];
  user: User;
  testId:number = 0;
  ageId: number = 0;
  filter:string = "";
  quizesBegin: Multiplay[];
  
  constructor(private router: Router, private dataService: DataService,private route: ActivatedRoute )  {
      
      if(dataService.user != null)
      {
          this.user = dataService.user;
      }
  }
  filterQuiz()
    {
        this.multiplays = [];
        this.quizesBegin.forEach(quiz => {
            if(quiz.name.startsWith(this.filter))
            {
                this.multiplays.push(quiz);
            }

        });

    }

   ngOnInit() {

      this.route.params.subscribe((params: Params) => {this.testId= params['id'] ; this.ageId = params['age']
      });
     
      this.GetCat();
   }

   ngOnDestroy()
   {
       this.dataService.user = this.user;
   }

   GetCat(){
      
      if(this.testId == 0)
      {
          this.getAllMultiplayes();
      }
      else{
          this.getQuizesByCat();
          
      }
   }

   getQuizesByCat()
   {
     /* this.dataService.getMultiplaysByCat(this.testId).subscribe(data =>{
          this.multiplays = data;
        });*/
   }

   getAllMultiplayes()
   {
      this.dataService.getMultiplays().subscribe(data =>{
      this.multiplays = data;
      this.quizesBegin = data;
    });
   }

   navigateToQuizDetail(id: number) {
    this.router.navigate(['/qanda', id]);
}
}
