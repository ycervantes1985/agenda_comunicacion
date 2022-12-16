import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import { simpleGet } from '../services/simpleGet';
import Container from 'react-bootstrap/esm/Container';
import Button from 'react-bootstrap/esm/Button';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../contexts/userContext';
import { getAComunicacionFromEstudiante } from '../services/users.services';


const ComunicacionDetail = () => {

    const {id} = useParams()
    const [comunicacion, setComunicacion] = useState();
    const navigate = useNavigate()
    const {user,setUser} = useUser();
    const [data, setData] = useState(user?._id);
    
    
    console.log(id)
    console.log(user._id)
    const getComunicacion = async(data) => {
        try{
            console.log("data",id)
            const response = await getAComunicacionFromEstudiante(data, id)
            console.log(response)
        }catch(err){
            console.log(err)
        }

    }

    useEffect(() => {
        getComunicacion();
    }, []);



    return (
        <div>
            <p>comunicacion: {id}</p>
            <p>user: {user?._id}</p>
        </div>
    );
}

export default ComunicacionDetail;
