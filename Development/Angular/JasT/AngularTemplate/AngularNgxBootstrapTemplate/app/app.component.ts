import {Component} from '@angular/core';

@Component({
  selector: 'my-app',
  templateUrl : 'app/app.component.html',
})
export class AppComponent {
  filterParams: string[] = ['Englisch', 'Deutsch', 'Mathematik', 'Chemie', 'Physik'];
  forms: string[] = ['Q&A', 'Cloze', 'Right or Wrong', 'Multichoice', 'Memory'];
  chosenFilter: string;

  selectedFilter(selFil: string){
    selFil = this.chosenFilter;
  }
}