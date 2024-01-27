import { useEffect, useRef, useState } from "react";
import { MainContextProvider } from "./Components/Context/Context";
import InputUCI from "./Components/InputUCI/InputUCI";

import "./App.scss";
import WebWorker from "./Components/WebWorker/WebWorker";
import MainContent from "./Components/MainContent/MainContent";

function App() {
  const [userInput, setUserInput] = useState("");
  const [uciInput, setUciInput] = useState("");
  const [result, setResult] = useState("");

  const divRef = useRef();

  useEffect(() => {
    // Scroll down the div whenever the text content changes
    if (divRef && divRef.current && result)
      divRef.current.scrollTop = divRef.current.scrollHeight;
  }, [result]);

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
              <MainContent />
              <WebWorker workerLink="/stockfish/src/stockfish-nnue-16.js" />
              <InputUCI />
            </div>
          </div>
        </main>
      </div>
    </MainContextProvider>,
  ];
}

export default App;
