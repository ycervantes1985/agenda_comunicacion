import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import { simpleGet } from '../services/simpleGet';
import Container from 'react-bootstrap/esm/Container';
import Button from 'react-bootstrap/esm/Button';
import { useNavigate } from 'react-router-dom';


const ComunicacionDetail = () => {

    const {id} = useParams()
    const [comunicacion, setComunicacion] = useState();
    const navigate = useNavigate()
    

    const getComunicacion = async() => {
        const response = await simpleGet("http://localhost:8000/api/user/comunicacion/" + id)
        console.log(response)
        setComunicacion(response.data.comunicacion)
    }

    useEffect(() => {
        getComunicacion();
    }, []);

    return (
        <div>
            
        </div>
    );
}

export default ComunicacionDetail;
