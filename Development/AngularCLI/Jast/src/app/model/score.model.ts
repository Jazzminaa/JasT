import { User } from './user.model';
import { QuizType } from './quiztype.model';
import { Quiz } from './quiz.model';
import { Category } from './category.model';
export class Score{

    id: number;
    points: number;
    user: User;
    quiz:Quiz;
    
    test(): any {
        if(this.quiz.multiplay == undefined)
        {
            this.quiz.multiplay = 0
        }
        if(this.id == undefined)
        {
            this.id=0;
        }

        if(this.quiz.user.multiplay == undefined)
        {
            this.quiz.user.multiplay = "null";
        }

        if(this.user.multiplay == undefined)
        {
            this.user.multiplay = "null";
        }
    }
    

    getJson():string
    {
        this.test();
        return "{"+
            "\"id\": "+this.id+","+
            "\"points\": \""+this.points+"\","+
            "\"quiz\": {"+
                "\"id\": "+this.quiz.id+","+
                "\"age\": "+this.quiz.age+","+
                "\"creationDate\": \""+this.quiz.creationDate+"\","+
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
                    "\"name\": \""+this.quiz.quizType.name+"\""+
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
                    "\"multiplay\": "+this.quiz.user.multiplay+""+
                "}"+
            "},"+
            "\"user\": {"+
                "\"id\": "+this.user.id+","+
                "\"dateOfBirth\": \""+this.user.dateOfBirth+"\","+
                "\"email\": \""+this.user.email+"\","+
                "\"firstname\": \""+this.user.firstName+"\","+
                "\"gender\": \""+this.user.gender+"\","+
                "\"password\": \""+this.user.password+"\","+
                "\"picture\": null,"+
                "\"lastname\": \""+this.user.lastName+"\","+
                "\"username\": \""+this.user.username+"\","+
                "\"multiplay\": "+this.user.multiplay+
            "}"+
        "}"
    }
}