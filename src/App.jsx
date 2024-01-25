import "./App.scss";
import WebWorker from "./Components/WebWorker/WebWorker";

function App() {
  return (
    <div className="App">
      <WebWorker workerLink="/stockfish/src/stockfish-nnue-16.js" />
    </div>
  );
}

export default App;
