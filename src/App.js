import axios from 'axios';
import { useEffect, useState } from 'react';

const App = () => {
  const [chosenLevel, setChosenLevel] = useState(); //Change Later
  const [words, setWords] = useState(null);
  const [correctAnswers, setCorrectAnswers] = useState([]);
  const [clicked, setClicked] = useState([]);
  const [score, setScore] = useState(0);

const getRandomWords = async () => {
  const options = {
    method: 'GET',
    url: 'http://localhost:8000/results',
    params: {
      level: chosenLevel,
      area: 'sat'
    }
  };

  try {
    const response = await axios.request(options);
    setWords(response.data);
  } catch (error) {
    console.error(error);
  }
}

  useEffect(() => {
    if (chosenLevel) getRandomWords();
  }, [chosenLevel])

const checkAnswer = (option, optionIndex, correctAnswer) => {
  if (optionIndex === correctAnswer) {
    setCorrectAnswers([...correctAnswers, option]);
    setScore((score) => score + 1);
  } else {
    setScore((score) => score - 1);
  }
  setClicked([...clicked, option]);
}

  return (
    <div className="app">
      {!chosenLevel && <div className='level-selector'>
        <h1>Word Association App</h1>
        <p>Select Your level to start</p>
        <select 
          name="levels" 
          id="levels" 
          value={chosenLevel} 
          onChange={(e) => setChosenLevel(e.target.value)}>
        <option value={null}>Select a Level</option>
        <option value="1">Level 1</option>
        <option value="2">Level 2</option>
        <option value="3">Level 3</option>
        <option value="4">Level 4</option>
        <option value="5">Level 5</option>
        <option value="6">Level 6</option>
        <option value="7">Level 7</option>
        <option value="8">Level 8</option>
        <option value="9">Level 9</option>
        <option value="10">Level 10</option>
      </select>
      </div>}
      
      {chosenLevel && words && <div className='question-area'>
        <h1>Welcome to level: {chosenLevel}</h1>
        <h3>Your score is {score}</h3>
        <div className={"questions"}>
          {words.quizlist.map((question, _questionIndex) => (
            <div key={_questionIndex} className='question-box'>
                {question.quiz.map((hint, _index) => (
                  <p key={_index}>{hint}</p>
                ))}
                <div className='question-buttons'>
                  {question.option.map( (option, optionIndex) => (
                    <div key={optionIndex} className='quesiton-button'>
                      <button 
                        disabled={clicked.includes(option)}
                        onClick={() => checkAnswer(option, optionIndex + 1, question.correct)} 
                        >
                          {option}
                      </button>
                      {correctAnswers.includes(option) && <p className='correct-answer'>Correct!</p>}
                    </div>
                  ))}
                </div>
            </div>))}
        </div>
        
        <button onClick={() => setChosenLevel(null)}>Go Back</button>

      </div>}

    </div>
  );
}

export default App;
