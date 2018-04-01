import { User } from 'app/model/user.model';
import { Score } from './../model/score.model';
import { Content } from './../model/content.model';
import { QuizType } from './../model/quiztype.model';
import { Quiz } from './../model/quiz.model';
import { Category } from './../model/category.model';
import { Headers,Http,Response } from '@angular/http';
import { Injectable } from "@angular/core";
import "rxjs/add/operator/map";
import "rxjs/add/operator/catch";
import 'rxjs/add/observable/of'
import { Multiplay } from '../model/multiplay.model';


@Injectable()
export class DataService {

    API_Url: string ="http://vm86.htl-leonding.ac.at:8080/JAST/rest/";
   // API_Url: string ="http://localhost:8080/JAST/rest/"; // zum testen
    user:User;
    newQuiz:Quiz;
    cat:string="";
    loggedIn: Boolean;
    error:String="";

    constructor(private http:Http)
    {
        this.loggedIn = true;
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

    getQuiz(id:number){
        return this.http.get(this.API_Url + "quizes"+id)
        .map((response:Response)=>response.json() as Quiz);
    }

    getMyQuizes(){
        return this.http.get(this.API_Url + "quizes/user/"+this.user.id)
        .map((response:Response)=>response.json() as Quiz[]);
    }

    getMultiplays() {
        return this.http.get(this.API_Url + "multiplays")
        .map((response:Response)=>response.json() as Multiplay[]);
    }
    getMultiplaysByCat(arg0: number) {
        //return Multiplay[];
        return
    }

    getMultiplayById(id: number)
    {
        return this.http.get(this.API_Url + "multiplays/"+id)
        .map((response:Response)=>response.json() as Multiplay);
    }

    getCatById(id: number)
    {
        return this.http.get(this.API_Url + "categories/"+id)
        .map((response:Response)=>response.json() as Category);
    }

    getQuizWithUserAndName(){
        return this.http.get(this.API_Url + "quizes/user/"+this.newQuiz.user.id+"/name/"+this.newQuiz.name)
        .map((response:Response)=>response.json() as Quiz);
    }
    getQuizesByCat(id: number, minage:number,maxage:number){
        return this.http.get(this.API_Url + "quizes/category/" + id+"/age/"+minage+"/"+maxage+"")
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
        .map(data=>data.json() as Score);
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

    updateUser(user: User) {
        let headers:Headers=new Headers({"Content-Type":"application/json"})
        return this.http.put(this.API_Url+"users/"+user.id,user.getJson(),
        {headers:headers}).map(data=>data.json() as User);
    }
    
    test(score:Score): any {
        if(score.quiz.multiplay == undefined)
        {
            score.quiz.multiplay = 0
        }

        if(score.quiz.user.multiplay == undefined)
        {
            score.quiz.user.multiplay = "null";
        }

        if(score.user.multiplay == undefined)
        {
            score.user.multiplay = "null";
        }
    }

    getScoreByUser(userId:number)
    {
        return this.http.get(this.API_Url + "scores/user/"+userId)
        .map((response:Response)=>response.json() as Score[]);
    }    

    deleteQuiz(id:number){
        return this.http.delete(this.API_Url + "quizes/"+id)
        .map((response:Response)=>response.json());
    }

    
}