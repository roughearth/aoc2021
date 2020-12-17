import React, { useCallback, useEffect, useMemo, useState } from 'react';
import {Days, Day, SafetyNet} from './days';
import './App.css';
import { timeAndRun } from './utils';

const today = (() => {
  const now = new Date();
  return now.getDate();
})();

const leaderboardList = window.localStorage.getItem('leaderboardList');
let leaderBoardMap: [string, string][] = [];

if (leaderboardList) {
  leaderBoardMap = JSON.parse(leaderboardList);
}

const dayList = Array(25).fill(1).map((_, n) => (n + 1));

function safetyNet({
  maxLoops = 1e4,
  maxMs = 5_000,
  logLoopInterval = (maxLoops / 10)
}: Day['meta'] = {}): SafetyNet {
  let start = performance.now();
  let ct = 0;
  let duration = 0;
  let reason = "pass";

  return {
    fails(logMessage) {
      duration = Math.round(performance.now() - start);
      if (++ct > maxLoops){
        reason = "Too many loops";
        return true;
      }
      if (duration > maxMs) {
        reason = "Too long";
        return true;
      }

      if (logMessage && (logLoopInterval > 0) && !(ct % logLoopInterval)) {
        console.log(logMessage(ct, duration))
      }

      return false;
    },
    get reason() {
      return `${reason} (${ct} loops in ${duration}ms)`;
    }
  };
}

function App() {
  const [day, setDay] = useState(today);

  useEffect(
    () => {
      console.clear()
    },
    [day]
  );

  const changeDay = useCallback(
    ({target: {value}}) => {
      setDay(value);
    },
    []
  )

  const {part1, part2, meta, meta: {manualStart = false} = {}} = useMemo(
    () => Days[`day${day}`],
    [day]
  );

  const startPart1 = useCallback(
    () => setPart1(timeAndRun(() => part1(safetyNet(meta)))),
    [part1, meta]
  )

  const startPart2 = useCallback(
    () => setPart2(timeAndRun(() => part2(safetyNet(meta)))),
    [part2, meta]
  )

  const [ [result1, duration1], setPart1] = useState<[string | number, number]>(["", 0]);
  const [ [result2, duration2], setPart2] = useState<[string | number, number]>(["", 0]);

  useEffect(
    () => {
      if (manualStart) {
        setPart1(["", 0]);
        setPart2(["", 0]);
      }
      else {
        startPart1();
        startPart2();
      }
    },
    [manualStart, startPart1, startPart2]
  )

  // ✔×

  return (
    <>
      <h1>AoC 2020 - Day {day}</h1>
      <p><a href={`https://adventofcode.com/2020/day/${day}`} target="_blank" rel="noreferrer">Problem</a></p>
      <div className="parts">
        <div className="part">
          <h2>Part 1</h2>
          <p><big><b>{result1}</b></big></p>
          <p><small><i>(in {duration1}ms)</i></small></p>
          {manualStart && <p>
            <button type="button" onClick={startPart1}>start</button>
          </p>}
        </div>
        <div className="part">
          <h2>Part 2</h2>
          <p><big><b>{result2}</b></big></p>
          <p><small><i>(in {duration2}ms)</i></small></p>
          {manualStart && <p>
            <button type="button" onClick={startPart2}>start</button>
          </p>}
        </div>
      </div>

      <h4>Nav</h4>
      <ul>
        {leaderBoardMap && leaderBoardMap.map(([id, name]) => (
          <li key={id}>
            <a href={`https://adventofcode.com/2020/leaderboard/private/view/${id}`} target="_blank" rel="noreferrer">{name} leaderboard</a>
            {" | "}<a href={`https://adventofcode.com/2020/leaderboard/private/view/${id}.json`} target="_blank" rel="noreferrer">(json)</a>
          </li>
        ))}
        <li>Choose day <select value={day} onChange={changeDay}>
          <option key="today" value={today}>Today</option>
          {dayList.map(d => <option key={d}>{d}</option>)}
        </select></li>
      </ul>
    </>
  );
}

export default App;
