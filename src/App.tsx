import React, { useCallback, useEffect, useMemo, useState } from 'react';
import {Days} from './days';
import './App.css';
import { safetyNet, timeAndRun } from './utils';
import leaderBoardMap from './.leaderboardListRc.json'

const today = Math.min(25, (() => {
  const now = new Date();
  return now.getDate();
})());

const dayList = Array(25).fill(1).map((_, n) => (n + 1));



function App() {
  const [day, setDay] = useState(today);

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
      <h1>AoC 2021 - Day {day}</h1>
      <p><a href={`https://adventofcode.com/2021/day/${day}`} target="_blank" rel="noreferrer">Problem</a></p>
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
            <a href={`https://adventofcode.com/2021/leaderboard/private/view/${id}`} target="_blank" rel="noreferrer">{name} leaderboard</a>
            {" | "}<a href={`https://adventofcode.com/2021/leaderboard/private/view/${id}.json`} target="_blank" rel="noreferrer">(json)</a>
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
