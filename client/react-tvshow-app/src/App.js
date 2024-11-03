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
  const [showAnswer, setShowAnswer] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

  //Calling Node Backend API
  useEffect(() => {
    fetch("http://127.0.0.1:5000/api/questions")
      .then(res => {
        if (!res.ok) {
          throw new Error('Network response was not ok');
        }
        return res.json();
      })
      .then(data => {
        setQuestions(data.questions);
        setLoading(false);
      })
      .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
        setLoading(false);
      });
  }, []);

  const startQuiz = () => {
    setQuizStarted(true);
    setQuizFinished(false);
    setCurrentQuestionIndex(0);
    setScore(0);
    setShowAnswer(false);

  }

  const handleAnswer = (option) => {
    setSelectedOption(option);
    if (option === questions[currentQuestionIndex].answer) {
      setScore(score + 1);
    }
    setShowAnswer(true);
  }

  const handleNextQuestion = () => {
    setShowAnswer(false);
    setSelectedOption(null);
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setQuizFinished(true);
    }
  };


  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
        {loading ? (
          <p className="text-center">Loading questions...</p>
        ) :
          !quizStarted || quizFinished ? (
            <>
              <button
                onClick={startQuiz}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 transition duration-300 w-full"
              >
                {quizFinished ? 'Restart' : 'Start'}
              </button>
              {quizFinished && (
                <div className="mt-4 text-center">
                  <p className="text-lg">You got {score} out of {questions.length} questions right.</p>
                </div>
              )}
            </>
          ) : (
            questions.length > 0 && currentQuestionIndex < questions.length && (
              <div>
                <h2 className="text-xl font-bold mb-4 text-center">
                  {questions[currentQuestionIndex].question}
                </h2>
                <div className="grid grid-cols-2 gap-4">
                  {questions[currentQuestionIndex].options.map((option, index) => (
                    <button
                      key={index}
                      onClick={() => handleAnswer(option)}
                      className={`px-6 py-3 rounded transition duration-300 text-black bg-white hover:bg-gray-200 
                      ${showAnswer ?
                          (option === questions[currentQuestionIndex].answer ? 'shadow-lg shadow-green-500' :
                            selectedOption === option ? 'shadow-lg shadow-red-500' : '')
                          : 'shadow-none'}
                      w-full`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
                {showAnswer && (
                  <div className="mt-4 text-center">
                    <button onClick={handleNextQuestion} className="mt-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 transition duration-300">
                      Next
                    </button>
                  </div>
                )}
              </div>
            )
          )}
      </div>
    </div>
  );
}

export default App;