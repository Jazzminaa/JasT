import { Quiz } from './../model/quiz.model';
import { Content } from './../model/content.model';
import { Router } from '@angular/router';
import { DataService } from './../shared/data.service';
import { Component, OnInit } from '@angular/core';
@Component(
    {
        selector: 'addquizcontent',
        templateUrl: 'app/add-quiz/add-quiz-content.component.html'
    }
)

export class AddQuizContentComponent implements OnInit{

        newContents: Content[] = new Array();
        quiz: Quiz = new Quiz;
        quizes: Quiz [] = [];
        
        constructor(private dataService: DataService, router: Router) {
            this.getQuiz();
            dataService.newQuiz.id = this.quiz.id;
            this.quiz = dataService.newQuiz;
        }


        ngOnInit(): void
        {
            
        }

        getQuiz(){
            this.dataService.getQuizWithUserAndName().subscribe(data =>{
            this.quiz = data;
            })
            //this.quiz = this.quizes[0];
        }

        

        addContentToList(input1: string, input2:string): void
        {
            let content = new Content();
            content.id = 0;
            content.input1 = input1;
            content.input2 = input2;
            content.quiz = this.quiz;
            this.newContents.push(content);

        }

        removeContentFromList(content: Content): void
        {
            let index = this.newContents.indexOf(content);
            this.newContents.splice(index, 1);
        }



        saveContent()
        {
            this.newContents.forEach((content, index) =>{
                content.quiz = this.quiz;
                this.dataService.insertContent(content)
                .subscribe(data => {
                },
                error => {
                alert("Speichern fehlgeschlagen: " + error);
            })
            })
           
        }

}