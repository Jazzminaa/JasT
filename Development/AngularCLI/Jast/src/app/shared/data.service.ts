import { Multiplay } from './../model/multiplay.model';
import { Description } from './../model/description.model';
import { DescribeComponent } from './../describe/describe.component';
import { Share } from './../model/share.model';
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
import 'rxjs/add/observable/of';


@Injectable()
export class DataService {

    API_Url: string ="http://vm86.htl-leonding.ac.at:8080/JAST/rest/";
    //API_Url: string ="http://localhost:8080/JAST/rest/"; // zum testen
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

    getShares(id:number)
    {
        return this.http.get(this.API_Url + "shared/user/"+id)
        .map((response:Response)=>response.json() as Share[]);
        
    }
    getChangeDesc()
    {
        return this.http.get(this.API_Url + "description")
        .map((response:Response)=>response.json() as Description[]);
    }

    getQuizes(){
        return this.http.get(this.API_Url + "quizes")
        .map((response:Response)=>response.json() as Quiz[]);
    }

    
    getShared(id:number): any {
        return this.http.get(this.API_Url + "shared/user/"+id)
        .map((response:Response)=>response.json() as Share[]);
    }

    getDesc(id:number): any {
        return this.http.get(this.API_Url + "description/user/"+id)
        .map((response:Response)=>response.json() as Description[]);
    }

    getQuiz(id:number){
        return this.http.get(this.API_Url + "quizes/"+id)
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

    let json = JSON.stringify(quiz);
        let headers = new Headers({ 'Content-Type': 'application/json' });
        return this.http.post(this.API_Url+"quizes", quiz.getJson(), {headers: headers})
        .map((res:Response) => res.json());
    }

    
  insertMulti(multi: Multiplay): any {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    return this.http.post(this.API_Url+"multiplays", multi.getJson(), {headers: headers})
    .map((res:Response) => res.json());
  }

    insertShare(s: Share) {
        if(s.id == undefined)
        {
            s.id = 0;
        }
        if(s.quiz.multiplay == undefined || s.quiz.multiplay == null)
        {
            s.quiz.multiplay = 0;
        }
        let headers = new Headers({ 'Content-Type': 'application/json' });
        return this.http.post(this.API_Url+"shared", JSON.stringify(s), {headers: headers})
        .map((res:Response) => res.json());
    }

    inserDesc(d: Description) {
        if(d.id == undefined)
        {
            d.id = 0;
        }
        if(d.quiz.multiplay == undefined || d.quiz.multiplay == null)
        {
            d.quiz.multiplay = 0;
        }
        let headers = new Headers({ 'Content-Type': 'application/json' });
        return this.http.post(this.API_Url+"description", JSON.stringify(d), {headers: headers})
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
        return this.http.post(this.API_Url+"scores",score.getJson(), {headers: headers})
        .map((res:Response) => res.json());
    }

    insertContent(content: Content)
    {

        let headers = new Headers({ 'Content-Type': 'application/json' });
        return this.http.post(this.API_Url+"content", content.getJson(), {headers: headers})
        .map((res:Response) => res.json());
    }

 
    insertUser(user: User) {
        if(user.id == undefined)
        {
            user.id = 0;
        }
        let headers:Headers=new Headers({"Content-Type":"application/json"});
        return this.http.post(this.API_Url+"users",user.getJson(),
        {headers:headers}).map(data=>data.json() as User);
    }

    updateUser(user: User) {
        let headers:Headers=new Headers({"Content-Type":"application/json"});
        return this.http
             .put(this.API_Url+"users/"+user.id, JSON.stringify(user), {headers: headers})
             .map(res => res.json());
    }

    updateQuiz(q: Quiz) {
        let headers:Headers=new Headers({"Content-Type":"application/json"});
        return this.http
             .put(this.API_Url+"quizes/"+q.id, JSON.stringify(q), {headers: headers})
             .map(res => res.json());
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