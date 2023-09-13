import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainComponent } from './routes/main/main.component';
import { WebcamComponent } from './components/webcam/webcam.component';
import { PlotComponent } from './components/plot/plot.component';
import { IconComponent } from './components/icon/icon.component';
import { ModalComponent } from './components/modal/modal.component';
import { SettingsComponent } from './components/modal/settings/settings.component';
import { DropDownComponent } from './components/drop-down/drop-down.component';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    WebcamComponent,
    PlotComponent,
    IconComponent,
    ModalComponent,
    SettingsComponent,
    DropDownComponent
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
