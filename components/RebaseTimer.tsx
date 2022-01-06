import { useEffect, useState } from "react";
import { prettifySeconds, secondsUntilBlock } from "../utils/utils";
import { useCalculatorState } from "../context/calculatorContext";

function RebaseTimer() {
  const { nextRebase, currentBlock } = useCalculatorState();

  const [timeUntilRebase, setTimeUntilRebase] = useState("");
  useEffect(() => {
    if (currentBlock && nextRebase) {
      const seconds = secondsUntilBlock(currentBlock, nextRebase);
      const time = prettifySeconds(seconds);
      setTimeUntilRebase(time);
      console.log({
        currentBlock,
        nextRebase: nextRebase * 1,
        secs: seconds,
      });
    }
  }, [currentBlock, nextRebase]);
  return (
    <div className="flex items-center justify-center mt-6">
      <span className="font-semibold text-rose-600">
        {currentBlock ? (
          timeUntilRebase ? (
            <>
              <strong>{timeUntilRebase}</strong>{" "}
              <p className="text-xs">to next rebase</p>
            </>
          ) : (
            <strong>Rebasing</strong>
          )
        ) : (
          <p>LOADING</p>
        )}
      </span>
    </div>
  );
}

export default RebaseTimer;
