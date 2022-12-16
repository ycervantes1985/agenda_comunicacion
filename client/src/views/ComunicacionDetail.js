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
    
    const [comunicaciones, setComunicaciones] = useState();
    const navigate = useNavigate()
    const {user,setUser} = useUser();
      
    
    const getComunicacion = async() => {
        try{
            console.log(id)
            const response = await getComunicacionFromEstudiante(user?._id)
            setComunicaciones(response?.data.comunicaciones)
        }catch(err){
            console.log(err)
        }

    }

let comunicacion = comunicaciones?.filter(comunicacion => comunicacion._id === id)

console.log(comunicacion)

    useEffect(() => {
        getComunicacion();
    }, []);


    return (
        <div>
            {
               comunicacion && 
               <>
                    <p>comunicacion: {comunicacion[0]._id}</p>
                    <p>comunicacion asunto : {comunicacion[0].asunto}</p>
                    <p>user: {user?._id}</p>
               </> 
               
            }
            
        </div>
    );
}

export default ComunicacionDetail;
