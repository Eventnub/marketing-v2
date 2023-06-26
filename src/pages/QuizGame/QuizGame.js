import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./quizGame.css";
import Logo from "../../components/Logo";
import questions from "./questions";
import QuestionItem from "../../components/QuestionItem/QuestionItem";
import { GoogleAnalytics } from "../../utils/analytics";

function QuizGame() {
  const navigate = useNavigate();
  const [questionsWithResponses, setQuestionsWithResponses] =
    useState(questions);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isLastQuestion, setIsLastQuestion] = useState(false);
  const [hasAnsweredCurrentQuestion, setHasAnsweredCurrentQuestion] =
    useState(false);

  const getCurrentQuestion = () => {
    return questions.at(currentQuestionIndex);
  };

  const gotoNextQuestion = () => {
    const nextQuestionIndex = currentQuestionIndex + 1;
    setCurrentQuestionIndex(nextQuestionIndex);

    if (nextQuestionIndex === questions.length - 1) {
      setIsLastQuestion(true);
    }
  };

  const handleLastQuestion = () => {
    navigate("/submit-quiz", {
      state: {
        questionsWithResponses,
      },
    });
  };

  const handleSelectOption = (questionPosition, optionIndex) => {
    const qwr = questionsWithResponses.map((question) => {
      if (question.position === questionPosition) {
        question.selectedOption = question.options[optionIndex];
      }
      return question;
    });
    setQuestionsWithResponses(qwr);
    setHasAnsweredCurrentQuestion(true);
  };

  const getNextButtonClass = () => {
    if (!hasAnsweredCurrentQuestion) {
      return "btn next-btn next-btn-disabled";
    }
    return "btn next-btn";
  };

  useEffect(() => {
    setHasAnsweredCurrentQuestion(false);
  }, [currentQuestionIndex]);

  useEffect(() => {
    GoogleAnalytics.trackPageView(window.location.pathname);
  }, []);

  return (
    <div className="p-4 quiz-game">
      <div className="d-flex align-items-baseline main">
        <Logo width="40px" height="40px" />
        <h1 className="ms-3 company-name">eventnub</h1>
      </div>
      <div className="d-flex justify-content-center align-items-center">
        <div className="quiz-container">
          <QuestionItem
            question={getCurrentQuestion()}
            onSelectOption={handleSelectOption}
          />
          <div className="d-flex justify-content-end mt-5">
            {!isLastQuestion ? (
              <button
                className={getNextButtonClass()}
                disabled={!hasAnsweredCurrentQuestion}
                onClick={gotoNextQuestion}
              >
                Next Question {">>"}
              </button>
            ) : (
              <button
                className={getNextButtonClass()}
                disabled={!hasAnsweredCurrentQuestion}
                onClick={handleLastQuestion}
              >
                Review
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default QuizGame;
