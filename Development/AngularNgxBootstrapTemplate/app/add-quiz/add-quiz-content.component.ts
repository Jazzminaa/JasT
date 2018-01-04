import { Content } from './../model/content.model';
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

        content: Content;
        inputOne: string;
        inputTwo: string;
        
        constructor(private dataService: DataService, router: Router) {
             
        }


        ngOnInit(): void
        {
            
        }

        saveContent()
        {
            this.dataService.insertContent(this.content)
            .subscribe(data => {
            },
            error => {
            alert("Speichern fehlgeschlagen: " + error);
            })
        }
}