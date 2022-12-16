import axios from 'axios'


export const getAllEstudiantes = () => axios.get('http://localhost:8000/api/usersE/');

export const deleteEstudiante = (id) => axios.delete(`http://localhost:8000/api/user/${id}`);

export const updateComunicacion = (id, comunicacion) => axios.put(`http://localhost:8000/api/user/comunicacion/${id}`, comunicacion);

export const updateReadComunicacion = (id, comunicacion) => axios.put(`http://localhost:8000/api/user/comunicacionRead/${id}`, comunicacion);


export const addComunicacionToEstudiante = (id, comunicacion) => axios.put(`http://localhost:8000/api/user/comunicacion-add/${id}`, comunicacion);

export const addComunicacionToAllEstudiante = ( comunicacion) => axios.put(`http://localhost:8000/api/user/comunicacion-add/`, comunicacion);

export const getComunicacionFromEstudiante = (id) => axios.get(`http://localhost:8000/api/user/comunicacion/${id}`);

export const getOneComunicacionFromEstudiante = (id, values) => axios.post(`http://localhost:8000/api/user/comunicacionOnly/${id}`, values);

export const getOneEstudiante = (id) => axios.get(`http://localhost:8000/api/usersOne/${id}`);


