import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useUser } from '../contexts/userContext';
import {  getComunicacionFromEstudiante, updateReadComunicacion } from '../services/users.services'
import Card from 'react-bootstrap/Card';
import {EditOutlined,EyeTwoTone,EyeInvisibleTwoTone } from '@ant-design/icons'
import Container from 'react-bootstrap/esm/Container';
import moment from 'moment';

const HomeAlumnos = () => {

    const {user,setUser} = useUser();
    const {id} = useParams();
    const [anotaciones, setAnotaciones] = useState();
    const navigate = useNavigate();


    useEffect(() => {        
        traerComunicaciones()
}, []);   



const traerComunicaciones = async() =>{
    const response = await getComunicacionFromEstudiante(user?._id)
    console.log("Estas son las comunicaciones", response.data.comunicaciones)
    setAnotaciones(response.data.comunicaciones)
}

const readComunicationTrue = async(comunicacionId) =>{
    try{
        console.log(comunicacionId)
        const data = {_id:comunicacionId,leido:true};
        console.log(data)
        const response = await updateReadComunicacion(user?._id, data)
        console.log(response)
    }catch(err){
        console.log(err)
    }
}

const leerComunicacion = (id) =>{
    readComunicationTrue(id)
    navigate(`/estudiante/comunicacione/${id}`)
}

    return (
        <div>
            {user &&
            <Container>
            <br/>
            <h3>Bienvenido a las comunicaciones de {user?.firstName} {user?.lastName}</h3>

            <h4 className='form-header'>Comunicaciones Generales</h4>
            <div className='admin-container-flex'>
                    {anotaciones?.filter(comunicacion => comunicacion.tipo === "Grupal").map((comunicacion,index)=>{
                        console.log(comunicacion);
                        return(<Card  key={index} style={{ width: '18rem' }}>
                        <Card.Img variant="top" src={comunicacion.foto} />
                        <Card.Body>
                            <div className="flex-edit-delete">
                                {comunicacion.leido?
                                <EyeTwoTone />:
                                <EyeInvisibleTwoTone twoToneColor="#eb2f96"/>}
                                <p>{moment(comunicacion.createdAt).format("DD-MM-YYYY")}</p>
                            </div>
                            <Card.Title className='card-description'>{comunicacion.asunto}</Card.Title>
                            <Card.Text className='card-description'>
                                {comunicacion.comunicacion}
                            </Card.Text>
                            <div className="flex-btn-leer">
                                <button className="btn btn-primary" onClick={()=>leerComunicacion(comunicacion._id)}>Leer</button>
                                {/* <EditOutlined style={{ fontSize: '1.4em'}} onClick={()=>navigate(`/admin/${comunicacion._id}`)}/> */}
                            </div>

                        </Card.Body>
                    </Card>)
                    })}
                </div>
                <h4 className='form-header'>Comunicaciones Personales de {user?.firstName} {user?.lastName}</h4>
            <div className='admin-container-flex'>
                    {anotaciones?.filter(comunicacion => comunicacion.tipo === "Individual").map((comunicacion,index)=>{
                        console.log(comunicacion);
                        return(<Card  key={index} style={{ width: '18rem' }}>
                        <Card.Img variant="top" src={comunicacion.foto} />
                        <Card.Body>
                            <div className="flex-edit-delete">
                                {comunicacion.leido?
                                <EyeTwoTone />:
                                <EyeInvisibleTwoTone twoToneColor="#eb2f96"/>}
                                <p>{moment(comunicacion.createdAt).format("DD-MM-YYYY")}</p>
                            </div>
                            <Card.Title className='card-description'>{comunicacion.asunto}</Card.Title>
                            <Card.Text className='card-description'>
                                {comunicacion.comunicacion}
                            </Card.Text>
                            <div className="flex-btn-leer">
                            <button className="btn btn-primary" onClick={()=>leerComunicacion(comunicacion._id)}>Leer</button>
                                {/* <EditOutlined style={{ fontSize: '1.4em'}} onClick={()=>navigate(`/admin/${comunicacion._id}`)}/> */}
                            </div>

                        </Card.Body>
                    </Card>)
                    })}
                </div>
            </Container>}

        </div>
    );
}

export default HomeAlumnos;
