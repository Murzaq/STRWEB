import React, { useEffect, useState } from "react";
import Button from "../components/Button";
import classes from "../components/components.module.css"
import ModelInput from "../components/ModelInput";
import { deleteOrders, createOrders, updateOrders } from "../http/dbAPI";

const AdminOrders = ({object, refresh, mode, users, services, ...props}) => {

    const [date, setDate] = useState()
    const [userId, setUserId] = useState()
    const [serviceId, setServiceId] = useState()
    const [render, setRender] = useState(false)

    const deleteTsk = () => {
        deleteOrders(object.id)
        alert('Orders was deleted')
        refresh()
    }

    const create = async () => {

        if(date == undefined ){
             alert('Enter all values')
        }
        else{
            await createOrders(date, userId, serviceId)
            alert('Orders was created')
            refresh()
        }
    }

    const saveTsk = async  () => {
        await updateOrders(object.id, date, userId, serviceId)
        alert('Orders was saved')
    }

    useEffect(()=>{
        async function setData(){
            setUserId(object.userId)
            setServiceId(object.serviceId)
            if(object.date)
            {
                setDate(object.date.substring(0,10))
            }
        }
        setData();
    },[])

    useEffect(()=>{
        if(userId && serviceId){
            setRender(true)
        }
    },[userId, serviceId])

    return(
        <ModelInput>
            {object && object.id}
            <input type = 'date' value = {date} onChange={(e)=>setDate(e.target.value)} placeholder="date"/>
            <select onChange={(e)=>{setUserId(e.target.value)}} id='owner'>
            <option disabled selected value> -- select an option -- </option>
                {users && users.map(user=><option value={user.id} selected={userId==user.id}>{user.email}</option>)}
            </select>
            <select onChange={(e)=>{setServiceId(e.target.value)}} id='owner'>
            <option disabled selected value> -- select an option -- </option>
                {services && services.map(service=><option value={service.id} selected={serviceId==service.id}>{service.name}</option>)}
            </select>
            {
                mode=='create'?(
                    <Button onClick={e => create(e)}>Create new</Button>
                ):
                (
                    <div style={{width:'350px'}}>
                        <Button onClick={e => saveTsk(e)}>Save</Button>
                        <Button onClick={e => deleteTsk(e)}>Delete</Button>

                    </div>
                    
                )
            }
        </ModelInput>
    )
}

export default AdminOrders