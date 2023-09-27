import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { registerLocaleData } from '@angular/common';
import de from '@angular/common/locales/de';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NZ_I18N, de_DE } from 'ng-zorro-antd/i18n';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BeerSelectionComponent } from './components/beer-selection/beer-selection.component';
import { FaceExpressionStatsComponent } from './components/face-expression/face-expression-stats/face-expression-stats.component';
import { RadarChartComponent } from './components/face-expression/radar-chart/radar-chart.component';
import { IconComponent } from './components/icon/icon.component';
import { SettingsComponent } from './components/modal/settings/settings.component';
import { PlotComponent } from './components/plot/plot.component';
import { QrCodeComponent } from './components/qr-code/qr-code.component';
import { QrReaderComponent } from './components/qr-reader/qr-reader.component';
import { WebcamComponent } from './components/webcam/webcam.component';
import { DrinkingComponent } from './routes/main/drinking/drinking.component';
import { MainComponent } from './routes/main/main.component';
import { OpenerComponent } from './routes/main/opener/opener.component';
import { UserScanningComponent } from './routes/main/user-scanning/user-scanning.component';
import { RegisterComponent } from './routes/register/register.component';
import { StatisticsComponent } from './routes/statistics/statistics.component';
import { ZorroModule } from './zorro.module';
import { CountdownComponent } from './components/countdown/countdown.component';
import { RatingComponent } from './routes/main/drinking/rating/rating.component';
import { UserStatisticsComponent } from './routes/main/user-statistics/user-statistics.component';
import { ReactionComponent } from './routes/main/user-statistics/reaction/reaction.component';
import { ResourceProviderComponent } from './components/resource-provider/resource-provider.component';
import { InfoComponent } from './routes/info/info.component';
import { UserDataFormComponent } from './components/user-data-form/user-data-form.component';
import { GenerationLabelPipe } from './pipes/generation-label.pipe';
import { ModalRegisterComponent } from './components/modal/modal-register/modal-register.component';

registerLocaleData(de);

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    WebcamComponent,
    PlotComponent,
    IconComponent,
    SettingsComponent,
    BeerSelectionComponent,
    FaceExpressionStatsComponent,
    QrReaderComponent,
    RegisterComponent,
    RadarChartComponent,
    QrCodeComponent,
    StatisticsComponent,
    OpenerComponent,
    DrinkingComponent,
    UserScanningComponent,
    CountdownComponent,
    RatingComponent,
    UserStatisticsComponent,
    ReactionComponent,
    ResourceProviderComponent,
    InfoComponent,
    UserDataFormComponent,
    GenerationLabelPipe,
    ModalRegisterComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    ZorroModule,
  ],
  providers: [
    { provide: NZ_I18N, useValue: de_DE }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
