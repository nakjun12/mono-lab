import { useEffect, useState } from "react";
import { count, increment, setStateFunctions } from "./custom-store";

export function CounterWithModule2() {
  const [state, setState] = useState(count);
  useEffect(() => {
    setStateFunctions.add(setState);
    return () => {
      setStateFunctions.delete(setState);
    };
  }, []);

  const inc = () => {
    //가져오기 이슈로 인하여 함수로 변경
    const count = increment(1);
    setStateFunctions.forEach((fn) => {
      fn(count);
    });
  };

  return (
    <div>
      {state} <button onClick={inc}>+1</button>
    </div>
  );
}
