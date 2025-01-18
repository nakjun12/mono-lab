import { useEffect, useState } from "react";
import { count, increment, setStateFunctions } from "./simple-store";

export function Counter2() {
  const [state, setState] = useState(count);
  useEffect(() => {
    setStateFunctions.add(setState);
    return () => {
      setStateFunctions.delete(setState);
    };
  }, []);

  const inc = () => {
    //✅ import 이슈로 인하여 함수로 변경

    const count = increment(2);
    setStateFunctions.forEach((fn) => {
      fn(count);
    });
  };

  return (
    <div>
      Simple Store Count2: {state} <button onClick={inc}>+2</button>
    </div>
  );
}
