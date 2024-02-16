import React, { useState } from 'react';
import './App.css';

const Calculator = () => {
  const [input, setInput] = useState('');
  const [currentCalculation, setCurrentCalculation] = useState('');
  const [result, setResult] = useState('');


  const handleButtonClick = (value) => {
    setInput((prevInput) => prevInput + value);
  };

  const handleCalculate = () => {
    try {
      const calculatedResult = eval(input).toString();
      setInput(calculatedResult);
      setResult(calculatedResult);
    } catch (error) {
      setInput('Error');
    }
  };

  const handleClear = () => {
    setInput('');
    setCurrentCalculation('');
  };
  const handleKeyDown = (event) => {
    const key = event.key;

    if (/[0-9+\-*/.]/.test(key)) {
      // Allow only numeric and operator keys
      handleButtonClick(key);
    } else if (key === 'Enter') {
      // Handle Enter key as "=" for calculation
      handleCalculate();
    } else if (key === 'Backspace') {
      // Handle Backspace key as "C" for clearing
      handleClear();
    }
  };


  return (
    <div className="calculator" tabIndex="0" onKeyDown={handleKeyDown}>
      <div className="current-calculation">{result}</div>
      <div className="display">{input}</div>
      <div className="buttons">

        <button onClick={() => handleButtonClick('7')}>7</button>
        <button onClick={() => handleButtonClick('8')}>8</button>
        <button onClick={() => handleButtonClick('9')}>9</button>
        <button onClick={() => handleButtonClick('/')}>/</button>
        <button onClick={() => handleButtonClick('4')}>4</button>
        <button onClick={() => handleButtonClick('5')}>5</button>
        <button onClick={() => handleButtonClick('6')}>6</button>
        <button onClick={() => handleButtonClick('*')}>*</button>
        <button onClick={() => handleButtonClick('1')}>1</button>
        <button onClick={() => handleButtonClick('2')}>2</button>
        <button onClick={() => handleButtonClick('3')}>3</button>
        <button onClick={() => handleButtonClick('-')}>-</button>
        <button onClick={() => handleButtonClick('0')}>0</button>
        <button onClick={() => handleButtonClick('.')}>.</button>
        <button onClick={handleCalculate}>=</button>
        <button onClick={() => handleButtonClick('+')}>+</button>
        <button onClick={handleClear}>C</button>
      </div>
    </div>

  );
};

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Calculator />
      </header>
    </div>
  );
}

export default App;
