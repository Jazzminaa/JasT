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
        let re= "{"+ 
            "\"id\":"+this.id+","+ 
            "\"input1\": \""+this.input1+"\","+ 
            "\"input2\": \""+this.input2+"\"," + 
            "\"quiz\": "+this.getQuiz(this.quiz)+ 
        "}"; 
        return re;
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
        if(this.quiz.maxScore == undefined || this.quiz.maxScore == null|| this.quiz.maxScore ==NaN) 
        { 
            this.quiz.maxScore = 20; 
        } 
    } 
    
    getQuiz(q:Quiz) 
    { 
        let re=   "{  \"id\": "+q.id 
                        +",   \"age\": "+q.age 
                        +",    \"creationDate\": \""+q.creationDate 
                        +"\",   \"description\": \""+q.description 
                        +"\",  \"maxScore\": "+20 
                        +",  \"multiplay\": "+q.multiplay 
                        +",\"name\": \""+q.name 
                        +"\",  \"picture\": "+null 
                        +",  \"priority\": "+q.priority 
                        +",   \"category\": {   \"id\": "+q.category.id+",  \"name\": \""+q.category.name+"\"  }," 
                        +"  \"quiztype\": { \"id\": "+q.quiztype.id+",  \"name\": \""+q.quiztype.name+"\"   }, " 
                        +"   \"user\": "+this.getUser(q.user) 
                +"}"; 

       return re;
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