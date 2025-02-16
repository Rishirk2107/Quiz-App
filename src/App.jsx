import { useState, useEffect } from "react";
import questions from "./Question/Questions.json";
import Timer from "./Components/Timer";
import Result from "./Components/Result";
import Signup from "./Components/Signup";

function App() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [quizOver, setQuizOver] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [shuffledQuestions, setShuffledQuestions] = useState([]);
  const [user, setUser] = useState(null);
  const [startTime, setStartTime] = useState(null);
  const [totalTime, setTotalTime] = useState(0);

  useEffect(() => {
    const shuffled = [...questions].sort(() => Math.random() - 0.5);
    setShuffledQuestions(shuffled);
    setStartTime(Date.now());
  }, []);

  const handleAnswer = (selectedAnswer) => {
    setSelectedOption(selectedAnswer);
    if (selectedAnswer === shuffledQuestions[currentQuestion].correctAnswer) {
      setScore((prev) => prev + 1);
    }
    setTimeout(() => {
      handleNextQuestion();
      setSelectedOption(null);
    }, 1000);
  };

  const handleNextQuestion = () => {
    if (currentQuestion < shuffledQuestions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
      setTimeLeft(30);
    } else {
      setTotalTime(Math.floor((Date.now() - startTime) / 1000));
      setQuizOver(true);
    }
  };

  const restartQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
    setTimeLeft(30);
    setQuizOver(false);
    setUser(null); // Reset user to go back to signup
    const shuffled = [...questions].sort(() => Math.random() - 0.5);
    setShuffledQuestions(shuffled);
  };

  useEffect(() => {
    if (timeLeft === 0) {
      handleNextQuestion();
    }
    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  if (!user) {
    return <Signup onSignup={(name, email) => setUser({ name, email })} />;
  }

  if (quizOver) {
    return <Result score={score} totalQuestions={shuffledQuestions.length} totalTime={totalTime} restartQuiz={restartQuiz} />;
  }

  if (!shuffledQuestions.length || !shuffledQuestions[currentQuestion]) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gray-100 animate-pulse">
        <p className="text-xl text-slate-700 text-shadow-md">Loading questions...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-3xl font-bold mb-4 text-center">Quiz App</h1>
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <div className="flex justify-between items-center mb-6">
          <p className="text-lg">Question {currentQuestion + 1} / {shuffledQuestions.length}</p>
          <Timer timeLeft={timeLeft} />
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3 mb-6">
          <div className="bg-green-500 h-3 rounded-full" style={{ width: `${((currentQuestion + 1) / shuffledQuestions.length) * 100}%` }}></div>
        </div>
        <p className="text-xl font-semibold mb-6">{shuffledQuestions[currentQuestion].question}</p>
        <div className="space-y-4">
          {shuffledQuestions[currentQuestion].options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswer(option)}
              className={`w-full p-3 rounded-lg cursor-pointer ${
                selectedOption === option ? "bg-blue-500 text-white" : "bg-gray-200 hover:bg-gray-300"
              }`}
              aria-pressed={selectedOption === option}
            >
              {option}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
