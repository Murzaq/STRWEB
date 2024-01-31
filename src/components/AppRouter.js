import React, {useContext} from 'react';
import { Route, Navigate, Router, Routes} from 'react-router-dom'
import {Context} from "../index";
import {observer} from "mobx-react-lite";
import Home from '../pages/Home';
import Auth from '../pages/Auth';
import Admin from '../pages/Admin';
import PrivacyPolicy from '../pages/PrivacyPolicy';
import Promo from '../pages/Promo';

const AppRouter = observer(() => {
    const {user} = useContext(Context)

    console.log(user)
    return (
        <Routes>
            {user.isAuth?
            (
                <Route path='/admin' element={<Admin/>}/>
            ):
            (
                <Route />
            )
            }
            <Route path='/' element={<Home/>}/>
            <Route path='/login' element={<Auth/>}/>
            <Route path='/reg' element={<Auth/>}/>
            <Route path='/pp' element={<PrivacyPolicy/>}/>
     <Route path='/promo' element={<Promo/>}/>
        </Routes>
    );
});

export default AppRouter;