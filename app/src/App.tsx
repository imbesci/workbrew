import React, { useState } from 'react';
import { Button } from './components/Button/Button';

const App = () => {

  return (
    <div>
        <header>
        <h2>Cafe-Racer ☕</h2>
        </header>
        <Button buttonType="networkTest"/>
        <Button buttonType="location"/>
    </div>
  );
};

export default App;
