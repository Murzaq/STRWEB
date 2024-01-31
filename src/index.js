import React, {createContext} from 'react';
import UserStore from './store/UserStore';
import ReactDOM from 'react-dom/client';
import App from './App';

export const Context = createContext(null)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Context.Provider value={{
    user: new UserStore(),
  }}>
    <App />
  </Context.Provider>,
);

