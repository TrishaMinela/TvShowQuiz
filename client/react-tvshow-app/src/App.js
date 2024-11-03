import './App.css';
import loadingBackground from '/workspaces/TvShowQuiz/client/react-tvshow-app/src/CPLBackground.png'
import playButtonBackground from '/workspaces/TvShowQuiz/client/react-tvshow-app/src/CPBackground.png';
import gameBackground from '/workspaces/TvShowQuiz/client/react-tvshow-app/src/CPMBackground.png';
import restartBackground from '/workspaces/TvShowQuiz/client/react-tvshow-app/src/CPRBackground.png'

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


  // Preload function
  const preloadImage = (src) => {
    const img = new Image();
    img.src = src;
  };

  // useEffect to preload images when the component mounts
  useEffect(() => {
    preloadImage(loadingBackground);
    preloadImage(playButtonBackground);
    preloadImage(gameBackground);
    preloadImage(restartBackground);
  }, []);

  const getBackgroundImage = () => {
    if (loading) {
      return loadingBackground;
    }
    if (!quizStarted) {
      return playButtonBackground;
    }
    if (quizFinished) {
      return restartBackground;
    }
    return gameBackground;
  };



  return (
    <div className="flex items-center justify-center min-h-screen p-4 "
      style={{ backgroundImage: `url(${getBackgroundImage()})`, backgroundSize: 'cover' }}
    >
      <div>
        {loading ? (
          <p className="text-center">Loading questions...</p>
        ) :
          !quizStarted || quizFinished ? (
            <>
              <button
                onClick={startQuiz}
                className="fixed bottom-8 left-1/2 transform -translate-x-1/2 bg-blue-500 text-white px-6 py-3 rounded-full shadow-md hover:bg-blue-600 hover:shadow-lg transition duration-300"
                style={{ width: 'calc(100% - 4rem)', maxWidth: '400px' }}
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
              <div className="bg-white shadow-lg rounded-lg p-8 max-w-lg w-full"
                style={{ maxWidth: '800px' }}>
                <h2 className="text-5xl font-bold mb-10 text-center">
                  {questions[currentQuestionIndex].question}
                </h2>
                <div className="grid grid-cols-2 gap-10">
                  {questions[currentQuestionIndex].options.map((option, index) => (
                    <button
                      key={index}
                      onClick={() => handleAnswer(option)}
                      className={`px-10 py-6 text-2xl rounded-lg transition duration-300 text-black bg-white hover:bg-gray-200 
                        ${showAnswer ?
                          (option === questions[currentQuestionIndex].answer ? 'shadow-lg shadow-green-500' :
                            selectedOption === option ? 'shadow-lg shadow-red-500' : '')
                          : 'shadow-none'}
                        w-full`
                      }>
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