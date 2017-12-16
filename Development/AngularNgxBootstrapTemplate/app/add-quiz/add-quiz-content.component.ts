import { Router } from '@angular/router';
import { DataService } from './../shared/data.service';
import { Component, OnInit } from '@angular/core';
@Component(
    {
        selector: 'add-quiz-content',
        templateUrl: 'app/add-quiz/add-quiz-content.component.html'
    }
)

export class AddQuizContentComponent implements OnInit{
        constructor(private dataService: DataService, router: Router) {
             
        }


        ngOnInit(): void
        {
            
        }
}