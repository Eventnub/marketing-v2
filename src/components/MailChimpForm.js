const { useEffect, useRef } = require("react");

function MailChimpForm({ style, firstName, email, shouldSubmit }) {
  const submitButtonRef = useRef(null);

  useEffect(() => {
    if (shouldSubmit) {
      submitButtonRef.current.click();
    }
  }, [shouldSubmit]);

  return (
    <form
      action="https://app.us21.list-manage.com/subscribe/post?u=8f7a988a6b3be9fa367e5a777&amp;id=5f9038e1a4&amp;f_id=0039b4e1f0"
      method="post"
      target="_blank"
      id="mc-embedded-subscribe-form"
      name="mc-embedded-subscribe-form"
      className="validate"
      style={style}
      noValidate
    >
      <div id="mc_embed_signup_scroll">
        <div className="mc-field-group">
          <label htmlFor="mce-EMAIL">
            Email Address <span className="asterisk">*</span>
          </label>
          <input
            type="email"
            value={email}
            name="EMAIL"
            className="required email"
            id="mce-EMAIL"
            readOnly
            required
          />
          <span id="mce-EMAIL-HELPERTEXT" className="helper_text"></span>
        </div>
        <div className="mc-field-group">
          <label htmlFor="mce-FNAME">First Name </label>
          <input
            type="text"
            value={firstName}
            name="FNAME"
            className=""
            id="mce-FNAME"
            readOnly
          />
          <span id="mce-FNAME-HELPERTEXT" className="helper_text"></span>
        </div>
        <div id="mce-responses" className="clear foot">
          <div
            className="response"
            id="mce-error-response"
            style={{ display: "none" }}
          ></div>
          <div
            className="response"
            id="mce-success-response"
            style={{ display: "none" }}
          ></div>
        </div>
        <div
          style={{ position: "absolute", left: "-5000px" }}
          aria-hidden="true"
        >
          <input
            type="text"
            name="b_8f7a988a6b3be9fa367e5a777_5f9038e1a4"
            tabIndex="-1"
            value=""
            readOnly
          />
        </div>
        <div className="optionalParent">
          <div className="clear foot">
            <input
              ref={submitButtonRef}
              type="submit"
              value="Subscribe"
              name="subscribe"
              id="mc-embedded-subscribe"
              className="button"
            />
          </div>
        </div>
      </div>
    </form>
  );
}

export default MailChimpForm;
