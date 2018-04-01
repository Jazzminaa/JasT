import { MyQuizComponent } from './my-quiz/my-quiz.component';
import { ShareComponent } from './share/share.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { StatisticsComponent } from './statistics/statistics.component';
import { AddMultichoiceComponent } from './add-quiz/add-multichoice/add-multichoice.component';
import { AddMemoryComponent } from './add-quiz/add-memory/add-memory.component';
import { PlayMultichoiceComponent } from './websocket/play/play-multichoice/play-multichoice.component';
import { MemoryComponent } from './memory/memory.component';
import { MultichoiceChoiceComponent } from './multichoice/multichoice-choice/multichoice-choice.component';
import { MultichoiceComponent } from './multichoice/multichoice.component';
import { AddRightorwrongComponent } from './add-quiz/add-rightorwrong/add-rightorwrong.component';
import { AddClozeComponent } from './add-quiz/add-cloze/add-cloze.component';
import { PlayRightandWrongComponent } from './websocket/play/play-rightand-wrong/play-rightand-wrong.component';
import { AddSwitch } from './add-quiz/addswitch';
import { QuiztypeinfoComponent } from './quiztypeinfo/quiztypeinfo.component';
import { QuizType } from './model/quiztype.model';
import { RightorwrongbuttonComponent } from './rightorwrong/rightorwrongbutton/rightorwrongbutton.component';
import { RightorwrongComponent } from './rightorwrong/rightorwrong.component';
import { PlayclozeComponent } from './websocket/play/playcloze/playcloze.component';
import { PlayqandaComponent } from './websocket/play/playqanda/playqanda.component';
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
import { ChatComponent } from './websocket/chat/chat.component';
import { ProfileComponent } from './profile/profile.component';
import { AddMultiplayComponent } from './add-multiplay/add-multiplay.component';
import { QandainputComponent } from './qanda/qandainput/qandainput.component';
import { QandascoreComponent } from './qanda/qandascore/qandascore.component';
import { ClozeComponent } from './cloze/cloze.component';
import { ClozeinputComponent } from './cloze/clozeinput/clozeinput.component';
import { SwitchComponent } from './quiz-overview/switch-quiztype';
import { Multiswitch } from './multiplay-overview/multiswitch';
import { PlayMemoryComponent } from './websocket/play/play-memory/play-memory.component';


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
    {path: 'multichoice/:id', component: MultichoiceComponent},
    {path: 'multichoice-choice', component: MultichoiceChoiceComponent},
    {path: 'addquizcontent', component: AddQuizContentComponent},
    {path: 'addcloze', component: AddClozeComponent},
    {path: 'addrightorwrong', component: AddRightorwrongComponent},
    {path: 'addmemory', component: AddMemoryComponent},
    {path: 'addmultichoice', component: AddMultichoiceComponent},
    {path: 'play/:id/:qid', component: ChatComponent},
    {path: 'chat/:catid/:ageid', component: ChatComponent},
    {path: 'profile', component: ProfileComponent},
    {path:'add-multiplay',component:AddMultiplayComponent},
    {path: 'cloze/:id', component: ClozeComponent},
    {path: 'clozeinput', component: ClozeinputComponent},
    {path: 'switch/:qid/:id', component: SwitchComponent},
    {path: 'rightorwrong/:id', component: RightorwrongComponent},
    {path: 'rightorwrongbutton', component: RightorwrongbuttonComponent},
    {path: 'switch/:qid/:id', component: SwitchComponent},
    {path: 'multiswitch/:qtid/:qid/:id', component: Multiswitch},
    {path: 'multiqanda/:id/:qid', component: PlayqandaComponent},
    {path: 'multicloze/:id/:qid', component: PlayclozeComponent},
    {path: 'quiztypeinfo', component: QuiztypeinfoComponent},
    {path: 'multirightorwrong/:id/:qid', component: PlayRightandWrongComponent},
    {path: 'quiztypeinfo', component: QuiztypeinfoComponent},
    {path: 'addswitch/:id', component: AddSwitch},
    {path: 'multimultichoice/:id/:qid', component: PlayMultichoiceComponent},
    {path: 'multimemory/:id/:qid', component: PlayMemoryComponent},
    {path: 'memory/:id', component: MemoryComponent},
    {path: 'statistics', component: StatisticsComponent},
    {path: 'contact', component: ContactComponent},
    {path: 'about', component: AboutComponent},
    {path: 'share/:id', component: ShareComponent},
    {path: 'my-quizoverview/:id/:age', component: MyQuizComponent}


];


export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);