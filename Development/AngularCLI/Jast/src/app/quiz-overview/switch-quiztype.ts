import { DataService } from './../shared/data.service';
import { Router, Params, ActivatedRoute } from '@angular/router';
import { Quiz } from './../model/quiz.model';
import { User } from './../model/user.model';
import { OnInit, Component } from '@angular/core';

@Component(
    {
        selector: 'switch',
        template: ' '
    }
)
export class SwitchComponent implements OnInit {
    user: User;
    quizid: number;
    quiztypeid: number;
    constructor(private router: Router, private dataService: DataService,private route: ActivatedRoute )  {
        if(dataService.user != null)
        {
            this.user = dataService.user;
            console.log("hab einen User");
        }

        this.route.params.subscribe((params: Params) => {
            this.quizid= params['id'] ; 
            this.quiztypeid = params['qid']
        });

        switch(this.quiztypeid.toString())
        {
            case "1":
            router.navigateByUrl("/qanda/"+this.quizid);
            break;
            case "2":
            router.navigateByUrl("/cloze/"+this.quizid);
            break;
            case "3":
            router.navigateByUrl("/rightorwrong/"+this.quizid);
            break;
            case "4":
            router.navigateByUrl("/multichoice/"+this.quizid);
            break;
            case "5":
            router.navigateByUrl("/memory/"+this.quizid);
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