import { User } from 'app/model/user.model';
import { Score } from './../model/score.model';
import { Content } from './../model/content.model';
import { QuizType } from './../model/quiztype.model';
import { Quiz } from './../model/quiz.model';
import { Category } from './../model/category.model';
import { Headers,Http,Response } from '@angular/http';
import { Injectable } from "@angular/core";
//import { Observable } from "@angular/core/src/facade/async";
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
        return this.http.post(this.API_Url+"scores", this.getJson(score), {headers: headers})
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

    getJson(score:Score):string
    {
        this.test(score);
        let r = "{"+
            "\"id\": "+score.id+","+
            "\"points\": \""+score.points+"\","+
            "\"quiz\": {"+
                "\"id\": "+score.quiz.id+","+
                "\"age\": "+score.quiz.age+","+
                "\"creationDate\": \""+score.quiz.creationDate+"\","+
                "\"description\": \""+score.quiz.description+"\","+
                "\"multiplay\": "+score.quiz.multiplay+","+
                "\"name\": \""+score.quiz.name+"\","+
                "\"picture\": null,"+
                "\"category\": {"+
                    "\"id\": "+score.quiz.category.id+","+
                    "\"name\": \""+score.quiz.category.name+"\""+
                "},"+
                "\"quiztype\": {"+
                    "\"id\": "+score.quiz.quizType.id+","+
                    "\"name\": \""+score.quiz.quizType.name+"\""+
                "},"+
                "\"user\": {"+
                    "\"id\": "+score.quiz.user.id+","+
                    "\"dateOfBirth\": \""+score.quiz.user.dateOfBirth+"\","+
                    "\"email\": \""+score.quiz.user.email+"\","+
                    "\"firstname\": \""+score.quiz.user.firstName+"\","+
                    "\"gender\": \""+score.quiz.user.gender+"\","+
                    "\"password\": \""+score.quiz.user.password+"\","+
                    "\"picture\": null,"+
                    "\"lastname\": \""+score.quiz.user.lastName+"\","+
                    "\"username\": \""+score.quiz.user.username+"\","+
                    "\"multiplay\": "+score.quiz.user.multiplay+""+
                "}"+
            "},"+
            "\"user\": {"+
                "\"id\": "+score.user.id+","+
                "\"dateOfBirth\": \""+score.user.dateOfBirth+"\","+
                "\"email\": \""+score.user.email+"\","+
                "\"firstname\": \""+score.user.firstName+"\","+
                "\"gender\": \""+score.user.gender+"\","+
                "\"password\": \""+score.user.password+"\","+
                "\"picture\": null,"+
                "\"lastname\": \""+score.user.lastName+"\","+
                "\"username\": \""+score.user.username+"\","+
                "\"multiplay\": "+score.user.multiplay+
            "}"+
        "}";

        return r;
    }


    
}