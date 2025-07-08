import axios from "axios";

const baseUrl = 'http://localhost:3000/api/'

export const getAgents = async () => {
    try {
        const response = await axios.get(`${baseUrl}`);
        return response.data
    } catch (error) {
        console.log(error)
    }
}

export const addCall = async (urgent: boolean = false) => {
    try {
        const response = await axios.post(`${baseUrl}/call`, {
            urgent: urgent
        })
        return response
    } catch (error) {
        console.log(error)
    }
}

export const getState = async () => {
    try {
        const response = await axios.get(`${baseUrl}/state`);
        return response.data
    } catch (error) {
        console.log(error)
    }
}

export const endCall = async (id : number) => {
    try {
        const response = await axios.post(`${baseUrl}/end/${id}`)
        return response.data 
    } catch (error) {
        console.log(error)
    }
}

