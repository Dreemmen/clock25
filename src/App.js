
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import { observer } from 'mobx-react-lite';
import ClockStore from './ClockStore';

const clockStore = new ClockStore()
    
function App() {
  return (
    <div className="App container w-100" >
      <div className='row justify-content-center'>

        <div className='col-2'>
          <div className='row'>
            <div id="break-label" className='break-label'>Break setup</div>
          </div>
            <div className='row'>
              <div id="break-decrement" className='col-4 button1' onClick={() => clockStore.decrease_break()}>Decrease break</div>
              <div id="break-length" className='col-4 num-display'>{clockStore.breakLength}</div>
              <div id="break-increment" className='col-4 button1' onClick={() => clockStore.increase_break()}>Increase break</div>
            </div>
        </div>

        <div className='col-2 margin-left-sm'>
          <div className='row'>
            <div id="session-label" className='session-label'>Session setup</div>
          </div>
          <div className='row'>
            <div id="session-decrement" className='col-4 button1' onClick={() => clockStore.decrease_session()}>Decrease session</div>
            <div id="session-length" className='col-4 num-display'>{clockStore.sessionLength}</div>
            <div id="session-increment" className='col-4 button1' onClick={() => clockStore.increase_session()}>Increase session</div>
          </div>
        </div>

      </div>
      <div className='row justify-content-center'>

        <div className='col-2 main-display'>
          <div id="timer-label" className={"display-"+((clockStore.isBreak)?'break':'session')}>{(clockStore.isBreak)?'Break':'Session'}</div>
          <div id="time-left" className='time-left'>{clockStore.time}</div>
        </div>
        
      </div>
      <div className='row justify-content-center'>
        
        <div className='col-1'>
          <div id="start_stop" className='button1' onClick={clockStore.start_stop}>Start / Stop</div>
        </div>
        <div className='col-1'>
          <div id="reset" className='button1' onClick={() => {clockStore.resetClock()}}>Reset</div>
        </div>

      </div>
      <audio id="beep" onCanPlay={(event) => clockStore.loadAudio(event)} src="https://audio-previews.elements.envatousercontent.com/files/177328289/preview.mp3?response-content-disposition=attachment%3B+filename%3D%22A3TMECN-beep.mp3%22"/>
    </div>
  );
}
export default observer(App);
