
import React, { useState } from 'react';
import { formatAnswersForEmail } from '../services/geminiService';

const FormPage: React.FC = () => {
  const [rating, setRating] = useState(5);
  const [bestActivity, setBestActivity] = useState('');
  const [worstActivity, setWorstActivity] = useState('');
  const [fulfilledExpectation, setFulfilledExpectation] = useState('');
  const [wishes, setWishes] = useState('');

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formattedResult, setFormattedResult] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setFormattedResult(null);

    const formData = {
      rating,
      bestActivity,
      worstActivity,
      fulfilledExpectation,
      wishes,
    };

    try {
      const result = await formatAnswersForEmail(formData);
      setFormattedResult(result);
    } catch (err) {
      setError('Oops! Something went wrong while preparing your answers. Please try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopyToClipboard = () => {
    if (formattedResult) {
      navigator.clipboard.writeText(formattedResult);
      alert('Copied to clipboard!');
    }
  };

  if (formattedResult) {
    return (
      <div className="w-full max-w-2xl mx-auto bg-white/90 backdrop-blur-sm rounded-2xl shadow-2xl shadow-teal-200/50 p-8">
        <h2 className="text-3xl font-bold text-center text-teal-600 font-pacifico">Answers Prepared!</h2>
        <div className="mt-6 p-4 bg-gray-100 rounded-lg whitespace-pre-wrap font-mono text-sm border border-gray-200">
          {formattedResult}
        </div>
        <button
          onClick={handleCopyToClipboard}
          className="w-full mt-6 bg-teal-500 text-white font-bold py-3 px-4 rounded-lg hover:bg-teal-600 transition-transform transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
        >
          Copy to Clipboard
        </button>
      </div>
    );
  }

  return (
    <div className="w-full max-w-2xl mx-auto bg-white/90 backdrop-blur-sm rounded-2xl shadow-2xl shadow-teal-200/50 p-8">
      <h1 className="font-pacifico text-4xl text-center text-teal-600 mb-8">A Few Questions...</h1>
      <form onSubmit={handleSubmit} className="space-y-8">
        <div>
          <label htmlFor="rating" className="block text-lg font-semibold text-gray-700">1. On a scale of 1-10, berapa rating kita main collectively?</label>
          <div className="flex items-center gap-4 mt-3">
            <input
              id="rating"
              type="range"
              min="1"
              max="10"
              value={rating}
              onChange={(e) => setRating(Number(e.target.value))}
              className="w-full h-2 bg-teal-100 rounded-lg appearance-none cursor-pointer accent-teal-500"
            />
            <span className="text-teal-600 font-bold text-xl w-10 text-center">{rating}</span>
          </div>
        </div>

        <div>
          <label htmlFor="bestActivity" className="block text-lg font-semibold text-gray-700">2. What is the best activity that we did?</label>
          <textarea
            id="bestActivity"
            rows={3}
            value={bestActivity}
            onChange={(e) => setBestActivity(e.target.value)}
            className="mt-2 w-full px-4 py-2 bg-white border-2 border-teal-200 rounded-lg focus:ring-2 focus:ring-teal-400 focus:border-teal-400 outline-none transition-all"
            placeholder="That one time we..."
          />
        </div>

        <div>
          <label htmlFor="worstActivity" className="block text-lg font-semibold text-gray-700">3. What is the WORST activity we did?</label>
          <textarea
            id="worstActivity"
            rows={3}
            value={worstActivity}
            onChange={(e) => setWorstActivity(e.target.value)}
            className="mt-2 w-full px-4 py-2 bg-white border-2 border-teal-200 rounded-lg focus:ring-2 focus:ring-teal-400 focus:border-teal-400 outline-none transition-all"
            placeholder="Maybe when we..."
          />
        </div>

        <div>
          <label htmlFor="fulfilledExpectation" className="block text-lg font-semibold text-gray-700">4. What is something that fulfilled your expectation based on our meetup thingy?</label>
          <textarea
            id="fulfilledExpectation"
            rows={3}
            value={fulfilledExpectation}
            onChange={(e) => setFulfilledExpectation(e.target.value)}
            className="mt-2 w-full px-4 py-2 bg-white border-2 border-teal-200 rounded-lg focus:ring-2 focus:ring-teal-400 focus:border-teal-400 outline-none transition-all"
            placeholder="I was really hoping that..."
          />
        </div>

        <div>
          <label htmlFor="wishes" className="block text-lg font-semibold text-gray-700">5. What are the things you wish would happen?</label>
          <textarea
            id="wishes"
            rows={3}
            value={wishes}
            onChange={(e) => setWishes(e.target.value)}
            className="mt-2 w-full px-4 py-2 bg-white border-2 border-teal-200 rounded-lg focus:ring-2 focus:ring-teal-400 focus:border-teal-400 outline-none transition-all"
            placeholder="Next time, it would be cool if..."
          />
        </div>

        {error && <p className="text-red-500 font-bold text-center">{error}</p>}
        
        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-teal-500 text-white font-bold py-3 px-4 rounded-lg hover:bg-teal-600 transition-transform transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {isLoading ? (
            <>
              <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Preparing...
            </>
          ) : (
            'Submit Answers'
          )}
        </button>
      </form>
    </div>
  );
};

export default FormPage;
