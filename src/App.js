import React, { useState } from 'react';
import './App.css';

const Calculator = () => {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState([]);

  const isOperator = (char) => /[+\-*/]/.test(char);

  const calculateResult = (expression) => {
    try {
      let result = 0;
      let currentOperator = '+';
      let currentNumber = '';

      for (let i = 0; i < expression.length; i++) {
        const char = expression[i];

        if (/[0-9.]/.test(char)) {
          currentNumber += char;
        } else if (isOperator(char)) {
          result = performOperation(result, parseFloat(currentNumber), currentOperator);
          currentNumber = '';
          currentOperator = char;
        }
      }

      // Handle the last number in the expression
      result = performOperation(result, parseFloat(currentNumber), currentOperator);

      return result.toString();
    } catch (error) {
      return 'Error';
    }
  };

  const performOperation = (currentResult, number, operator) => {
    switch (operator) {
      case '+':
        return currentResult + number;
      case '-':
        return currentResult - number;
      case '*':
        return currentResult * number;
      case '/':
        return currentResult / number;
      default:
        return currentResult;
    }
  };

  const handleButtonClick = (value) => {
    // Check if the last input is an operator
    const lastInputIsOperator = isOperator(input[input.length - 1]);

    // Check if the new input is an operator and the last input was also an operator
    if (isOperator(value) && lastInputIsOperator) {
      return; // Do not add consecutive operators
    }

    setInput((prevInput) => prevInput + value);
  };

  const handleCalculate = () => {
    const result = calculateResult(input);
    setHistory((prevHistory) => [...prevHistory, `${input} = ${result}`]);
    setInput(result);
  };




  const handleClear = () => {
    setInput('');
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
    <div className='row'>
    <div className="calculator col-lg-6" tabIndex="0" onKeyDown={handleKeyDown}>
      <div className="calculator-container">
        <div className="calculator-grid">
          <div className="calculator-display">
            <div className="display">{input}</div>
          </div>
          <div className="calculator-buttons">
            <table>
              <tbody>
                <tr>
                <td className='bg-warning  calculator-buttons'  onClick={handleClear}  colSpan="3">C</td>
                <td className='bg-warning operator-btn' onClick={() => handleButtonClick('/')}>/</td>
                </tr>
                <tr>
                <td className='calculator-buttons' onClick={() => handleButtonClick('7')}>7</td>
                  <td className='calculator-buttons' onClick={() => handleButtonClick('8')}>8</td>
                  <td className='calculator-buttons' onClick={() => handleButtonClick('9')}>9</td>
                  <td className='bg-warning operator-btn' onClick={() => handleButtonClick('*')}>*</td>
                </tr>
                <tr>
                <td className='calculator-buttons' onClick={() => handleButtonClick('4')}>4</td>
                  <td className='calculator-buttons'  onClick={() => handleButtonClick('5')}>5</td>
                  <td className='calculator-buttons' onClick={() => handleButtonClick('6')}>6</td>
                  <td className='bg-warning operator-btn' onClick={() => handleButtonClick('-')}>-</td>
                </tr>
                <tr>
                <td className='calculator-buttons' onClick={() => handleButtonClick('1')}>1</td>
                  <td className='calculator-buttons' onClick={() => handleButtonClick('2')}>2</td>
                  <td className='calculator-buttons' onClick={() => handleButtonClick('3')}>3</td>
                  <td className='bg-warning operator-btn' onClick={() => handleButtonClick('+')}>+</td>
                </tr>
                <tr>
                <td className='calculator-buttons'  colSpan="2" onClick={() => handleButtonClick('0')}>0</td>
                <td className='calculator-buttons' onClick={() => handleButtonClick('.')}>.</td>
                  <td className='bg-warning operator-btn'  onClick={handleCalculate}>=</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        
      </div>
    </div>
    <div style={{marginLeft:'300px'}} className='col-lg-6'>
    <div className="calculator-history ">
          <h2>History</h2>
          <ul>
            {history.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
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
