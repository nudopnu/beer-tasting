import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BeerSelectionComponent } from './components/beer-selection/beer-selection.component';
import { BeerComponent } from './components/beer-selection/beer/beer.component';
import { DropDownComponent } from './components/drop-down/drop-down.component';
import { IconComponent } from './components/icon/icon.component';
import { ModalComponent } from './components/modal/modal.component';
import { SettingsComponent } from './components/modal/settings/settings.component';
import { PlotComponent } from './components/plot/plot.component';
import { WebcamComponent } from './components/webcam/webcam.component';
import { MainComponent } from './routes/main/main.component';
import { FaceExpressionComponent } from './components/face-expression/face-expression.component';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    WebcamComponent,
    PlotComponent,
    IconComponent,
    ModalComponent,
    SettingsComponent,
    DropDownComponent,
    BeerSelectionComponent,
    BeerComponent,
    FaceExpressionComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
