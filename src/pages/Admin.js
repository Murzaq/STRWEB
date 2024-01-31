import React, {useContext, useEffect, useState} from 'react';
import { observer } from 'mobx-react-lite';
import Container from '../components/Containers';
import { Context } from '..';
import AdminHeader from '../components/AdminHeader';
import { getAdminData, getMovieGenres } from '../http/dbAPI';
import { NavLink } from 'react-router-dom';
import AdminUser from '../adminComponents/AdminUser';
import AdminReview from '../adminComponents/AdminReview';
import AdminService from '../adminComponents/AdminService';
import AdminOrders from '../adminComponents/AdminOrder';
import Button from '../components/Button';

const Admin = observer(() => {

    const [model, setModel] = useState('services')
    const [objects, setObjects] = useState()
    const [renderObjects, setRender] = useState (false)


    const [users, setUsers] = useState()
    const [services, setServices] = useState()

    const createLine = ()=>{
        if(model=='services'){
            return <AdminService object={{}} refresh={refresh} mode='create' />
        }
        else if(model=='users'){
            return <AdminUser  object={{}} refresh={refresh} mode='create'/>
        }
        else if(model=='reviews'){
            return <AdminReview object={{}} users={users} refresh={refresh} mode='create'/>
        }
        else{
            return <AdminOrders object={{}} users={users} services={services} refresh={refresh} mode='create'/>
        }
    }

    async function loadData(){
        let data = await getAdminData(model)
        let users = await getAdminData('users')
        let services = await getAdminData('services')
        
        setServices(services)
        setUsers(users)
        setObjects(data)
    }

    useEffect(()=>{
        refresh();

    },[model])

    useEffect(()=>{
        setRender(true)
    }, [objects])

    const click = (type) => {
        setModel(type);
    }

    const refresh = async () =>{
        setRender(false)
        await loadData();    
    }


    return (
        <Container>
            <AdminHeader onclick={click}/>
            <h1>Admin panel</h1>
            <div id='objectsSet'>
                {
                    createLine()
                }
                {objects && renderObjects && objects.map(object=>{
                    if(model=='services'){
                        return <AdminService object={object} refresh={refresh} />
                    }
                    else if(model=='users'){
                        return <AdminUser object={object} refresh={refresh} />
                    }
                    else if(model=='reviews'){
                        return <AdminReview object={object} users={users} refresh={refresh} />
                    }
                    else{
                        return <AdminOrders object={object} users={users} services={services} refresh={refresh} />
                    }
                })}

            </div>
        </Container>
    );
});

export default Admin;