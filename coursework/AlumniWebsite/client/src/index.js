import React from 'react';
import {createRoot} from 'react-dom/client'; 
import App from './App';
import './index.css';
import "react-datetime/css/react-datetime.css";

const root = createRoot(document.getElementById('root'));

root.render(<App />); 
