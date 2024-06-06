import logo from './logo.svg';
import './App.css';
import Button from '@mui/material/Button';
import React, { useState } from 'react';
import DocxReader from './DocxReader';



function App() {

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
       
        <p>
          Create a CSV file from your insert list and select it.
        </p>          
        <p>
        <DocxReader></DocxReader>
        </p>                 
      </header>
    </div>
  );
}

export default App;
