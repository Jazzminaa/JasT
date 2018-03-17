import { Multiswitch } from './multiplay-overview/multiswitch';
import { WebsocketService } from './websocket/websocket-service';
import { DataService } from './shared/data.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule, JsonpModule } from '@angular/http';
import { routing } from './app.routes'; 
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AddMultiplayComponent } from './add-multiplay/add-multiplay.component';
import { AddQuizComponent } from './add-quiz/add-quiz.component';
import { AddQuizContentComponent } from './add-quiz/add-quiz-content/add-quiz-content.component';
import { ClozeComponent } from './cloze/cloze.component';
import { ClozeinputComponent } from './cloze/clozeinput/clozeinput.component';
import { LoginComponent } from './login/login.component';
import { MultiplayOverviewComponent } from './multiplay-overview/multiplay-overview.component';
import { ProfileComponent } from './profile/profile.component';
import { QandaComponent } from './qanda/qanda.component';
import { QandainputComponent } from './qanda/qandainput/qandainput.component';
import { QandascoreComponent } from './qanda/qandascore/qandascore.component';
import { QuizOverviewComponent } from './quiz-overview/quiz-overview.component';
import { RegisterComponent } from './register/register.component';
import { ChatComponent } from './websocket/chat/chat.component';
import "rxjs/add/operator/map";
import "rxjs/add/operator/catch";
import 'rxjs/add/observable/of';
import { SwitchComponent } from './quiz-overview/switch-quiztype';
import { PlayqandaComponent } from './websocket/play/playqanda/playqanda.component';
import { PlayclozeComponent } from './websocket/play/playcloze/playcloze.component';
import { RightorwrongComponent } from './rightorwrong/rightorwrong.component';
import { RightorwrongbuttonComponent } from './rightorwrong/rightorwrongbutton/rightorwrongbutton.component';
import { QuiztypeinfoComponent } from './quiztypeinfo/quiztypeinfo.component';
import { PlayRightandWrongComponent } from './websocket/play/play-rightand-wrong/play-rightand-wrong.component';
import { AddSwitch } from './add-quiz/addswitch';
import { MemoryComponent } from './memory/memory.component';
import { AddRightorwrongComponent } from './add-quiz/add-rightorwrong/add-rightorwrong.component';
import { AddClozeComponent } from './add-quiz/add-cloze/add-cloze.component';
import { AddMemoryComponent } from './add-quiz/add-memory/add-memory.component';
import { MultichoiceComponent } from './multichoice/multichoice.component';
import { MultichoiceChoiceComponent } from './multichoice/multichoice-choice/multichoice-choice.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AddMultiplayComponent,
    AddQuizComponent,
    AddQuizContentComponent,
    ClozeComponent,
    ClozeinputComponent,
    LoginComponent,
    MultiplayOverviewComponent,
    ProfileComponent,
    QandaComponent,
    QandainputComponent,
    QandascoreComponent,
    QuizOverviewComponent,
    RegisterComponent,
    ChatComponent,
    SwitchComponent,
    PlayqandaComponent,
    PlayclozeComponent,
    Multiswitch,
    RightorwrongComponent,
    RightorwrongbuttonComponent,
    QuiztypeinfoComponent,
    AddSwitch,
    AddRightorwrongComponent,
    AddClozeComponent,
    AddMemoryComponent,
    PlayRightandWrongComponent,
    AddSwitch,
    MemoryComponent,
    MultichoiceComponent,
    MultichoiceChoiceComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    routing,
    JsonpModule,
  ],
  providers: [DataService,WebsocketService],
  bootstrap: [AppComponent]
})
export class AppModule { }
