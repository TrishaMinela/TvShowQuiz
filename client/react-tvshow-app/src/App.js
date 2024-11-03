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
  const [quizFinish, setQuizFinishes] = useState(false);
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

  return (
    <div className="App">

    </div>
  );
}

export default App;