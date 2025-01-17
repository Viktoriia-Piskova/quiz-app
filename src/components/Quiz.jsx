import React, { useCallback, useState, useRef } from "react";
import QUESTIONS from "../questions";
import QuestionTimer from "./QuestionTimer";
import Summary from "./Summary";
import Answers from "./Answers";

const Quiz = () => {
  const [userAnswers, setUserAnswers] = useState([]);
  const [answerState, setAnswerState] = useState("");

  const activeQuestionIndex =
    answerState === "" ? userAnswers.length : userAnswers.length - 1;
  const quizIsComplete = activeQuestionIndex === QUESTIONS.length;
  const stoppedRef = useRef(false);

  const handleSelectAnswer = useCallback(
    function handleSelectAnswer(selectedAnswer) {
      setAnswerState("answered");
      stoppedRef.current = true;
      setUserAnswers((prevState) => {
        return [...prevState, selectedAnswer];
      });

      setTimeout(() => {
        if (selectedAnswer === QUESTIONS[activeQuestionIndex].answers[0]) {
          setAnswerState("correct");
        } else {
          setAnswerState("wrong");
        }

        setTimeout(() => {
          setAnswerState("");
          stoppedRef.current = false;
        }, 2000);
      }, 1000);
    },
    [activeQuestionIndex]
  );

  const handleSkipQuestion = useCallback(() => {
    handleSelectAnswer(null);
  }, [handleSelectAnswer]);

  if (quizIsComplete) {
    return (
      <Summary userAnswers={userAnswers} />
    );
  }

  return (
    <div id="quiz">
      <div id="question">
        <QuestionTimer
          timeOut={25000}
          onTimeOut={handleSkipQuestion}
          stopped={stoppedRef.current}
          key={QUESTIONS[activeQuestionIndex].text}
        />
        <h2>{QUESTIONS[activeQuestionIndex].text}</h2>
        <Answers
          key={activeQuestionIndex}
          answers={QUESTIONS[activeQuestionIndex].answers}
          selectedAnswer={userAnswers[userAnswers.length - 1]}
          answerState={answerState}
          onSelect={handleSelectAnswer}
        />
      </div>
    </div>
  );
};

export default Quiz;
