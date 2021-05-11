class Timer {
  constructor(
    timeContainer,
    { children: { start: startBtn, pause: pauseBtn } }
  ) {
    this._startTime = null;
    this._diff = 0;
    this._isRunning = false;
    this._timeContainer = timeContainer;
    this._startBtn = startBtn;
    this._pauseBtn = pauseBtn;

    this._startBtn.addEventListener('click', ({currentTarget})=>{
      if(!this._isRunning && !this._startTime){
        this.start();
        this._pauseBtn.hidden = false;
        currentTarget.innerText = "Stop";
        return;
      }
      this.stop();
      this._pauseBtn.hidden = true;
      this._pauseBtn.innerText = "Pause";
      currentTarget.innerText = "Start";
    });

    this._pauseBtn.addEventListener('click', ({currentTarget})=>{
      if(this._isRunning){
        this.pause();
        currentTarget.innerText = "Resume";
        return;
      }
      this.resume();
      currentTarget.innerText = "Pause";
    });
  }

  _timeoutHandler = () => {
    if (!this._isRunning) return;
    setTimeout(this._timeoutHandler, 10);
    this._timeContainer.innerText = this._msToTime(Date.now() - this._startTime);
  };

  _getCorrectTimeString(v){
    return v < 10 ? `0${v}` : v;
  }

  _msToTime(duration = 0) {
    const seconds = this._getCorrectTimeString(((duration / 1000) % 60).toFixed(3));
    const minutes = this._getCorrectTimeString(Math.trunc((duration / (1000 * 60)) % 60));
    const hours = this._getCorrectTimeString(Math.trunc(duration / (1000 * 60 * 60)));

    return `${hours}:${minutes}:${seconds}`
  }

  start() {
    this._startTime = Date.now();
    this._isRunning = true;
    this._timeoutHandler();
  }

  stop() {
    this._startTime = null;
    this._isRunning = false;
    this._diff = 0;
  }

  pause(){
    if(!this._startTime) return;
    this._isRunning = false;
    this._diff = Date.now() - this._startTime;
  }

  resume(){
    if(!this._startTime) return;
    this._isRunning = true;
    this._startTime = Date.now() - this._diff;
    this._timeoutHandler();
  }
}
