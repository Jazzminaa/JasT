import { Category } from './../model/category.model';
import { Component, OnInit } from '@angular/core';
import { DataService } from '../shared/data.service';


@Component({
  selector: 'add-quiz',
  templateUrl : 'app/quiz/addquiz.component.html',
})

export class AddQuiz implements OnInit {

    constructor(private dataService: DataService) {

    }

    categories: Category[];


    ngOnInit(){
        this.getTheCategories();
    }

    getTheCategories(){
      this.dataService.getCategories().subscribe(data =>{
        this.categories = data;
      })
    }

}
