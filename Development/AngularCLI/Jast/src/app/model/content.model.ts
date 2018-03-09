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
            "\"quiz\": "+"{"+
                "\"id\": "+this.quiz.id+","+
                "\"age\": "+this.quiz.age+","+
                "\"creationDate\": 1489490100000,"+
                "\"description\": \""+this.quiz.description+"\","+
                "\"multiplay\": "+this.quiz.multiplay+","+
                "\"name\": \""+this.quiz.name+"\","+
                "\"picture\": null,"+
                "\"category\": {"+
                    "\"id\": "+this.quiz.category.id+","+
                    "\"name\": \""+this.quiz.category.name+"\""+
                "},"+
                "\"quiztype\": {"+
                    "\"id\": "+this.quiz.quizType.id+","+
                " \"name\": \""+this.quiz.quizType.name+"\""+
                "},"+
                "\"user\": {"+
                    "\"id\": "+this.quiz.user.id+","+
                    "\"dateOfBirth\": \""+this.quiz.user.dateOfBirth+"\","+
                    "\"email\": \""+this.quiz.user.email+"\","+
                    "\"firstname\": \""+this.quiz.user.firstName+"\","+
                    "\"gender\": \""+this.quiz.user.gender+"\","+
                    "\"password\": \""+this.quiz.user.password+"\","+
                    "\"picture\": null,"+
                    "\"lastname\": \""+this.quiz.user.lastName+"\","+
                    "\"username\": \""+this.quiz.user.username+"\","+
                    "\"multiplay\": null"+
                "}"+
            "}"+
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