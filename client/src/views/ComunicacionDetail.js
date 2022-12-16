import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import { simpleGet } from '../services/simpleGet';
import Container from 'react-bootstrap/esm/Container';
import Button from 'react-bootstrap/esm/Button';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../contexts/userContext';
import { getComunicacionFromEstudiante, updateComunicacion } from '../services/users.services';
import RespuestaForm from '../components/RespuestaForm';
import Swal from 'sweetalert2'


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

const sendResponse = async(value) =>{
    try {
        console.log("value",value)
        value._id = id
        const response = await updateComunicacion(user._id,value)
        Swal.fire('Se ha creado una comunicacion') 
        navigate("/home")
        console.log(response)
    } catch (error) {
        console.log(error)
    }

}

    return (
        <div>
            {
               comunicacion && 
               <div className= "container-comunicacion-detail" >
                    <div className='form-header'>
                        <h3 className='form-header'>Asunto : {comunicacion[0].asunto}</h3>
                        <div className="justify-btn">
                            <button className='btn btn-outline-light' onClick={()=>navigate("/home")}>Volver</button>        
                         </div>
                    </div>
                    <div className="body-comunication-detail" >
                        <div>
                            <label>Comunicacion:</label>
                            <p> {comunicacion[0].comunicacion}</p>
                        </div>
                    </div>
                    <RespuestaForm onSubmitProp={sendResponse} />
               </div> 
               
            }
            
        </div>
    );
}

export default ComunicacionDetail;
