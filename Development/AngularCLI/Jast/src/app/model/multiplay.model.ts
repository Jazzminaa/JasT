import { Quiz } from "./quiz.model";
import { User } from "./user.model";


export class Multiplay{
    id: number;
    name: string;
    quiz: Quiz;
    user: User;

    getJson() 
    { 
        this.test(); 
        let ret=     "{"+ 
            "\"id\": "+this.id+","+ 
            "\"name\": \""+this.name+"\","+ 
            "\"quiz\": "+this.getQuiz(this.quiz)+ ","+ 
            "\"ownwer\": "+this.getUser(this.user)+ 
        "}"; 

        return ret;
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