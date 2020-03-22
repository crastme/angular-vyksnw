import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HelloComponent } from './hello.component';
import { SporttimerComponent } from './sporttimer/sporttimer.component';
import { TimerModule } from './sporttimer/timer/timer.module';


@NgModule({
  imports:      [ 
    BrowserModule, 
    FormsModule, 
    TimerModule
    ],
  declarations: [ AppComponent, HelloComponent, SporttimerComponent ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
