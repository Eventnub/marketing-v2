import { useEffect, useState } from "react";
import "./questionItem.css";

function QuestionItem({ question: currentQuestion, onSelectOption }) {
  const { position, question, options } = currentQuestion;
  const [selectedOptionIndex, setSelectedOptionIndex] = useState(null);

  const handleSelectOption = (index) => {
    setSelectedOptionIndex(index);
    onSelectOption(position, index);
  };

  const getIndexLetter = (index) => {
    switch (index) {
      case 0:
        return "A";
      case 1:
        return "B";
      case 2:
        return "C";
      case 3:
        return "D";
      default:
        return "";
    }
  };

  const getOptionButtonClass = (index) => {
    if (selectedOptionIndex === index) {
      return "btn btn-option btn-option-selected";
    }
    return "btn btn-option";
  };

  useEffect(() => {
    setSelectedOptionIndex(null);
  }, [currentQuestion]);

  return (
    <div className="quiz">
      <div className="d-flex flex-row align-items-baseline quiz-question">
        <span className="position">{position}.</span>
        <h4 className="flex-grow-1">"{question}"</h4>
      </div>
      <div className="row">
        {options.map((option, index) => (
          <div
            key={option}
            className="col-12 col-md-6 d-flex justify-content-center align-items-center"
          >
            <button
              className={getOptionButtonClass(index)}
              onClick={() => handleSelectOption(index)}
            >
              {`${getIndexLetter(index)}. ${option}`}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default QuestionItem;
