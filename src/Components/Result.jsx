import Button from "./Button";

function Result({ score, totalQuestions, totalTime, restartQuiz }) {
  return (
    <div className="bg-gray-100 h-screen flex items-center justify-center">
      <div className="flex flex-col items-center justify-center bg-gray-400 w-fit h-fit p-6 rounded-2xl shadow-xl">
        <h1 className="text-3xl font-bold mb-4">Quiz Over!</h1>
        <p className="text-xl mb-2">
          Your score: {score} / {totalQuestions}
        </p>
        <p className="text-lg mb-6">Total Time Taken: {totalTime} seconds</p>
        <Button onClick={restartQuiz} className="bg-slate-500 text-white px-6 py-2 rounded-lg hover:bg-slate-600 cursor-pointer">
          Retry Quiz
        </Button>
      </div>
    </div>
  );
}

export default Result;
