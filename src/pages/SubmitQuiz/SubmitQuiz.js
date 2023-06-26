import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import swal from "sweetalert";
import "./submitQuiz.css";
import Logo from "../../components/Logo";
import MailChimpForm from "../../components/MailChimpForm";
import { submitQuizAnswers } from "../../utils/requests";
import { GoogleAnalytics } from "../../utils/analytics";

function Subscribe() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [requesting, setRequesting] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [shouldSubmit, setShouldSubmit] = useState("");
  const [questionsWithResponses, setQuestionsWithResponses] = useState(null);

  const handleFirstNameChange = (e) => {
    setFirstName(e.target.value);
  };

  const handleLastNameChange = (e) => {
    setLastName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (firstName && lastName && email && state.questionsWithResponses) {
      const answers = state.questionsWithResponses.map((q) => ({
        questionId: q.position,
        answer: q.selectedOption,
      }));

      setRequesting(true);
      try {
        await submitQuizAnswers(firstName, lastName, email, "None", answers);
        GoogleAnalytics.trackEvent("submit quiz and subscribe", {
          firstName,
          email,
        });
        setShouldSubmit(true);
        setTimeout(() => {
          window.location.replace("https://globeventnub.com");
        }, 1000);
      } catch (error) {
        swal({
          title: "Oops!",
          text: "Something went wrong. Please try again!",
          icon: "error",
          button: "OK",
        });
      }
      setRequesting(false);
    }
  };

  useEffect(() => {
    if (!state || !state.questionsWithResponses) {
      navigate("/game-option");
    } else {
      setQuestionsWithResponses(state.questionsWithResponses);
      GoogleAnalytics.trackPageView(window.location.pathname);
    }

    // eslint-disable-next-line
  }, []);

  return (
    <div className="p-4 submit-quiz">
      <div className="d-flex align-items-baseline main">
        <Logo width="40px" height="40px" />
        <h1 className="ms-3 company-name">eventnub</h1>
      </div>
      <div className="row">
        <div className="col-12 col-md-6 d-flex justify-content-center">
          <div className="review-question">
            <h1>Review Answers</h1>
            {questionsWithResponses &&
              questionsWithResponses.map(
                ({ position, question, selectedOption }) => (
                  <div key={position} className="mb-4">
                    <h2>
                      Q{position}. {question}
                    </h2>
                    <p className="fst-italic">
                      {"> "}
                      {selectedOption}
                    </p>
                  </div>
                )
              )}
          </div>
        </div>
        <div className="col-12 col-md-6">
          <div className="container px-4">
            <h1 className="instruction1">Submit your test!</h1>
            <h2 className="instruction2">Enter Your Details</h2>
            <form onSubmit={handleSubscribe}>
              <div className="mb-3">
                <label htmlFor="firstName" className="form-label d-none">
                  First Name
                </label>
                <input
                  type="text"
                  className="form-control form-control-lg"
                  id="firstName"
                  placeholder="First Name"
                  aria-describedby="nameHelp"
                  value={firstName}
                  onChange={handleFirstNameChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="lastName" className="form-label d-none">
                  Last Name
                </label>
                <input
                  type="text"
                  className="form-control form-control-lg"
                  id="lastName"
                  placeholder="Last Name"
                  aria-describedby="nameHelp"
                  value={lastName}
                  onChange={handleLastNameChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="email" className="form-label d-none">
                  Email
                </label>
                <input
                  type="email"
                  className="form-control form-control-lg"
                  id="email"
                  placeholder="Email"
                  value={email}
                  onChange={handleEmailChange}
                  required
                />
              </div>
              <div className="d-flex justify-content-end">
                <button
                  type="submit"
                  className="btn btn-custom"
                  disabled={requesting}
                >
                  {requesting ? "Please wait" : "Submit quiz"}
                </button>
              </div>
            </form>
            <MailChimpForm
              style={{ display: "none" }}
              firstName={firstName}
              email={email}
              shouldSubmit={shouldSubmit}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Subscribe;
