import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import store from './Store/store.js'
import { Provider } from 'react-redux'

// navigator.serviceWorker.register('/firebase-messaging-sw.js')
//   .then((registration) => {
//     console.log('ServiceWorker registration successful with scope: ', registration.scope);
//   }).catch((err) => {
//     console.error('ServiceWorker registration failed: ', err);
//   });


ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
)


