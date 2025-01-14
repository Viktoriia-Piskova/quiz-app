import React, {useRef} from "react";

const Answers = ({ answers, selectedAnswer, answerState, onSelect }) => {
  const shuffledAnswers = useRef();
  if (!shuffledAnswers.current) {
    shuffledAnswers.current = [...answers];
    shuffledAnswers.current.sort(() => Math.random() - 0.5);
  }
  return (
    <ul id="#answers">
      {shuffledAnswers.current.map((answer) => {
        const isSelected = answer === selectedAnswer;
        let cssClasses = "";

        if (answerState === "answered" && isSelected) {
          cssClasses = "selected";
        }
        if (
          (answerState === "wrong" || answerState === "correct") &&
          isSelected
        ) {
          cssClasses = answerState;
        }

        return (
          <li className="answer" key={answer}>
            <button
              onClick={() => onSelect(answer)}
              className={cssClasses}
            >
              {answer}
            </button>
          </li>
        );
      })}
    </ul>
  );
};

export default Answers;
