import { TimerWork } from "./timer.module";

//Interface Observer
  interface TimerEvent {
    triggered(value:number);
    done();
}

//Timer class
class Timer {

  duration:number = 1;
  interval;
  tickevent: TimerEvent;
  doneEvent: TimerEvent;

  started: boolean = false;

  constructor(duration: number) {
    this.duration = duration;
    console.log("Val:"+duration+" THIS:"+this.duration);
  }

  start(): TimerWork{
    this.handeStateChange(true);
    return this;
  }
   stop() {
    this.handeStateChange(false);
  }

  setTickEvent(event: TimerEvent) {
    this.tickevent = event;
  }

  setDoneEvent(event: TimerEvent) {
    this.doneEvent = event;
  }

  private trigger(){
      this.duration--;
      console.log("Trigger:"+this.duration);
      if(this.tickevent) {
        this.tickevent.triggered(this.duration);
      }
      if(this.duration < 1) {
        this.stop();
        if(this.doneEvent) {
          this.doneEvent.done();
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