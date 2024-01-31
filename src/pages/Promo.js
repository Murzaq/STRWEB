import React, {useContext, useState} from 'react';
import {NavLink, useLocation, useHistory} from "react-router-dom";
import {login, registration} from "../http/userAPI";
import {Context} from "../index";
import { observer } from 'mobx-react-lite';
import Container from '../components/Containers';
import About from '../components/About';

const Promo = observer(() => {
    return (
      <Container>
        <h1>Promocode's</h1>
        <div class = "promo">
            <h2 >FIRSTTIME</h2>
            <h3 >Discount: 30%</h3>
        </div>
        <div class = "promo">
            <h2 >FASHIONFOREVER</h2>
            <h3 >Discount: 10%</h3>
            <h3 >DOESNT WORK NOW!</h3>
        </div>
      </Container>
      );
});

export default Promo;
