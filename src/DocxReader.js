import React, { useState } from "react";
import Papa from "papaparse";

const DocxReader = () => {    
  
  const onFileUpload = (event) => {
    const reader = new FileReader();
    let file = event.target.files[0];
    

    reader.onload = (e) => {
      const content = e.target.result;
      Papa.parse(content, {
        header: true,
        skipEmptyLines: true,
        complete: function (results) {          
          

          // let tc,layout,text = "";
          //TODO: dynamic setting of header
          // results.data.map((d) => {

          // });
          let outputString="<begin subtitles>\n";
          let isfirst = true;
          let tempText = "";
          let tempTC = "";
          results.data.map((d, i, row) => {
            if(  d["Layout "].toUpperCase()==="UT"){              
              if(isfirst){
                isfirst =false;
                outputString += d["ï»¿TC Master"]+":00 "; 
                tempText = d["Text"];
              }else{
                outputString += d["ï»¿TC Master"]+":00\n";
                outputString += tempText+"\n\n"
                outputString += d["ï»¿TC Master"]+":00 "; 
                tempText = d["Text"];
                tempTC = d["ï»¿TC Master"]+":00"
              }                           
            }          
            // console.log(Object.keys(d))
            // console.log(Object.values(d))
            
          });
          outputString += tempTC+"\n";
          outputString += tempText+"\n";
          outputString += "<end subtitles>";
          
          const blob = new Blob([outputString], { type: "text/plain" });
          const url = URL.createObjectURL(blob);
          const link = document.createElement("a");
          link.download = "ut.txt";
          link.href = url;
          link.click();
        },
      });

      //const tables = getTables(content);
    //   const paragraphs = getParagraphs(content);
    //   setParagraphs(paragraphs);
    //   console.log(paragraphs)
    //    console.log(tables);
    };

    reader.onerror = (err) => console.error(err);

    reader.readAsBinaryString(file);
  };

  return <input type="file" onChange={onFileUpload} name="docx-reader" />;
};

export default DocxReader;