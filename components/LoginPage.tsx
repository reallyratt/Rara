
import React, { useState } from 'react';

interface LoginPageProps {
  onLoginSuccess: () => void;
}

const CatIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-pink-400" viewBox="0 0 20 20" fill="currentColor">
        <path d="M10 3.5a1.5 1.5 0 013 0V4a1 1 0 001 1h.5a1.5 1.5 0 010 3h-.5a1 1 0 00-1 1v1.5a1.5 1.5 0 01-3 0V9a1 1 0 00-1-1h-.5a1.5 1.5 0 010-3h.5a1 1 0 001-1V3.5z" />
        <path fillRule="evenodd" d="M3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
        <path d="M10 12.5a1.5 1.5 0 011.5 1.5v.5a1 1 0 001 1h.5a1.5 1.5 0 010 3h-.5a1 1 0 00-1 1v.5a1.5 1.5 0 01-3 0v-.5a1 1 0 00-1-1h-.5a1.5 1.5 0 010-3h.5a1 1 0 001-1v-.5A1.5 1.5 0 0110 12.5z" />
    </svg>
);


const LoginPage: React.FC<LoginPageProps> = ({ onLoginSuccess }) => {
  const [answer, setAnswer] = useState('');
  const [error, setError] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const validAnswers = ['kucing', 'cat', 'cqr', 'neko'];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validAnswers.includes(answer.toLowerCase().trim())) {
      setError('');
      setIsSuccess(true);
      setTimeout(() => {
        onLoginSuccess();
      }, 1500);
    } else {
      setError('Kamu bukan Rara, ya?! >:(');
      setAnswer('');
    }
  };

  return (
    <div className="w-full max-w-md mx-auto bg-white/80 backdrop-blur-sm rounded-2xl shadow-2xl shadow-pink-200/50 p-8 transition-all duration-500">
      <div className="flex flex-col items-center text-center">
        {!isSuccess ? (
          <>
            <CatIcon />
            <h1 className="font-pacifico text-3xl text-pink-500 mt-4">A Secret Question</h1>
            <p className="mt-4 text-gray-600 font-medium">Boneka apa yang tiba-tiba spawn pas kita nongkrong pertama kali?</p>
            <form onSubmit={handleSubmit} className="w-full mt-6">
              <input
                type="text"
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                placeholder="Jawabanmu..."
                className="w-full px-4 py-3 bg-white border-2 border-pink-200 rounded-lg focus:ring-2 focus:ring-pink-400 focus:border-pink-400 outline-none transition-all"
                autoFocus
              />
              {error && <p className="text-red-500 font-bold mt-3 animate-pulse">{error}</p>}
              <button
                type="submit"
                className="w-full mt-6 bg-pink-500 text-white font-bold py-3 px-4 rounded-lg hover:bg-pink-600 transition-transform transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
              >
                Masuk
              </button>
            </form>
          </>
        ) : (
          <div className="flex flex-col items-center">
             <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-green-500 animate-bounce" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <p className="font-pacifico text-4xl text-green-600 mt-4">Hallo, Rara!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default LoginPage;
