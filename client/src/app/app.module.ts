import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BeerSelectionComponent } from './components/beer-selection/beer-selection.component';
import { BeerComponent } from './components/beer-selection/beer/beer.component';
import { IconComponent } from './components/icon/icon.component';
import { ModalComponent } from './components/modal/modal.component';
import { SettingsComponent } from './components/modal/settings/settings.component';
import { PlotComponent } from './components/plot/plot.component';
import { WebcamComponent } from './components/webcam/webcam.component';
import { MainComponent } from './routes/main/main.component';
import { FaceExpressionStatsComponent } from './components/face-expression/face-expression-stats/face-expression-stats.component';
import { QrReaderComponent } from './components/qr-reader/qr-reader.component';
import { RegisterComponent } from './routes/register/register.component';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { de_DE } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import de from '@angular/common/locales/de';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ZorroModule } from './zorro.module';
import { FaceExpressionComponent } from './components/face-expression/face-expression.component';
import { RadarChartComponent } from './components/face-expression/radar-chart/radar-chart.component';
import { QrCodeComponent } from './components/qr-code/qr-code.component';
import { StatisticsComponent } from './routes/statistics/statistics.component';
import { OpenerComponent } from './routes/main/opener/opener.component';
import { DrinkingComponent } from './routes/main/drinking/drinking.component';
import { UserScanningComponent } from './routes/main/user-scanning/user-scanning.component';

registerLocaleData(de);

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    WebcamComponent,
    PlotComponent,
    IconComponent,
    ModalComponent,
    SettingsComponent,
    BeerSelectionComponent,
    BeerComponent,
    FaceExpressionStatsComponent,
    QrReaderComponent,
    RegisterComponent,
    FaceExpressionComponent,
    RadarChartComponent,
    QrCodeComponent,
    StatisticsComponent,
    OpenerComponent,
    DrinkingComponent,
    UserScanningComponent,
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
