import React, {useContext, useEffect, useState} from 'react';
import {BrowserRouter} from "react-router-dom";
import AppRouter from "./components/AppRouter";
import Header from './components/Header';
import { observer } from 'mobx-react-lite';
import {Context} from "./index";
import {check} from "./http/userAPI";
 

const App = observer(() => {
  document.body.style.backgroundColor = "#fa9fe5";
  document.body.style.color = "#292929";
  document.body.style.padding = 0;
  document.body.style.margin = 0;

  const {user} = useContext(Context)

  useEffect(() => {
      check().then(data => {
        if(data){
          user.setUser(data)
          user.setIsAuth(true)
        }
    })
  }, [])

  return (
    <BrowserRouter>
      <Header/>
      <AppRouter />
    </BrowserRouter>
);
})

export default App;
