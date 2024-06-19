import React, { useState } from "react";
import Papa from "papaparse";

const DocxReader = () => {    
  
  function validateTimecode(tc){
    let tcArr = tc.replace(/\s+/g, ' ').trim().split(":")
    if(tcArr.length===2)tc=tc+":00"; 
    tc="01:"+tc;
    return tc;
  }

  const onFileUpload = (event) => {
    const reader = new FileReader();
    let file = event.target.files[0];

    reader.onload = (e) => {
      const content = e.target.result;      
      Papa.parse(content, {
        header: true,
        skipEmptyLines: true,
        complete: function (results) {          
          
          console.log(results.meta['fields']);
          let text = "Please confirm table header:\nTimecode = "+results.meta['fields'][0]+"\nLayout = "+results.meta['fields'][1]+"\nText = "+results.meta['fields'][2];
          if (window.confirm(text) == true) {
           
            let tcHeader =results.meta['fields'][0];
            let layoutHeader =results.meta['fields'][1];
            let textHeader =results.meta['fields'][2];
            let outputString="@ This file written with the Avid Caption plugin, version 1  \n\n<begin subtitles>\n\n";
            let isfirst = true;
            let tempText = "";
            let tempTC = "";          
            let UTActive = false;

            results.data.map((elem, index, arrayObj) => {                
                if( elem[layoutHeader].toUpperCase()==="UT"){     
                  UTActive = true;         
                  if(isfirst){
                    isfirst =false;
                    outputString += validateTimecode(elem[tcHeader]); 
                    tempText = elem[textHeader].replace(/\s+/g, ' ').trim();
                  }else{
                    outputString += " "+validateTimecode(elem[tcHeader])+"\n";
                    outputString += tempText+"\n\n"
                    console.log(tempText);
                    outputString += validateTimecode(elem[tcHeader]);
                    tempText = elem[textHeader].replace(/\s+/g, ' ').trim();
                    tempTC = validateTimecode(elem[tcHeader]);
                  }                           
                }else if(UTActive && elem[layoutHeader].toUpperCase()===""){                  
                  tempText += " "+elem[textHeader].replace(/\s+/g, ' ').trim();
                }else{
                  UTActive = false;
                }            
              // console.log(Object.keys(d))
              // console.log(Object.values(d))
              
            });
            outputString += tempTC+"\n";
            outputString += tempText+"\n\n";
            outputString += "<end subtitles>";
            
            const blob = new Blob([outputString], { type: "text/plain;charset=UTF-8" });
            const url = URL.createObjectURL(blob);
            const link = document.createElement("a");
            link.download = "ut.txt";
            link.href = url;
            link.click();

          } else {
            console.log("Abort")
          }
        },

      
      });
    };

    reader.onerror = (err) => console.error(err);
    reader.readAsText(file,'UTF-8');
  };

  return <input type="file" onChange={onFileUpload} name="docx-reader" />;
};

export default DocxReader;