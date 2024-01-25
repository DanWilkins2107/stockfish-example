import React, { useState, useEffect, useRef } from "react";
import "./WebWorker.scss";

function WebWorker(props) {
  const { workerLink } = props;
  const [result, setResult] = useState(null);
  const [worker, setWorker] = useState(null);

  const divRef = useRef();

  useEffect(() => {
    // Create a new web worker
    const myWorker = new Worker(workerLink);

    // Set up event listener for messages from the worker
    myWorker.onmessage = function (event) {
      console.log("Received result from worker:", event.data);
      setResult((prevState) => prevState + "\n" + event.data);
    };

    // Save the worker instance to state
    setWorker(myWorker);

    // Clean up the worker when the component unmounts
    return () => {
      myWorker.terminate();
    };
  }, []); // Run this effect only once when the component mounts

  useEffect(() => {
    // Scroll down the div whenever the text content changes
    divRef.current.scrollTop = divRef.current.scrollHeight;
  }, [result]);

  const handleClick = () => {
    // Send a message to the worker
    if (worker) {
      worker.postMessage("uci"); // Send the number 5 to the worker
      const DEPTH = 20; // number of halfmoves the engine looks ahead
      const FEN_POSITION = // chess position in FEN format
        "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1";

      worker.postMessage("uci");
      worker.postMessage(`position fen ${FEN_POSITION}`);
      worker.postMessage(`go depth ${DEPTH}`);
    }
  };

  return (
    <div className="WebWorker">
      <div className="results-wrapper" ref={divRef}>
        Result from the worker: {result}
      </div>
      <button className="workerButton" onClick={handleClick}>
        Calculate in Web Worker
      </button>
    </div>
  );
}

export default WebWorker;
