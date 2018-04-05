import { Quiz } from "./quiz.model";
import { User } from "./user.model";

export class Description{
    id: number;
    description: string;
    reason: string;
    quiz:Quiz;
    user1:User;
    user2:User;

    test(): any {
        if(this.id == undefined)
        {
            this.id = 0;
        }
    }

    getJson()
    {
        this.test();
        return "{"+
            "\"id\":"+ this.id+","+
            "\"description\":\""+this.description+"\","+
            "\"reason\": \""+this.reason+"\","+
            "\"quiz\":"+this.getQuiz(this.quiz)+" ,"+
            "\"user1\":"+ this.getUser(this.user1)+","+
            "\"user2\":" +this.getUser(this.user2)+
        +"}";
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