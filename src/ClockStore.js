import { makeAutoObservable } from "mobx"

class ClockStore {
    breakLength = 5
    sessionLength = 25

    constructor(){
        makeAutoObservable(this)
    }

    increase_break(){
        this.breakLength = this.breakLength + 1
    }
    decrease_break(){
        this.breakLength = this.breakLength - 1
    }
    increase_session(){
        this.sessionLength = this.sessionLength + 1
    }
    decrease_session(){
        this.sessionLength = this.sessionLength - 1
    }
}
export const clockStore = new ClockStore()