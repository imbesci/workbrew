import React, { useState } from 'react';
import { Button } from './components/Button/Button';

const App = () => {
  const [buttonText, setButtonText] = useState('Click Me');

  const handleClick = () => {
    setButtonText('Button Clicked');
  };

  return (
    <div>
        <header>
        <h2>Hello From React App 👋</h2>
        </header>
        <Button />
    </div>
  );
};

export default App;
