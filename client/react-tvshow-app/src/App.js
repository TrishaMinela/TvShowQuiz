import './App.css';

//useState : current state value, function to update the value
//useEffect : Reacthook for side effects in function components
import { useState, useEffect } from 'react';

function App() {

  //questions: initial value
  //setQuestions: function to update the value
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [quizStarted, setQuizStarted] = useState(false);
  const [quizFinished, setQuizFinished] = useState(false);
  const [loading, setLoading] = useState(true);

  //Calling Node Backend API
  useEffect(() => {
    fetch("http://localhost:5000/api/questions")
      .then(res => res.json())
      .then(data => {
        setQuestions(data.questions)
        setLoading(false)
      })
  }, []);

  const startQuiz = () => {
    setQuizStarted(true);
    setQuizFinished(false);
    setCurrentQuestionIndex(0);
    setScore(0);
  }

  const handleAnswer = (option) => {
    if (option === question[currentQuestionIndex].answer) {
      setScore(score + 1);
    }
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setQuizFinished(true);
    }
  }

  //Loading Message

  //Start Quiz Button

  //Show Question[]

  //Show User Score


  return (
    <div className="App">
      {loading ? (
        <p>Loading questions...</p>
      ) :
        !quizStarted || quizFinished ? (
          <>
            <button onClick={() => { startQuiz() }}>{quizFinished ? 'Restart' : 'Start'}</button>
            {quizFinished && (
              <div>
                <p>Your got {score} out of {questions.length} questions right.</p>
              </div>
            )}
          </>
        ) : (
          <div>
            <h2>
              {question[currentQuestionIndex].question}
            </h2>
            <div>
              {question[currentQuestionIndex].options.map((option, index) => (
                <button key={index} onClick={() => { handleAnswer(option) }}>
                  {option}
                </button>
              ))}
            </div>
          </div>
        )}
    </div>
  );
}

export default App;