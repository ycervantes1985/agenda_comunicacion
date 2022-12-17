import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import { simpleGet } from '../services/simpleGet';
import Container from 'react-bootstrap/esm/Container';
import Button from 'react-bootstrap/esm/Button';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../contexts/userContext';
import { getComunicacionFromEstudiante, updateComunicacion, getOneComunicacionFromEstudiante } from '../services/users.services';
import RespuestaForm from '../components/RespuestaForm';
import Swal from 'sweetalert2'


const ComunicacionDetail = () => {

    const {id} = useParams()
    
    const [comunicacion, setComunicacion] = useState();
    const navigate = useNavigate()
    const {user,setUser} = useUser();
      
    
    const getComunicacion = async() => {
        try{
            console.log(id)
            const response = await getOneComunicacionFromEstudiante(user?._id, {_id:id})
            setComunicacion(response?.data.comunicacion)
            console.log("esta es la comunicacion",response?.data.comunicacion)
        }catch(err){
            console.log(err)
        }

    }

    useEffect(() => {
        getComunicacion();
    }, []);

const sendResponse = async(value) =>{
    try {
        console.log("value",value)
        value._id = id
        const response = await updateComunicacion(user._id,value)
        Swal.fire('Se ha respondido la comunicacion') 
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
                        <h3 className='form-header'>Asunto : {comunicacion.asunto}</h3>
                        <div className="justify-btn">
                            <button className='btn btn-outline-light' onClick={()=>navigate("/home")}>Volver</button>        
                         </div>
                    </div>
                    <div className="body-comunication-detail" >
                        <div className="comunicacion-imagen">
                            <div>
                                <label>Comunicacion:</label>
                                <p className='comunicacion-text'> {comunicacion.comunicacion}</p>
                            </div>
                            <div className="comunicacion-img">
                                <img className="comunicacion-img" src={comunicacion.foto}></img>
                            </div>
                        </div>
                    </div>
                    <RespuestaForm onSubmitProp={sendResponse} />
               </div> 
               
            }
            
        </div>
    );
}

export default ComunicacionDetail;
