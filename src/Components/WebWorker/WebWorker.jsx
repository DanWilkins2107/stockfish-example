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
    <div className="WebWorker">
      <code className="results-wrapper" ref={divRef}>
        <div class="results-title">
          <span>cpp</span>
          <span class="" data-state="closed">
            <button class="flex gap-1 items-center">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                class="icon-sm"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M12 4C10.8954 4 10 4.89543 10 6H14C14 4.89543 13.1046 4 12 4ZM8.53513 4C9.22675 2.8044 10.5194 2 12 2C13.4806 2 14.7733 2.8044 15.4649 4H17C18.6569 4 20 5.34315 20 7V19C20 20.6569 18.6569 22 17 22H7C5.34315 22 4 20.6569 4 19V7C4 5.34315 5.34315 4 7 4H8.53513ZM8 6H7C6.44772 6 6 6.44772 6 7V19C6 19.5523 6.44772 20 7 20H17C17.5523 20 18 19.5523 18 19V7C18 6.44772 17.5523 6 17 6H16C16 7.10457 15.1046 8 14 8H10C8.89543 8 8 7.10457 8 6Z"
                  fill="currentColor"
                ></path>
              </svg>
              Copy code
            </button>
          </span>
        </div>
        {result}
      </code>
    </div>
  );
}

export default WebWorker;
