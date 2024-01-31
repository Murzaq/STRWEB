import React, {useContext, useState} from 'react';
import {NavLink, useLocation, useHistory} from "react-router-dom";
import {login, registration} from "../http/userAPI";
import {Context} from "../index";
import { observer } from 'mobx-react-lite';
import Container from '../components/Containers';
import About from '../components/About';

const Home = observer(() => {
    return (
      <Container>
        <h1>Home page</h1>
        <About/>
      </Container>
      );
});

export default Home;
