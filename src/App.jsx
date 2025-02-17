import { useState, useEffect } from "react";
import questions from "./Question/Questions.json";
import Result from "./Components/Result";
import Signup from "./Components/Signup"; // Import Signup Component

function App() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [quizOver, setQuizOver] = useState(false);
  const [shuffledQuestions, setShuffledQuestions] = useState([]);
  const [totalTimeLeft, setTotalTimeLeft] = useState(15 * 60); // 15 mins in seconds
  const [selectedOption, setSelectedOption] = useState(null);

  // Shuffle and select random 8 questions on component mount
  useEffect(() => {
    const shuffled = [...questions].sort(() => Math.random() - 0.5);
    const selectedQuestions = shuffled.slice(0, 8); // Select first 8 questions
    setShuffledQuestions(selectedQuestions);
  }, []);

  // Track total quiz time
  useEffect(() => {
    if (quizOver) return;
    const timer = setInterval(() => {
      setTotalTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setQuizOver(true); // End the quiz when time runs out
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [quizOver]);

  // Save the email in localStorage once the quiz is finished
  useEffect(() => {
    if (quizOver && email) {
      localStorage.setItem('completedQuizEmail', email);
    }
  }, [quizOver, email]);

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
    } else {
      setQuizOver(true); // End the quiz if all questions are answered
    }
  };

  const restartQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
    setQuizOver(false);
    setTotalTimeLeft(15 * 60); // Reset to 15 minutes
    const shuffled = [...questions].sort(() => Math.random() - 0.5);
    setShuffledQuestions(shuffled);
  };

  // Convert total time left to mm:ss format
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${String(minutes).padStart(2, "0")}:${String(remainingSeconds).padStart(2, "0")}`;
  };

  // If email is already stored in localStorage, show the message about already completing the quiz
  const storedEmail = localStorage.getItem('completedQuizEmail');
  if (storedEmail === email) {
    return <p className="text-xl font-semibold mb-6">You have already completed the quiz.</p>;
  }

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
        totalTime={15 * 60 - totalTimeLeft} // Time taken
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
          <p className="text-lg font-bold text-red-500">Time Left: {formatTime(totalTimeLeft)}</p>
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
