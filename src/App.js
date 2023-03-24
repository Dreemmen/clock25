
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import { observer } from 'mobx-react-lite';
import { clockStore } from './ClockStore';

console.log(clockStore.decrease_break)


function App() {
  return (
    <div className="App container" >
      <div className='row'>

        <div className='col-6'>
          <div className='row'>
            <div id="break-label">break label</div>
          </div>
            <div className='row'>
              <div id="break-decrement" className='col-4' onClick={clockStore.decrease_break}>decrease break</div>
              <div id="break-length" className='col-4'>{clockStore.breakLength}</div>
              <div id="break-increment" className='col-4' onClick={clockStore.increase_break}>increase break</div>
            </div>
        </div>

        <div className='col-6'>
          <div className='row'>
            <div id="session-label">session label</div>
          </div>
          <div className='row'>
            <div id="session-decrement" className='col-4'>decrease session</div>
            <div id="session-length" className='col-4'>{clockStore.sessionLength}</div>
            <div id="session-increment" className='col-4'>increase session</div>
          </div>
        </div>

      </div>
    </div>
  );
}

export default observer(App);
