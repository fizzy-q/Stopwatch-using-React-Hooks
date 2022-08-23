import React, { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [time, setTime] = useState(0);
  const [Paused, setPaused] = useState(true);
  const [Active, setActive] = useState(null);
  const [split, setSplit] = useState([]);

  useEffect(() => {
    if (!Paused) {
      let timer = setInterval(() => {
        setTime(() => {
          const elapsedTime = Date.now() - Active;
          return elapsedTime;
        });
      }, 1);
      return () => clearInterval(timer);
    }
  }, [Paused, Active]);

  const start = () => {
    setActive(Date.now() - time);
    setPaused((p) => !p);
    if (!Paused) lapsTime("pause");
  };

  const reset = () => {
    setTime(0);
    setPaused(true);
    setSplit([]);
  };

  const splitTime = () => {
    lapsTime("split");
  };

  const lapsTime = (laps) => {
    setSplit((split) => [...split, { time, laps }]);
  };

  
  const formatTime = (mSec) => {
    let seconds = mSec;
    const gethrs = Math.floor(seconds /(60 * 60 * 1000));
    seconds -= gethrs * (60 * 60 * 1000);
    const getmins = Math.floor(seconds / (60 * 1000));
    seconds -= getmins * (60 * 1000);
    const getsec = Math.floor(seconds / (1000));
    seconds -= getsec * (1000);
    const getms = seconds % 1000;
  
    const Ms = getms.toString().padStart(3, "0");
    const S = getsec.toString().padStart(2, "0");
    const M = getmins.toString().padStart(2, "0");
    const H = gethrs.toString().padStart(2, "0");
  
    return `${H}:${M}:${S}.${Ms}`;
  };

  const Reset = time === 0;

  const timerState = !Paused ? "Pause" : "Start";
  const formattedTime = formatTime(time);
  return (
    <div>
    <h1>React Stopwatch</h1>
      <div className="stopwatch">
        <span>{formattedTime.slice(0, -2)}</span>
        <span >{formattedTime.slice(-2)}</span>
      </div>
      <h2>Split Time</h2>
      <div>
        <button className={Paused ? "start" : "pause"} onClick={start}>
          {timerState}
        </button>
        <button disabled={Reset || Paused}  onClick={splitTime}>
          Split
        </button>
        <button  disabled={Reset || !Paused}  onClick={reset}>
          Reset
        </button>
      </div>
      <div className="laps">
      {split.length > 0}
        {split.map((lap, index, array) => {
          const { time } = lap;
          const interval = index > 0 ? time - array[index - 1].time : time;
          return (
            <div key={time}>
              <div> #{index + 1} - {formatTime(interval)}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
