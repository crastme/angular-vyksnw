import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HelloComponent } from './hello.component';
import { SporttimerComponent } from './sporttimer/sporttimer.component';
import { TimerModule } from './sporttimer/timer/timer.module';
import { SounderModule } from './sporttimer/sounder/sounder.module';


@NgModule({
  imports:      [ 
    BrowserModule, 
    FormsModule, 
    TimerModule, 
    SounderModule
    ],
  declarations: [ AppComponent, HelloComponent, SporttimerComponent ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
