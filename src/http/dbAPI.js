import {$authHost, $host} from "./index";
import jwt_decode from "jwt-decode";

export const getAdminData = async(mode) => {
    const {data} = await $authHost.get(`api/admin/${mode}`)
    console.log(`api/admin/${mode}`)

    return data
}

export const deleteUser = async (id) => {
    const {data} = await $authHost.delete(`api/admin/users/${id}`)
    return data
}

export const deleteReview = async (id) => {
    const {data} = await $authHost.delete(`api/admin/reviews/${id}`)
    return data
}

export const updateUser = async (id, email, password,role) => {
    const {data} = await $authHost.post(`api/admin/users/${id}?email=${email}&password=${password}&role=${role}`)
    return data
}

export const createUser = async (email, password,role) => {
    const {data} = await $authHost.post(`api/admin/users?email=${email}&password=${password}&role=${role}`)
    return data
}

export const updateReview = async (id, text, rate, userId, date) => {
    const {data} = await $authHost.post(`api/admin/reviews/${id}?text=${text}&rate=${rate}&userId=${userId}&date=${date}`)
    return data
}

export const createReview = async (text, rate, userId, date) => {
    
    const {data} = await $authHost.post(`api/admin/reviews?text=${text}&rate=${rate}&userId=${userId}&date=${date}`)
    return data
}

export const deleteService = async (id) => {
    const {data} = await $authHost.delete(`api/admin/services/${id}`)
    return data
}

export const updateService = async (id, name, price) => {
    const {data} = await $authHost.post(`api/admin/services/${id}?name=${name}&price=${price}`)
    return data
}

export const createService = async (name, price) => {
    const {data} = await $authHost.post(`api/admin/services?name=${name}&price=${price}`)
    return data
}


export const deleteOrders = async (id) => {
    const {data} = await $authHost.delete(`api/admin/orders/${id}`)
    return data
}

export const updateOrders = async (id, date, userId, serviceId) => {
    const {data} = await $authHost.post(`api/admin/orders/${id}?date=${date}&userId=${userId}&serviceId=${serviceId}`)
    return data
}

export const createOrders = async (date, userId, serviceId) => {
    const {data} = await $authHost.post(`api/admin/orders?date=${date}&userId=${userId}&serviceId=${serviceId}`)
    return data
}

