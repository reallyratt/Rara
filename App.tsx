
import React, { useState } from 'react';
import LoginPage from './components/LoginPage';
import FormPage from './components/FormPage';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4 bg-gradient-to-br from-rose-100 to-teal-100">
      {!isLoggedIn ? (
        <LoginPage onLoginSuccess={handleLoginSuccess} />
      ) : (
        <FormPage />
      )}
    </div>
  );
}

export default App;
