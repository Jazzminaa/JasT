import { Quiz } from './../model/quiz.model';
import { DataService } from './../shared/data.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import 'rxjs/add/operator/switchMap';
import { User } from '../model/user.model';
import { Multiplay } from '../model/multiplay.model';


@Component(
    {
        selector: 'multiplay-overview',
        templateUrl: 'app/multiplay-overview/multiplay-overview.component.html'
    }
)
export class MultiplayOverviewComponent implements OnInit {

    multiplays: Multiplay[];
    user: User;
    testId:number = 0;
    ageId: number = 0;
    
    constructor(private router: Router, private dataService: DataService,private route: ActivatedRoute )  {
        
        if(dataService.user != null)
        {
            this.user = dataService.user;
        }
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
      });
     }

     navigateToQuizDetail(id: number) {
      this.router.navigate(['/qanda', id]);
  }
}
