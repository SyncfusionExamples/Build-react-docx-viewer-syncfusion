import React, { useRef, useEffect } from 'react';
import './App.css';
import { DocumentEditorComponent, Ribbon } from '@syncfusion/ej2-react-documenteditor';
DocumentEditorComponent.Inject(Ribbon);

function App() {
 const containerRef = useRef<DocumentEditorComponent| null>(null);
 useEffect(() => {
   const container = containerRef.current;
   if (container) {
     const uploadDocument = new FormData();
     uploadDocument.append('DocumentName', 'Getting Started.docx');
     const loadDocumentUrl = container.serviceUrl + 'LoadDocument';
     const httpRequest = new XMLHttpRequest();
     httpRequest.open('POST', loadDocumentUrl, true);
     httpRequest.onreadystatechange = () => {
       if (httpRequest.readyState === 4) {
         if (httpRequest.status === 200 || httpRequest.status === 304) {
           container.open(httpRequest.responseText);
         }
       }
     };
     httpRequest.send(uploadDocument);
   }
 }, []);

 return (
   <div>
     <DocumentEditorComponent
             id="container"
             ref={containerRef}
             height={'90vh'}
             serviceUrl="http://localhost:62869/api/documenteditor/"
             isReadOnly={true}
         />
   </div>
 );
}

export default App; 
