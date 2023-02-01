import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';

const rootElement = document.createElement("div");
rootElement.id = "app";


// const globalStyles = document.createElement("style");
// globalStyles.innerHTML = `
//   #${rootElement.id} {
//   position: fixed;
//   left: 0;
//   top: 0;
//   width: 1000px;
//   height: 1000vh;
//   background: #ffffff;
//   border-right: 1px solid #c2c2c2;
//   z-index: 999;
//   }// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
// `;
// rootElement.appendChild(globalStyles);
document.body.appendChild(rootElement);

ReactDOM.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
    rootElement
  );
