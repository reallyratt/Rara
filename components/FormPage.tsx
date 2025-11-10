
import React, { useState } from 'react';

const FormPage: React.FC = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Form state
  const [rating, setRating] = useState(5);
  const [bestActivity, setBestActivity] = useState('');
  const [worstActivity, setWorstActivity] = useState('');
  const [fulfilledExpectation, setFulfilledExpectation] = useState('');
  const [wishes, setWishes] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };
  
  const handleReset = () => {
    setIsSubmitted(false);
    setRating(5);
    setBestActivity('');
    setWorstActivity('');
    setFulfilledExpectation('');
    setWishes('');
  };

  const SummaryItem: React.FC<{ question: string; answer: string | number }> = ({ question, answer }) => (
    <div>
        <h3 className="text-lg font-semibold text-gray-700">{question}</h3>
        <p className="mt-2 p-3 bg-teal-50 rounded-lg text-gray-800 whitespace-pre-wrap">{answer || 'No answer provided.'}</p>
    </div>
  );

  if (isSubmitted) {
    return (
      <div className="w-full max-w-2xl mx-auto bg-white/90 backdrop-blur-sm rounded-2xl shadow-2xl shadow-teal-200/50 p-8">
        <h1 className="font-pacifico text-4xl text-center text-teal-600 mb-2">Thank You!</h1>
        <p className="text-center text-gray-600 mb-8">Your response has been recorded.</p>
        
        <div className="space-y-6 text-left">
            <SummaryItem question="1. On a scale of 1-10, berapa rating kita main collectively?" answer={rating} />
            <SummaryItem question="2. What is the best activity that we did?" answer={bestActivity} />
            <SummaryItem question="3. What is the WORST activity we did?" answer={worstActivity} />
            <SummaryItem question="4. What is something that fulfilled your expectation based on our meetup thingy?" answer={fulfilledExpectation} />
            <SummaryItem question="5. What are the things you wish would happen?" answer={wishes} />
        </div>

        <button
          onClick={handleReset}
          className="w-full mt-8 bg-teal-500 text-white font-bold py-3 px-4 rounded-lg hover:bg-teal-600 transition-transform transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
        >
          Submit another response
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
        
        <button
          type="submit"
          className="w-full bg-teal-500 text-white font-bold py-3 px-4 rounded-lg hover:bg-teal-600 transition-transform transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
        >
          Submit Answers
        </button>
      </form>
    </div>
  );
};

export default FormPage;
