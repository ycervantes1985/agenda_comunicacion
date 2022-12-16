import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import { simpleGet } from '../services/simpleGet';
import Container from 'react-bootstrap/esm/Container';
import Button from 'react-bootstrap/esm/Button';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../contexts/userContext';
import { getComunicacionFromEstudiante } from '../services/users.services';


const ComunicacionDetail = () => {

    const {id} = useParams()
    const [comunicacion, setComunicacion] = useState();
    const navigate = useNavigate()
    const {user,setUser} = useUser();
      
    
    const getComunicacion = async() => {
        try{
            const response = await getComunicacionFromEstudiante(user?._id, id)
            setComunicacion(response?.data)
        }catch(err){
            console.log(err)
        }

    }

    useEffect(() => {
        getComunicacion();
    }, []);

console.log(comunicacion)

    return (
        <div>
            <p>comunicacion: {id}</p>
            <p>user: {user?._id}</p>
        </div>
    );
}

export default ComunicacionDetail;
