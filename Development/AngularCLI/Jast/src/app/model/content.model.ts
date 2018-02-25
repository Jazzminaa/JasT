import { User } from './user.model';
import { QuizType } from './quiztype.model';
import { Quiz } from './quiz.model';

export class Content{
    id: number = 0;
    input1: string = "";
    input2: string = "";
    quiz: Quiz = new Quiz;
    quizType: QuizType;
    user:User;
    geloestVon:string ;


    getJson()
    {
        return "{"+
            "\"id\":"+this.id+","+
            "\"input1\": \""+this.input1+"\","+
            "\"input2\": \""+this.input2+"\"," +
            "\"quiz\": "+this.quiz.getJson()+
        "}";
    }
}