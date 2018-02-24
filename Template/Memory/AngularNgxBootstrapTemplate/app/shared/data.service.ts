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
        .map((response:Response)=>response.json() as Number[]);
    }

   

    insertQuiz(newQuiz: Number) {
       let headers:Headers=new Headers({"Content-Type":"application/json"})

       return this.http.post(this.API_Url+"quizes",newQuiz,
       {headers:headers}).map(data=>data.json() as Number);
   }

    
}