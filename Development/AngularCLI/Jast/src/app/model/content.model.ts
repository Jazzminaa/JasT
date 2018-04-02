import { User } from './user.model';
import { QuizType } from './quiztype.model';
import { Quiz } from './quiz.model';

export class Content{
    id: number = 0;
    input1: string = "";
    input2: string = "";
    quiz: Quiz = new Quiz;
    user:User;
    geloestVon:string ;


    getJson()
    {
        this.test();
        return "{"+
            "\"id\":"+this.id+","+
            "\"input1\": \""+this.input1+"\","+
            "\"input2\": \""+this.input2+"\"," +
            "\"quiz\": "+this.quiz+
        "}";
    }

    test()
    {
         if(this.quiz.multiplay == undefined || this.quiz.multiplay == null)
        {
            this.quiz.multiplay = 0;
        }
        if(this.id == undefined || this.id == null)
        {
            this.id = 0;
        }
    }
}