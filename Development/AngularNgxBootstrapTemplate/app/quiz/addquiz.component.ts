import { Component, OnInit } from '@angular/core';
import { DataService } from '../shared/data.service';


@Component({
  selector: 'add-quiz',
  templateUrl : 'app/quiz/addquiz.component.html',
})

export class Wordpair implements OnInit {

    ngOnInit(): void {
      throw new Error('Method not implemented.');
    }

  constructor(private dataService: DataService) {

  }


}
