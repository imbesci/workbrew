import React, { useState } from 'react';
import { Button } from './components/Button/Button';

const App = () => {

  return (
    <div>
        <header>
        <h2>Hello From React App 👋</h2>
        </header>
        <Button buttonType="location"/>
        <Button buttonType="networkTest"/>
    </div>
  );
};

export default App;
