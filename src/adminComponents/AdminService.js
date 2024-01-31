import React, { useEffect, useState } from "react";
import Button from "../components/Button";
import classes from "../components/components.module.css"
import ModelInput from "../components/ModelInput";
import { deleteService, createService, updateService } from "../http/dbAPI";

const AdminService = ({object, refresh, mode, ...props}) => {

    const [name, setName] = useState()
    const [price, setPrice] = useState()
    const [render, setRender] = useState(false)

    const deleteSer = () => {
        deleteService(object.id)
        alert('Service was deleted')
        refresh()
    }

    const create = async () => {

        if(name == undefined || price == undefined){
             alert('Enter all values')
        }
        else{
            await createService(name, price)
            alert('Service was created')
            refresh()
        }
    }

    const saveSer = async  () => {
        await updateService(object.id, name, price)
        alert('Service was saved')
    }

    useEffect(()=>{
        async function setData(){
            setName(object.name)
            setPrice(object.price)
        }
        setData();
        setRender(true)
    },[])

    return(
        <ModelInput>
            {object && object.id}
            <input type = 'text' value = {name} onChange={(e)=>setName(e.target.value)} placeholder="name"/>
            <input type = 'number' value = {price} onChange={(e)=>setPrice(e.target.value)} placeholder="price"/>
            
            {
                mode=='create'?(
                    <Button onClick={e => create(e)}>Create new</Button>
                ):
                (
                    <div style={{width:'350px'}}>
                        <Button onClick={e => saveSer(e)}>Save</Button>
                        <Button onClick={e => deleteSer(e)}>Delete</Button>

                    </div>
                    
                )
            }
        </ModelInput>
    )
}

export default AdminService