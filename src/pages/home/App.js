import './App.css';
import {useState} from "react";

function App() {

  const [count, setCount] = useState(0);
  const [x, setX] = useState(42);
  return (
    <div className="App">
      <header className="App-header">
        <img src="logo.svg" className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <button onClick={() => {
            setCount(count + 1);
            setX(x + 10)
        }}>
          x is {x}. count is {count}, btw the current timestamp is {Date.now().toLocaleString()}
        </button>
      </header>
    </div>
  );
}

export default App;
