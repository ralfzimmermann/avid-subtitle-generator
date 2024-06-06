import logo from './logo.svg';
import './App.css';
import Button from '@mui/material/Button';
import React, { useState } from 'react';
import DocxReader from './DocxReader';



function App() {

  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadedFile, setuploadedFile] = useState(null);


  const handleUpload = (e) => {
    e.preventDefault();
    console.log('The link was clicked.');
    uploadFile();    
  }
  const handleRender = (e) => {
    e.preventDefault();    
    readDoc();
  }
  const readDoc = () => {
  }
  const handleFileSelect = (e) => {
    e.preventDefault();
    let file = e.target.files[0];
        console.log(file);
        
        if (file) {
          console.log('FILE: do something' );
          setSelectedFile(file);      
        }
  }
  
  const uploadFile = async ()=>{
    // Create an object of formData
    const formData = new FormData();

    // Update the formData object
    formData.append('file', selectedFile);

    // Details of the uploaded file
    console.log(selectedFile);
  
    const response = await fetch('http://localhost:8888/upload.php', {
      method: 'POST',
      body: formData
    });
    const responseData = await response.json();
    setuploadedFile(responseData.image_link);
    console.log(responseData.image_link);
  }

  // docxTables({
  //   file: 'path/to/the/docx/file'
  // }).then((data) => {
  //   // .docx table data
  //   console.log(data)
  // }).catch((error) => {
  //   console.error(error)
  // })

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
