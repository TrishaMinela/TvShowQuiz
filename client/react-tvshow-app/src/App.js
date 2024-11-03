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
          <button onClick={() => { startQuiz() }}>{quizFinished ? 'Restart' : 'Start'}</button>
        )}
    </div>
  );
}

export default App;