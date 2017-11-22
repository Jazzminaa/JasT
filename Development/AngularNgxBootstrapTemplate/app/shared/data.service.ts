import { QuizType } from './../model/quiztype.model';
import { Quiz } from './../model/quiz.model';
import { Category } from './../model/category.model';
import { User } from './../model/user.model';
import { Headers,Http,Response } from '@angular/http';
import { Injectable } from "@angular/core";
import 'rxjs/add/operator/map'

@Injectable()
export class DataService {

    API_Url: string ="http://vm86.htl-leonding.ac.at:8080/JAST/rest/";

    constructor(private http:Http)
    {

    }

    getCategories(){
        return this.http.get(this.API_Url + "categories")
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

    insertQuiz(newQuiz: Quiz) {
       let headers:Headers=new Headers({"Content-Type":"application/json"})

       return this.http.post(this.API_Url+"quizes",newQuiz,
       {headers:headers}).map(data=>data.json() as Quiz);
   }

    
}