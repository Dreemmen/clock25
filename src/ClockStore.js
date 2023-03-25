import { autorun, makeObservable, observable, computed, action } from "mobx"

class ClockStore {
    breakLength = 0;
    sessionLength = 0;
    __date = new Date(0)
    isTicking = false
    isBreak = false
    isSixty = false
    timer = null
    time = '25:00'
    beep = new Audio
 
    constructor() {
        makeObservable(this, {
            breakLength: observable,
            sessionLength: observable,
            __date: true,
            isTicking: true,
            isBreak: true,
            beep: true,
            timer: observable,
            start_stop: action,
            resetClock: action,
            increase_break: action,
            decrease_break: action,
            increase_session: action,
            decrease_session: action,
            check_time: action,
            getTime: computed,
            time: observable
        })
        this.resetClock() 
        autorun(() => {
            if(this.time == '00:00'){
                this.beep.target.volume = 1
                this.beep.target.currentTime = 0;
                this.beep.target.play()
            }
        })
    }
    
    get getTime(){
        let sixtyFix = '0'
        if(this.isSixty){
            sixtyFix = '6'
            this.isSixty = false
        }
        return (
            //((this.__date.getMinutes()=='00')?'6':'0')
            ((this.__date.getMinutes() < 10)?sixtyFix+this.__date.getMinutes() : this.__date.getMinutes())
            + ":"
            +((this.__date.getSeconds() < 10)?'0'+this.__date.getSeconds() : this.__date.getSeconds())
            )
    }

    loadAudio(audio){
        this.beep = audio
        this.beep.target.play()
        this.beep.target.volume = 0
    }

    check_time = () => {
        if(this.getTime=='00:00'){
            this.__date.setMinutes((!this.isBreak)?this.breakLength:this.sessionLength)
            this.__date.setSeconds(1)
            this.isBreak = !this.isBreak
            if(this.beep.oncanplay) this.beep.play()
        }
            this.time = this.getTime
    }
    make_time = (minutes) => {
        if(minutes==60){
            this.isSixty = true
        }
        clearInterval(this.timer)
        this.__date.setMinutes(minutes)
        this.__date.setSeconds(0)
        this.check_time()
    }

    start_stop = () => {  
      if(this.isTicking){
        clearInterval(this.timer)
        this.timer = null
      }else{
        this.timer = setInterval(()=>{
          this.__date.setTime(this.__date.valueOf() - 1000)
          this.check_time()
        }, 1000)
        
      }
      this.isTicking = !this.isTicking
    }

    resetClock(){
        this.breakLength = 5;
        this.sessionLength = 25
        this.__date.setMinutes(25)
        this.__date.setSeconds(0)
        clearInterval(this.timer)
        this.isTicking = false
        this.isBreak = false
        if(this.beep.target != undefined){
             this.beep.target.pause()
             this.beep.target.currentTime = 0;
        }
        this.check_time()
    }

    increase_break(){
        if(this.breakLength <= 59){
             this.breakLength = this.breakLength + 1
             if(this.isBreak) this.make_time(this.breakLength)
        }
    }
    decrease_break(){
        if(this.breakLength >=2 ){
            this.breakLength = this.breakLength - 1
            if(this.isBreak) this.make_time(this.breakLength)
        } 
    }
    increase_session(){
        if(this.sessionLength <= 59){
            this.sessionLength = this.sessionLength + 1
            if(!this.isBreak) this.make_time(this.sessionLength)
        }
    }
    decrease_session(){
        if(this.sessionLength >=2 ){
             this.sessionLength = this.sessionLength - 1
             if(!this.isBreak) this.make_time(this.sessionLength)
        }
    }
}
export default ClockStore