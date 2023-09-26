import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './routes/main/main.component';
import { RegisterComponent } from './routes/register/register.component';
import { StatisticsComponent } from './routes/statistics/statistics.component';
import { InfoComponent } from './routes/info/info.component';

const routes: Routes = [
  { path: '', component: MainComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'info', component: InfoComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
