import { Category } from './../model/category.model';
import { Headers,Http,Response } from '@angular/http';
import { Injectable } from "@angular/core";

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
}