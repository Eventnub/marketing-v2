import { useEffect, useState } from "react";
import "./subscribe.css";
import Logo from "../../components/Logo";
import MailChimpForm from "../../components/MailChimpForm";
import { GoogleAnalytics } from "../../utils/analytics";

function Subscribe() {
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [shouldSubmit, setShouldSubmit] = useState("");

  const handleFirstNameChange = (e) => {
    setFirstName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (firstName && email) {
      GoogleAnalytics.trackEvent("subscribe", { firstName, email });
      setShouldSubmit(true);
      setTimeout(() => {
        window.location.replace("https://globeventnub.com");
      }, 1000);
    }
  };

  useEffect(() => {
    GoogleAnalytics.trackPageView(window.location.pathname);
  }, []);

  return (
    <div className="subscribe row">
      <div className="col-md-6 d-none d-md-block left-side"></div>
      <div className="col-12 col-md-6">
        <div className="container p-4">
          <div className="d-flex align-items-baseline main">
            <Logo width="40px" height="40px" />
            <h1 className="ms-2 company-name">eventnub</h1>
          </div>
          <p className="intro">Don’t wait</p>
          <h1 className="info">
            Get a Free Ticket to your Next Afrobeat Concert
          </h1>
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
              <button type="submit" className="btn btn-custom w-100">
                Subscribe
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
  );
}

export default Subscribe;
