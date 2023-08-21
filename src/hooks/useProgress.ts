import { useRef } from "react";
import { useSelector } from "react-redux";
import { sleep } from "../core/util";
import { IRootState } from "../store/allStore";

export function useProgress() {
  const progress = useSelector((state: IRootState) => state.progress);
  const counter = useRef(0);
  const start = () => {
    progress.ref.current?.staticStart(0);
    counter.current = 0;
  };
  // レンダリングの隙間を作る
  const startAsync = async () => {
    start();
    await sleep(0);
  };

  const increment = (value: number) => {
    counter.current += value;
    progress.ref.current?.continuousStart(counter.current);
  };
  const incrementAsync = async (value: number) => {
    increment(value);
    await sleep(0);
  };

  const complete = () => {
    counter.current = 0;
    progress.ref.current?.complete();
  };
  const completeAsync = async () => {
    complete();
    await sleep(0);
  };

  return {
    start,
    startAsync,

    increment,
    incrementAsync,

    complete,
    completeAsync,
  };
}
