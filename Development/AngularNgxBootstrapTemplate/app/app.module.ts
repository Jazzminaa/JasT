import { QAndAScoreComponent } from './qanda/qandascore.component';
import { QAndAInputComponent } from './qanda/qandainput.component';
import { QAndAComponent } from './qanda/qanda.component';
import { QuizOverviewComponent } from './quiz-overview/quiz-overview.component';
import { LoginComponent } from './login/login.component';
import { DataService } from './shared/data.service';
import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule, JsonpModule } from '@angular/http';
import { AppComponent }  from './app.component';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AddQuizComponent } from './add-quiz/add-quiz.component';
import "rxjs/add/operator/map";
import "rxjs/add/operator/catch";
import 'rxjs/add/observable/of';
import { RegisterComponent } from './register/register.component';



const appRoutes: Routes = [
  {path: '', redirectTo: '/home', pathMatch:"full"},
  {path: 'home', component: HomeComponent},
  {path: 'addquiz', component: AddQuizComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'login', component: LoginComponent},
  {path: 'quizoverview', component: QuizOverviewComponent},
  {path: 'qanda/:id', component: QAndAComponent},
  {path: 'qandainput', component: QAndAInputComponent},
  {path: 'qandascore', component: QAndAScoreComponent}
];

@NgModule({
  imports: [ 
             RouterModule.forRoot(appRoutes),
             BrowserModule,  
             FormsModule,
             HttpModule,
             JsonpModule ],
  declarations: [ AppComponent, HomeComponent, AddQuizComponent, LoginComponent, QuizOverviewComponent, QAndAComponent, QAndAInputComponent, RegisterComponent, QAndAScoreComponent],
  providers: [DataService],
  bootstrap: [ AppComponent ]
})
export class AppModule { } 