import { useState } from "react";
import { MainContextProvider } from "./Components/Context/Context";
import "./App.scss";
import WebWorker from "./Components/WebWorker/WebWorker";
function App() {
  const [userInput, setUserInput] = useState("");
  const [uciInput, setUciInput] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (userInput) setUciInput(userInput);
  };

  return [
    <MainContextProvider
      value={{
        userInput,
        setUserInput,
        uciInput,
        setUciInput,
      }}
    >
      <div className="App">
        <main>
          <div className="panel"></div>
          <div className="main-container">
            <div className="container">
              <div className="title">Stockfish worker React example</div>
              <WebWorker workerLink="/stockfish/src/stockfish-nnue-16.js" />
              <form onSubmit={(e) => handleSubmit(e)}>
                <div className="uciTextArea">
                  <textarea
                    type="text"
                    id="uci_input"
                    name="UCI_input"
                    placeholder="Enter UCI input"
                    value={userInput}
                    onChange={(e) => setUserInput(e.target.value)}
                  />
                  <button type="submit">Send</button>
                </div>
              </form>
            </div>
          </div>
        </main>
      </div>
    </MainContextProvider>,
  ];
}

export default App;
