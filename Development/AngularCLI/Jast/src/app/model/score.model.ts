import { User } from './user.model';
import { QuizType } from './quiztype.model';
import { Quiz } from './quiz.model';
import { Category } from './category.model';
export class Score{

    id: number;
    points: number;
    user: User;
    quiz:Quiz;
    playDay: Date;
    
    test(): any {
        if(this.id == undefined)
        {
            this.id=0;
        }

        if(this.points == undefined)
        {
            this.points=0;
        }

        if(this.playDay == undefined)
        {
            this.playDay= new Date("2018-03-07");
        }
    }

    getJson():string
    {
        this.test();
        return "{"+
            "\"id\": "+this.id+","+
            "\"points\": \""+this.points+"\","+
            "\"playDay\": \""+this.playDay.getFullYear()+"-"+this.playDay.getMonth()+"-"+this.playDay.getDay()+"\","+
            "\"quiz\": "+this.getQuiz(this.quiz)+","+
            "\"user\":"+ this.getUser(this.user) +
        "}"
    }

    getQuiz(q:Quiz)
    {
        return   "{  \"id\": "+q.id
                        +",   \"age\": "+q.age
                        +",    \"creationDate\": \""+q.creationDate
                        +"\",   \"description\": \""+q.description
                        +"\",  \"maxScore\": "+q.maxScore
                        +",  \"multiplay\": "+q.multiplay
                        +",\"name\": \""+q.name
                        +"\",  \"picture\": "+null
                        +",  \"priority\": "+q.priority
                        +",   \"category\": {   \"id\": "+q.category.id+",  \"name\": \""+q.category.name+"\"  },"
                        +"  \"quiztype\": { \"id\": "+q.quiztype.id+",  \"name\": \""+q.quiztype.name+"\"   }, "
                        +"   \"user\": "+this.getUser(q.user)
                +"}";
    }

    getUser(u:User)
    {
        if(u.multiplay == undefined)
        {
            u.multiplay = null;
        }
        return "{\"id\": "+u.id
                    +", \"dateOfBirth\": \""+u.dateOfBirth
                    +"\",\"email\": \""+u.email
                    +"\", \"firstname\": \""+u.firstname
                    +"\",  \"gender\": \""+u.gender
                    +"\",  \"lastname\": \""+u.lastname
                    +"\",  \"password\": \""+u.password
                    +"\", \"picture\": "+null
                    +",   \"username\": \""+u.username
                    +"\",   \"multiplay\": "+u.multiplay
                    +"}";
            
    }
   
}