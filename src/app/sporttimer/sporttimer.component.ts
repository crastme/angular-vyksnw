import { Component, OnInit, Input } from '@angular/core';
import { TimerModule, TimerWork } from './timer/timer.module';
import { SounderModule } from './sounder/sounder.module';


enum ButtonState {
  Go = "Go",
  Stop = "Stop"
}

enum TimerState {
  Workout = "Workout",
  Pause = "Pause"
}

@Component({
  selector: 'app-sporttimer',
  templateUrl: './sporttimer.component.html',
  styleUrls: ['./sporttimer.component.css']
})
export class SporttimerComponent implements OnInit, TimerEvent {
  
 
 
  constructor(private tm: TimerModule, private sm: SounderModule) {
   }

  @Input()
  durationPause: number = 5;

  @Input()
  durationWorkout: number = 10;

  buttonState = ButtonState.Go;
  modus = TimerState.Workout;
  current: number = 0;
  rounds: number = 0;
  timer: TimerWork;

  triggered(value:number) {
    this.current = value;
  };

  done() {
     if(this.modus == TimerState.Pause) {
          this.modus = TimerState.Workout;
          this.rounds++;
           this.sm.playStart();
          this.startTimer(this.durationWorkout);
        } else {
          this.modus = TimerState.Pause;
           this.sm.playPause();
          this.startTimer(this.durationPause);
        }        
  }

  handleStart($event){
    if(this.buttonState == ButtonState.Go){
        this.start();
    } else {
        this.stop();
    }
  }

  private startTimer(duration:number){
    this.current = duration;
   
    console.log("start");
    this.timer = this.tm.generateTimer(duration, this).start();
  }

  private start() {
    this.rounds = 1;
    this.buttonState = ButtonState.Stop
    console.log("start");
    this.startTimer(this.durationWorkout);
  }

  private stop() {
    this.buttonState = ButtonState.Go
    console.log("stop");
    this.timer.stop();
  }

  ngOnInit() {
  }

}


