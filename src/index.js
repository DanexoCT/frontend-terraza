import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './Views/App';
import reportWebVitals from './reportWebVitals';
import { GoogleOAuthProvider} from "@react-oauth/google";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <GoogleOAuthProvider clientId={"211890765784-t5u0jmem5b4q778429toq6qp1heke2p0.apps.googleusercontent.com"} >
  <React.StrictMode>
    <App />
  </React.StrictMode>
</GoogleOAuthProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
