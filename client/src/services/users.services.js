import axios from 'axios'


export const getAllEstudiantes = () => axios.get('http://localhost:8000/api/usersE/');

export const deleteEstudiante = (id) => axios.delete(`http://localhost:8000/api/user/${id}`);

export const updateComunicacion = (id, comunicacion) => axios.put(`http://localhost:8000/api/user/comunicacion/${id}`, comunicacion);

export const getPaciente = (id) => axios.get(`http://localhost:8000/api/paciente/${id}`);

export const addComunicacionToEstudiante = (id, comunicacion) => axios.post(`http://localhost:8000/api/user/comunicacion/${id}`, comunicacion);

export const addComunicacionToAllEstudiante = ( comunicacion) => axios.put(`http://localhost:8000/api/user/comunicacion/`, comunicacion);

export const getComunicacionFromEstudiante = (id) => axios.get(`http://localhost:8000/api/user/comunicacion/${id}`);

export const getAComunicacionFromEstudiante = (id, body) => {
    console.log("dentro de comunicacion",body)
    axios.get(`http://localhost:8000/api/user/comunicacionOnly/${id}`, body);}   