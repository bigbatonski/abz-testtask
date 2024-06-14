import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './sytles/styles.css'
import FetchProvider  from './components/context/RefetchUsersContext.jsx'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <FetchProvider>
    <App />
  </FetchProvider>
);

