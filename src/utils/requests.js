import axios from "axios";
const API_BASE_URL = "https://globeventnub.herokuapp.com/api";

export const submitQuizAnswers = async (
  firstName,
  lastName,
  email,
  country,
  answers
) => {
  await axios({
    method: "post",
    url: `${API_BASE_URL}/marketing/submit-quiz-answers`,
    data: {
      firstName,
      lastName,
      email,
      country,
      answers,
    },
    config: { headers: { "Content-Type": "application/json" } },
  });
};
