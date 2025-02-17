import { useState, useEffect } from "react";
import questions from "./Question/Questions.json";
import Timer from "./Components/Timer";
import Result from "./Components/Result";
import Signup from "./Components/Signup"; // Import Signup Component

function App() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [quizOver, setQuizOver] = useState(false);
  const [shuffledQuestions, setShuffledQuestions] = useState([]);
  const [totalTime, setTotalTime] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);

  // Shuffle questions on component mount
  useEffect(() => {
    const shuffled = [...questions].sort(() => Math.random() - 0.5);
    setShuffledQuestions(shuffled);
  }, []);

  // Track quiz time
  useEffect(() => {
    if (quizOver) return;
    const totalTimeTimer = setInterval(() => {
      setTotalTime((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(totalTimeTimer);
  }, [quizOver]);

  // Question timer
  useEffect(() => {
    if (timeLeft === 0) {
      handleNextQuestion();
    }
    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

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
      setQuizOver(true);
    }
  };

  const restartQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
    setTimeLeft(30);
    setQuizOver(false);
    setTotalTime(0);
    const shuffled = [...questions].sort(() => Math.random() - 0.5);
    setShuffledQuestions(shuffled);
  };

  // Show signup screen if user has not entered name & email
  if (!name || !email) {
    return <Signup setName={setName} setEmail={setEmail} />;
  }

  if (quizOver) {
    return (
      <Result
        name={name}
        email={email}
        score={score}
        totalQuestions={shuffledQuestions.length}
        totalTime={totalTime}
        restartQuiz={restartQuiz}
      />
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-3xl font-bold mb-4 text-center">Quiz App</h1>
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <div className="flex justify-between items-center mb-6">
          <p className="text-lg">
            Question {currentQuestion + 1} / {shuffledQuestions.length}
          </p>
          <Timer timeLeft={timeLeft} />
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3 mb-6">
          <div
            className="bg-green-500 h-3 rounded-full"
            style={{
              width: `${((currentQuestion + 1) / shuffledQuestions.length) * 100}%`,
            }}
          ></div>
        </div>
        
        {/* Display Question */}
        <p className="text-xl font-semibold mb-6">{shuffledQuestions[currentQuestion].question}</p>

        {/* Show Code Block if the question contains code */}
        {shuffledQuestions[currentQuestion].code && (
          <pre className="bg-gray-800 text-white p-4 rounded-lg text-sm overflow-x-auto mb-6">
            <code>
              {Array.isArray(shuffledQuestions[currentQuestion].code)
                ? shuffledQuestions[currentQuestion].code.join("\n")
                : shuffledQuestions[currentQuestion].code}
            </code>
          </pre>
        )}

        {/* Answer Options */}
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
