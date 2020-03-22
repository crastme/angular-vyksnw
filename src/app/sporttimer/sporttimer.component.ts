import { Component, OnInit, Input } from '@angular/core';
import { TimerModule, TimerEvent, TimerWork } from './timer/timer.module';


enum ButtonState {
  Go = "Go",
  Stop = "Stop"
}

enum TimerState {
  Workout = "Workout",
  Pause = "Rest",
  None = ""
}

@Component({
  selector: 'app-sporttimer',
  templateUrl: './sporttimer.component.html',
  styleUrls: ['./sporttimer.component.css']
})
export class SporttimerComponent implements OnInit, TimerEvent {
  
 
 
  constructor(private tm : TimerModule) {
   }

  @Input()
  durationPause: number = 10;

  @Input()
  durationWorkout: number = 40;

  buttonState = ButtonState.Go;
  modus = TimerState.None;
  current: number = 0;
  rounds: number = 0;
  timer: TimerWork;

  workImage = "https://rellez.de/thomas/workout.gif";
  restImage = "https://rellez.de/thomas/rest.gif";

  triggered(value:number) {
    //console.log("triggered:"+value);
    this.current = value;
  };

  done() {
     if(this.modus == TimerState.Pause) {
          this.modus = TimerState.Workout;
          this.rounds++;
           this.playWorkout();
           //this.sm.playStart();
          this.startTimer(this.durationWorkout);
        } else {
          this.modus = TimerState.Pause;
          this.playRest();
           //this.sm.playPause();
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

  playWorkout() {
    var audio = new Audio();
audio.src = "https://rellez.de/thomas/workout.wav"
audio.load();
audio.play();
  }

  playRest() {
    var audio = new Audio();
audio.src = "https://rellez.de/thomas/rest.wav"
audio.load();
audio.play();

  }

  private startTimer(duration:number){
    this.current = duration;
   
    console.log("start");
    this.timer = this.tm.generateTimer(duration, this);
    this.timer.start();
  }

  private start() {
    
    this.modus = TimerState.Workout;
    this.rounds = 1;
    this.buttonState = ButtonState.Stop
    console.log("start");
    this.startTimer(this.durationWorkout);
    this.playWorkout();
  }

  private stop() {
    this.modus = TimerState.None;
    this.buttonState = ButtonState.Go
    console.log("stop");
    this.timer.stop();
    this.playRest();
  }

  ngOnInit() {
  }

}


