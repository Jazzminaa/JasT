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
        
        constructor(private dataService: DataService, router: Router) {
             
        }


        ngOnInit(): void
        {
            
        }

        addContentToList(input1: string, input2:string): void
        {
            let content = new Content();
            content.input1 = input1;
            content.input2 = input2;
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
                    this.dataService.insertContent(content)
                    .subscribe(data => {
                    },
                    error => {
                    alert("Speichern fehlgeschlagen: " + error);
                })
            })
           
        }

}