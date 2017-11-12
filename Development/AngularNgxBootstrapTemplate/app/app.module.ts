import { AddQuiz } from './quiz/addquiz.component';
import { DataService } from './shared/data.service';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { DatepickerModule, AlertModule } from 'ng2-bootstrap';

import { AppComponent } from './app.component';


import { HttpModule, JsonpModule } from "@angular/http";

@NgModule({
  declarations: [AppComponent, AddQuiz],
  imports: [
    BrowserModule,
    HttpModule,
    JsonpModule,
    FormsModule,
    AlertModule.forRoot(),
    DatepickerModule.forRoot()
  ],
  providers: [DataService],
  bootstrap: [AppComponent, AddQuiz]
})

export class AppModule {
}