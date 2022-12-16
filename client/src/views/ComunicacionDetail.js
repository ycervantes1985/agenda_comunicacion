import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import { simpleGet } from '../services/simpleGet';
import Container from 'react-bootstrap/esm/Container';
import Button from 'react-bootstrap/esm/Button';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../contexts/userContext';
import { getComunicacionFromEstudiante } from '../services/users.services';
import RespuestaForm from '../components/RespuestaForm';


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
               <div className= "container-comunicacion-detail" >
                    <h3 className='form-header'>Asunto : {comunicacion[0].asunto}</h3>
                    <div className="body-comunication-detail" >
                        <div>
                            <label>comunicacion:</label>
                            <p> {comunicacion[0].comunicacion}</p>
                        </div>
                    </div>
                    <RespuestaForm/>
               </div> 
               
            }
            
        </div>
    );
}

export default ComunicacionDetail;
