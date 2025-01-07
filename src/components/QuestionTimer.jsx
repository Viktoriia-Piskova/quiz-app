import React, { useEffect, useState } from "react";

const QuestionTimer = ({ timeOut, onTimeOut }) => {
  const [remainingTime, setRemainingTime] = useState(timeOut);

  useEffect(() => {
    const interval = setInterval(
      () => setRemainingTime((prevState) => prevState - 100),
      100
    );

    return () => {
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    const timeout = setTimeout(onTimeOut, timeOut);
    return () => {
      clearTimeout(timeout);
    };
  }, [onTimeOut, timeOut]);

  return <progress id="question-time" max={timeOut} value={remainingTime} />;
};

export default QuestionTimer;
