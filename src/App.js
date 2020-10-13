import React, { useState } from "react";
import { render } from "react-dom";

const App = () => {
  const [intervalTimer, setIntervalTimer] = useState(5);
  const [workingTimer, setWorkingTimer] = useState(25);
  const [runningTimer, setRunningTimer] = useState("25:00");
  const [timerFunction, setTimerFunction] = useState();
  const [isPaused, setIsPause] = useState(true);
  const [pauseIndex, setPauseIndex] = useState(0);
  const [isSession, setIsSession] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);

  const startTimer = (e) => {
    e.preventDefault();
    setIsPause(false);

    if (pauseIndex > 0) {
      runTimer(currentTime);
      return;
    }
    const audioEl = document.getElementsByClassName("audio-element")[0];
    audioEl.play();
    setIsSession(true);
    runTimer(workingTimer * 60);
  };

  const pauseTimer = () => {
    setIsPause(true);
    setPauseIndex(pauseIndex + 1);
    console.log("pause number--" + currentTime);
    clearInterval(timerFunction);

    console.log(runningTimer);
  };

  const toggleTimers = () => {
    const audioEl = document.getElementsByClassName("audio-element")[0];
    audioEl.play();
    console.log(isSession);
    setIsSession(!isSession);
    console.log(isSession);
    let currentTimer = isSession ? workingTimer : intervalTimer;
    runTimer(currentTimer * 60);
  };

  const runTimer = (seconds) => {
    let timerId = setInterval(function () {
      setTimerFunction(timerId);
      setRunningTimer(convertSecondsToMinutes(seconds));
      setCurrentTime(seconds);
      seconds = seconds - 1;
      if (seconds == 0) {
        clearInterval(timerId);
        toggleTimers();
      }
    }, 1000);
  };

  const convertSecondsToMinutes = (seconds) => {
    let time =
      Math.floor(seconds / 60) +
      ":" +
      ("0" + Math.floor(seconds % 60)).slice(-2);
    return time;
  };

  const incrementTimer = (e) => {
    e.preventDefault();
    setWorkingTimer(workingTimer + 1);
    setRunningTimer(convertSecondsToMinutes((workingTimer + 1) * 60));
  };

  const decrementTimer = (e) => {
    e.preventDefault();
    setWorkingTimer(workingTimer - 1);
    setRunningTimer(convertSecondsToMinutes((workingTimer - 1) * 60));
  };

  const resetTimer = () => {
    console.log("timer function is" + timerFunction);
    clearInterval(timerFunction);
    setIntervalTimer(intervalTimer);
    setWorkingTimer(workingTimer);
    setRunningTimer(convertSecondsToMinutes(workingTimer * 60));
    setIsPause(true);
    setPauseIndex(0);
    setIsSession(true);
  };

  return (
    <div className="pomodoro-container">
      <div className="rounded overflow-hidden shadow-lg p-4">
        <div className="flex">
          <div className="text-gray-700 text-center px-4 py-2 m-2 font-sans">
            <p className="text-lg text-gray-800 text-center">Break Length</p>
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mr-2 rounded-full"
              onClick={(e) => {
                e.preventDefault();
                setIntervalTimer(intervalTimer - 1);
              }}
              disabled={intervalTimer === 1}
            >
            -
            </button>
            <span className="text-md text-gray-800 ">{intervalTimer}</span>
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 ml-2 rounded-full"
              onClick={(e) => {
                e.preventDefault();
                setIntervalTimer(intervalTimer + 1);
              }}
            >
            +
            </button>
          </div>
          <div className="text-gray-700 text-center px-4 py-2 m-2 font-sans">
            <p className="text-lg text-gray-800 text-center">Session Length</p>
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mr-2 rounded-full"
              onClick={decrementTimer}
              disabled={workingTimer === 1}
            >
            -
            </button>
            <span className="text-md text-gray-800 ">{workingTimer}</span>
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 ml-2 rounded-full"
              onClick={incrementTimer}
            >
             +
            </button>
          </div>
        </div>

        <div className="text-gray-700 text-center px-4 py-2 m-2 font-sans">
          {isSession ? "Session" : "Interval"} is running!
          <p className="text-6xl">{runningTimer}</p>
        </div>

        <div className="text-center font-sans">
          <button
            className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow mx-2"
            onClick={isPaused ? startTimer : pauseTimer}
          >
            {isPaused ? "Start" : "Pause"}
          </button>

          <button
            className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow mx-2"
            onClick={resetTimer}
          >
            Reset
          </button>
        </div>
      </div>

      <div>
        <audio className="audio-element">
          <source src="https://assets.coderrocketfuel.com/pomodoro-times-up.mp3"></source>
        </audio>
      </div>
    </div>
  );
};
render(<App />, document.getElementById("root"));
