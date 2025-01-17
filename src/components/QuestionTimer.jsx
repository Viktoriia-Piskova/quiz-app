import React, { useEffect, useState } from "react";

const QuestionTimer = ({ timeOut, onTimeOut, stopped }) => {
  const [remainingTime, setRemainingTime] = useState(timeOut);

  useEffect(() => {
    if (stopped) return;
    const interval = setInterval(
      () => setRemainingTime((prevState) => prevState - 100),
      100
    );

    return () => {
      clearInterval(interval);
    };
  }, [stopped]);

  useEffect(() => {
    const timeout = setTimeout(onTimeOut, timeOut);
    return () => {
      clearTimeout(timeout);
    };
  }, [onTimeOut, timeOut]);

  return <progress id="question-time" className={stopped ? 'answered' : ''} max={timeOut} value={remainingTime} />;
};

export default QuestionTimer;
