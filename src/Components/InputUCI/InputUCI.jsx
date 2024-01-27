import React, { useCallback, useContext, useRef } from "react";
import "./InputUCI.scss";
import MainContext from "../Context/Context";
import Textarea from "react-expanding-textarea";

function InputUCI(props) {
  const context = useContext(MainContext);

  const handleSubmit = (e) => {
    if (e) e.preventDefault();
    if (context.userInput) context.setUciInput(context.userInput);
  };

  const textareaRef = useRef(null);

  const handleKeyPress = (e) => {
    // Check if the pressed key is Enter (keyCode 13)
    if (e.key === "Enter") {
      // Prevent the default behavior of the Enter key (e.g., adding a newline)
      e.preventDefault();
      // Perform the form submission logic here
      handleSubmit();
    }
  };

  const handleChange = useCallback((e) => {
    context.setUserInput(e.target.value);
  }, []);

  return (
    <div className="form-wrapper">
      <form onSubmit={(e) => handleSubmit(e)}>
        <div className="uciTextArea">
          <Textarea
            className="textarea"
            type="submit"
            id="uci_textarea"
            maxLength="3000"
            style={{ minHeight: "52px" }}
            name="uci_textarea"
            onChange={handleChange}
            onKeyDown={(e) => handleKeyPress(e)}
            placeholder="Enter UCI input"
            ref={textareaRef}
            value={context.userInput}
          />

          <button
            className={context.userInput ? "active" : null}
            type="submit"
            disabled=""
            data-testid="send-button"
          >
            <span>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path
                  d="M7 11L12 6L17 11M12 18V7"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>
              </svg>
            </span>
          </button>
        </div>
      </form>
    </div>
  );
}

export default InputUCI;
