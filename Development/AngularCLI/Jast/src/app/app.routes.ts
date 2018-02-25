import { QandaComponent } from './qanda/qanda.component';
import { ModuleWithProviders }  from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AddQuizComponent } from './add-quiz/add-quiz.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { QuizOverviewComponent } from './quiz-overview/quiz-overview.component';
import { MultiplayOverviewComponent } from './multiplay-overview/multiplay-overview.component';
import { AddQuizContentComponent } from './add-quiz/add-quiz-content/add-quiz-content.component';
import { PlayComponent } from './websocket/play/play.component';
import { ChatComponent } from './websocket/chat/chat.component';
import { ProfileComponent } from './profile/profile.component';
import { AddMultiplayComponent } from './add-multiplay/add-multiplay.component';
import { QandainputComponent } from './qanda/qandainput/qandainput.component';
import { QandascoreComponent } from './qanda/qandascore/qandascore.component';
import { ClozeComponent } from './cloze/cloze.component';
import { ClozeinputComponent } from './cloze/clozeinput/clozeinput.component';
import { SwitchComponent } from './quiz-overview/switch-quiztype';


const appRoutes: Routes = [
    {path: '', redirectTo: '/home', pathMatch:"full"},
    {path: 'home', component: HomeComponent},
    {path: 'addquiz', component: AddQuizComponent},
    {path: 'login', component: LoginComponent},
    {path: 'register', component: RegisterComponent},
    {path: 'quizoverview/:id/:age', component: QuizOverviewComponent},
    {path: 'multiplayoverview/:id/:age', component: MultiplayOverviewComponent},
    {path: 'qanda/:id', component: QandaComponent},
    {path: 'qandainput', component: QandainputComponent},
    {path: 'qandascore', component: QandascoreComponent},
    {path: 'addquizcontent', component: AddQuizContentComponent},
    {path: 'play/:id/:qid', component: PlayComponent},
    {path: 'chat', component: ChatComponent},
    {path: 'profile', component: ProfileComponent},
    {path:'add-multiplay',component:AddMultiplayComponent},
    {path: 'cloze/:id', component: ClozeComponent},
    {path: 'clozeinput', component: ClozeinputComponent},
    {path: 'switch/:qid/:id', component: SwitchComponent}

];


export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);