import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: []
})
export class TimerModule { 

  generateTimer(duration: number, observer: TimerEvent) {
    return new Timer(duration).setObserver(observer);
  }

}


//Interface Observer
export interface TimerEvent {
    triggered(value:number);
    done();
}

export interface TimerWork {
  start();
  stop();
}


//Timer class
class Timer implements TimerWork{

  duration:number = 1;
  interval;
  observer: TimerEvent;

  started: boolean = false;

  constructor(duration: number) {
    this.duration = duration;
    console.log("Val:"+duration+" THIS:"+this.duration);
  }

  start(){
    this.handeStateChange(true);
  }
   stop() {
    this.handeStateChange(false);
  }

  setObserver(observer: TimerEvent): TimerWork{
    this.observer = observer;
    return this;
  }

  private trigger(){
      this.duration--;
      console.log("Trigger:"+this.duration);
      if(this.observer) {
        this.observer.triggered(this.duration);
      }
      if(this.duration < 1) {
        this.stop();
        if(this.observer) {
          this.observer.done();
        }
      }
  }

  private handeStateChange(state) {
    if(state != this.started){
      this.started = state;
      if(state) {
        this.interval = setInterval(() => {
          this.trigger();
        }, 1000);
        console.log("Interval started");
      }
      else {
        console.log("Interval cleared");
        clearInterval(this.interval);
      }
    }
  }
}