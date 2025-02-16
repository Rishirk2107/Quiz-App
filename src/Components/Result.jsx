import { useEffect, useState } from "react";
import Button from "./Button";
import { db,collection, addDoc } from "../firebase"; // Import Firebase

function Result({ name, email, score, totalQuestions, totalTime, restartQuiz }) {
  const [submitted, setSubmitted] = useState(false); // Prevent duplicate submissions

  useEffect(() => {
    if (!submitted) {  // Only submit if not already done
      const saveResultToFirebase = async () => {
        try {
          await addDoc(collection(db, "quizResults"), {
            name,
            email,
            score,
            totalQuestions,
            totalTime,
            timestamp: new Date().toISOString(), // Add a timestamp
          });
          setSubmitted(true); // Mark as submitted
        } catch (error) {
          console.error("Error saving result:", error);
        }
      };

      saveResultToFirebase();
    }
  }, [submitted, name, email, score, totalQuestions, totalTime]);

  return (
    <div className="bg-gray-100 h-screen flex items-center justify-center">
      <div className="flex flex-col items-center justify-center bg-gray-400 w-fit h-fit p-25 rounded-2xl shadow-xl">
        <h1 className="text-3xl font-bold mb-4">Quiz Over!</h1>
        <p className="text-xl mb-2">Name: {name}</p>
        <p className="text-xl mb-2">Email: {email}</p>
        <p className="text-xl mb-2">Time Taken: {totalTime} sec</p>
        <p className="text-xl mb-6">Score: {score} / {totalQuestions}</p>
        <Button
          onClick={restartQuiz}
          className="bg-slate-500 text-white px-6 py-2 rounded-lg hover:bg-slate-600 cursor-pointer"
        >
          Retry Quiz
        </Button>
      </div>
    </div>
  );
}

export default Result;
