import React, { useState, useEffect, useContext } from "react";
import MainContext from "../Context/Context";

function WebWorker(props) {
  const context = useContext(MainContext);
  const [worker, setWorker] = useState(null);

  const { workerLink } = props;

  useEffect(() => {
    // Create a new web worker
    const myWorker = new Worker(workerLink);

    // Set up event listener for messages from the worker
    myWorker.onmessage = function (event) {
      context.setResult((prevState) => prevState + "\n" + event.data);
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

  return <div></div>;
}

export default WebWorker;
