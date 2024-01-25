import React, { useState, useEffect, useRef, useContext } from "react";
import "./WebWorker.scss";
import MainContext from "../Context/Context";

function WebWorker(props) {
  const { workerLink } = props;
  const context = useContext(MainContext);
  const [result, setResult] = useState("");
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

    myWorker.postMessage("setoption name Use NNUE value true");

    // Save the worker instance to state
    setWorker(myWorker);

    // Clean up the worker when the component unmounts
    return () => {
      myWorker.terminate();
    };
  }, []); // Run this effect only once when the component mounts

  useEffect(() => {
    if (!worker || !context.uciInput) return;
    worker.postMessage(context.uciInput);
  }, [context.uciInput]);

  useEffect(() => {
    // Scroll down the div whenever the text content changes
    if (divRef && divRef.current && result)
      divRef.current.scrollTop = divRef.current.scrollHeight;
  }, [result]);

  return (
    <code className="WebWorker">
      <div className="results-wrapper" ref={divRef}>
        {result}
      </div>
    </code>
  );
}

export default WebWorker;
