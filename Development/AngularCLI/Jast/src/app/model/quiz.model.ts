import { User } from './user.model';
import { QuizType } from './quiztype.model';
import { Category } from './category.model';

export class Quiz{
    id: number;
    age: number;
    creationDate: Date;
    description: string;
    multiplay: number;
    name: string;
    category: Category;
    quiztype: QuizType;
    user: User;
    picture: string;
    maxScore: number;
    priority:number;
 
    getJson() 
    { 
        this.test(); 
        let re = "{"+ 
            "\"id\": "+this.id+","+ 
            "\"age\": "+this.age+","+ 
            "\"creationDate\": \""+this.creationDate.getFullYear()+"-"+this.creationDate.getMonth()+"-"+this.creationDate.getDay()+"\","+ 
            "\"description\": \""+this.description+"\","+ 
            "\"multiplay\": "+this.multiplay+","+ 
            "\"name\": \""+this.name+"\","+ 
            "\"picture\": null,"+ 
            " \"category\": {   \"id\": "+this.category.id+",  \"name\": \""+this.category.name+"\"  }," +
            "  \"quiztype\": { \"id\": "+this.quiztype.id+",  \"name\": \""+this.quiztype.name+"\"   }, " +
            "\"user\": "+this.getUser(this.user)+","+ 
            "\"maxScore\": "+this.maxScore+","+ 
            "\"priority\": "+this.priority+ 
        "}"; 

        return re;
    } 
 
    test() 
    { 
         if(this.multiplay == undefined || this.multiplay == null) 
        { 
            this.multiplay = 0; 
        } 
        if(this.id == undefined || this.id == null) 
        { 
            this.id = 0; 
        } 
        if(this.creationDate == undefined ||this.creationDate == null) 
        { 
            this.creationDate = new Date("2017-03-14"); 
        } 
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
