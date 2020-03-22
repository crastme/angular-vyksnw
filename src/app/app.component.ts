import { Component, OnInit } from '@angular/core';
import {SporttimerComponent} from './sporttimer/sporttimer.component'

enum Mode {
  Workout,
  Pause
}

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent implements OnInit  {
  name = 'TPG :: stay healthy timer';
  timeWorkout = 40;
  timePause = 10;
  started = false;
  status = "Stopped";
  interval;
  mode = Mode.Workout;
  currentValue = 0;
  listimagesWorkout = [
"https://rellez.de/thomas/movie.jpg",
"https://rellez.de/thomas/300.jpg",
"https://rellez.de/thomas/saiyan.jpg",
"https://rellez.de/thomas/blade.jpg" 
  ];

  private audioContext: AudioContext;

  ngOnInit() {
    this.audioContext = new AudioContext();
  }

  handleStart($event){
    this.started = !this.started;
    if(this.started) {
      this.currentValue = this.timeWorkout;
      this.status = "Started";
      this.mode = Mode.Workout;
      this.startTimer();
    }
    else {
      this.status = "Stopped";
      this.stopTimer();
    }
  }

  isWorkout() {
    return this.mode == Mode.Workout;
  }

 isPause() {
    return this.mode == Mode.Pause;
  }

changeMode(option:Mode) {
  this.mode = option;
  this.playSound();
}

playSound(){
  switch(this.mode)
  {
    case Mode.Workout:
      this.playWorkout();
    break;
    case Mode.Pause:
      this.playPause();
    break;
  }
}

playWorkout() {
  console.log("playWorkout");
    var ctx = new AudioContext();
    const osci = ctx.createOscillator();
    const gain = ctx.createGain();

    osci.connect(gain);
    osci.type = 'sine';
    osci.frequency.value = 277.18;
    osci.start(ctx.currentTime+3);
    osci.stop(ctx.currentTime+3+3);
}

playPause() {

console.log("playPause");
    var ctx = new AudioContext();
    const osci = ctx.createOscillator();
    const gain = ctx.createGain();

    osci.connect(gain);
    osci.type = 'sine';
    osci.frequency.value = 277.18;
    osci.start(ctx.currentTime+3);
    osci.stop(ctx.currentTime+3+3);
}

  startTimer() {
    this.interval = setInterval(() => {
        if(this.currentValue < 1) {
          if(this.mode == Mode.Workout) {
            this.currentValue = this.timePause;
            this.changeMode(Mode.Pause);
          }
          else {
            this.changeMode(Mode.Workout);
            this.currentValue = this.timeWorkout;
          }
        }
        else {
          this.currentValue--;
        }
    }, 1000);
  }

  stopTimer() {
    clearInterval(this.interval);
  }
}
