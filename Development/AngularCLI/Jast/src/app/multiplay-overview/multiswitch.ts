import { DataService } from './../shared/data.service';
import { Router, Params, ActivatedRoute } from '@angular/router';
import { Quiz } from './../model/quiz.model';
import { User } from './../model/user.model';
import { OnInit, Component } from '@angular/core';

@Component(
    {
        selector: 'multiswitch',
        template: ' '
    }
)
export class Multiswitch implements OnInit {

    user: User;
    mquizid: number;
    quizid: number;
    quiztypeid: number;
    constructor(private router: Router, private dataService: DataService,private route: ActivatedRoute )  {
        if(dataService.user != null)
        {
            this.user = dataService.user;
        }
        this.route.params.subscribe((params: Params) => {
            
            this.mquizid= params['id'] ;
            this.quiztypeid= params['qtid'] ;
            this.quizid= params['qid'] ;
      });
        switch(this.quiztypeid.toString())
        {
            case "1":
            router.navigateByUrl("/multiqanda/"+this.mquizid+"/"+this.quizid);
            break;
            case "2":
            router.navigateByUrl("/multicloze/"+this.mquizid+"/"+this.quizid);
            break;
            case "3":
            router.navigateByUrl("/multirightorwrong/"+this.mquizid+"/"+this.quizid);
            break;
            case "4":
            router.navigateByUrl("/multimultichoice/"+this.mquizid+"/"+this.quizid);
            break;
            case "5":
            router.navigateByUrl("/multimemory/"+this.mquizid+"/"+this.quizid);
            break;

        }
    }


     ngOnInit() {
        
        
     }

      ngOnDestroy()
     {
         this.dataService.user = this.user;
     }



}