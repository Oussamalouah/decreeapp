import './wdyr';
import React, {useEffect, useState} from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router} from 'react-router-dom';
import {ApolloProvider} from '@apollo/client';
import {cache, client} from './api/ApolloClient';
import {LocalStorageWrapper, persistCache} from 'apollo3-cache-persist';
import {ToastContainer} from 'react-toastify';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {DecreeSpinner} from './modules/core/DecreeSpinner';
import {GlobalStyle} from './modules/core/GlobalStyle';
import {Environment} from './Environment';
import {localStorageService} from './services/LocalStorageService';
import {cloudService} from './services/CloudService';

import './index.css';
import 'react-toastify/dist/ReactToastify.css';
import 'pure-react-carousel/dist/react-carousel.es.css';
import 'react-confirm-alert/src/react-confirm-alert.css';
import 'react-accessible-accordion/dist/fancy-example.css';
import {emailService} from './services/EmailService';
import {customerService} from './services/customer-service';

const Root = () => {
  const [ready, setReady] = useState(false);

  Environment.set({
    services: {
      storage: localStorageService,
      cloud: cloudService,
      email: emailService,
      customer: customerService,
    },
  });

  /**
   * Persist Apollo cache to local storage before actually start rendering
   */
  useEffect(() => {
    const initApolloCache = async () => {
      await persistCache({
        cache,
        storage: new LocalStorageWrapper(window.localStorage),
      });
      setReady(true);
    };

    initApolloCache();
  }, []);

  if (ready) {
    return (
      <ApolloProvider client={client}>
        <ToastContainer hideProgressBar />
        <React.StrictMode>
          <Router>
            <GlobalStyle />
            <App />
          </Router>
        </React.StrictMode>
      </ApolloProvider>
    );
  }

  return (
    <div className="flex items-center justify-center h-screen">
      <DecreeSpinner type="primary" size={40} />
    </div>
  );
};

ReactDOM.render(<Root />, document.getElementById('root'));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals(console.log);
