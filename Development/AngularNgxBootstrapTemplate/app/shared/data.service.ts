import { Score } from './../model/score.model';
import { Content } from './../model/content.model';
import { User } from './../model/user.model';
import { QuizType } from './../model/quiztype.model';
import { Quiz } from './../model/quiz.model';
import { Category } from './../model/category.model';
import { Headers,Http,Response } from '@angular/http';
import { Injectable } from "@angular/core";
import { Observable } from "@angular/core/src/facade/async";
import "rxjs/add/operator/map";
import "rxjs/add/operator/catch";
import 'rxjs/add/observable/of'


@Injectable()
export class DataService {

    API_Url: string ="http://vm86.htl-leonding.ac.at:8080/JAST/rest/";
    user:User;
    cat:string="";

    constructor(private http:Http)
    {

    }

    getCategories(){
        return this.http.get(this.API_Url + "categories"+this.cat)
        .map((response:Response)=>response.json() as Category[]);
    }

    getUsers(){
        return this.http.get(this.API_Url + "users")
        .map((response:Response)=>response.json() as User[]);
    }

    getUserWithEmail(mail: string){
        return this.http.get(this.API_Url + "users/email/"+mail)
        .map((response:Response)=>response.json() as User);
    }

    getQuizTypes(){
        return this.http.get(this.API_Url + "quiztypes")
        .map((response:Response)=>response.json() as QuizType[]);
    }

    getQuizes(){
        return this.http.get(this.API_Url + "quizes")
        .map((response:Response)=>response.json() as Quiz[]);
    }


   insertQuiz(quiz: Quiz) {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        return this.http.post(this.API_Url+"quizes", quiz.getJson(), {headers: headers})
        .map((res:Response) => res.json());
    }

    getContentById(quizId: number)
    {
        return this.http.get(this.API_Url + "content/quiz/"+quizId)
        .map((response:Response)=>response.json() as Content[]);
    }

    insertScore(score: Score)
    {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        return this.http.post(this.API_Url+"scores", score.getJson(), {headers: headers})
        .map((res:Response) => res.json());
    }

    insertContent(content: Content)
    {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        return this.http.post(this.API_Url+"content", content.getJson(), {headers: headers})
        .map((res:Response) => res.json());
    }

 
    insertUser(user: User) {
        let headers:Headers=new Headers({"Content-Type":"application/json"})

        return this.http.post(this.API_Url+"users",user.getJson(),
        {headers:headers}).map(data=>data.json() as User);
}

    
}