import { useEffect, useState } from "react";
import { prettifySeconds, secondsUntilBlock } from "../utils/utils";
import { useCalculatorState } from "../context/calculatorContext";

function RebaseTimer() {
  const { nextRebase, currentBlockTime } = useCalculatorState();

  const [timeUntilRebase, setTimeUntilRebase] = useState("");
  useEffect(() => {
    if (currentBlockTime && nextRebase) {
      const seconds = secondsUntilBlock(currentBlockTime, nextRebase);
      const time = prettifySeconds(seconds * -Math.pow(10, -6));
      setTimeUntilRebase(time);
    }
  }, [currentBlockTime, nextRebase]);

  return (
    <div className="flex items-center justify-center mt-6">
      <span className="font-semibold text-rose-600">
        {currentBlockTime ? <p></p> : <p>LOADING</p>}
      </span>
    </div>
  );
}

export default RebaseTimer;
