import { useCallback, useEffect, useRef, useState } from "react";
import { MainContextProvider } from "./Components/Context/Context";
import "./App.scss";
import WebWorker from "./Components/WebWorker/WebWorker";
import Textarea from "react-expanding-textarea";

function App() {
  const [userInput, setUserInput] = useState("");
  const [uciInput, setUciInput] = useState("");
  const [result, setResult] = useState("");

  const divRef = useRef();

  const handleSubmit = (e) => {
    if (e) e.preventDefault();
    if (userInput) setUciInput(userInput);
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

  useEffect(() => {
    // Scroll down the div whenever the text content changes
    if (divRef && divRef.current && result)
      divRef.current.scrollTop = divRef.current.scrollHeight;
  }, [result]);

  const handleChange = useCallback((e) => {
    setUserInput(e.target.value);
  }, []);

  return [
    <MainContextProvider
      value={{
        userInput,
        setUserInput,
        uciInput,
        setUciInput,
        result,
        setResult,
      }}
    >
      <div className="App dark">
        <main>
          <div className="panel"></div>
          <div className="main-container">
            <div className="container" ref={divRef}>
              <div className="title">Stockfish Worker React.js Example</div>
              <WebWorker workerLink="/stockfish/src/stockfish-nnue-16.js" />
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
                      value={userInput}
                    />

                    <button type="submit" disabled="" data-testid="send-button">
                      <span>
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                        >
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
            </div>
          </div>
        </main>
      </div>
    </MainContextProvider>,
  ];
}

export default App;
