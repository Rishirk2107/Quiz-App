import { useState } from "react";

function Signup({ setName, setEmail }) {
  const [inputName, setInputName] = useState("");
  const [inputEmail, setInputEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputName && inputEmail) {
      setName(inputName);
      setEmail(inputEmail);
    } else {
      alert("Please enter your name and email.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-sm">
        <h1 className="text-2xl font-bold mb-4">Sign Up</h1>
        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
          <input
            type="text"
            placeholder="Enter your name"
            value={inputName}
            onChange={(e) => setInputName(e.target.value)}
            className="p-3 border border-gray-300 rounded-lg"
            required
          />
          <input
            type="email"
            placeholder="Enter your email"
            value={inputEmail}
            onChange={(e) => setInputEmail(e.target.value)}
            className="p-3 border border-gray-300 rounded-lg"
            required
          />
          <button type="submit" className="bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600">
            Start Quiz
          </button>
        </form>
      </div>
    </div>
  );
}

export default Signup;
