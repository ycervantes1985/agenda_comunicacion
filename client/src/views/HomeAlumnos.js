import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useUser } from '../contexts/userContext';
import {  getComunicacionFromEstudiante } from '../services/users.services'
import Card from 'react-bootstrap/Card';
import {EditOutlined,EyeTwoTone,EyeInvisibleTwoTone } from '@ant-design/icons'
import Container from 'react-bootstrap/esm/Container';

const HomeAlumnos = () => {

    const {user,setUser} = useUser();
    const {id} = useParams();
    const [comunicaciones, setComunicaciones] = useState();
    const navigate = useNavigate();


    useEffect(() => {        
        traerComunicaciones()
}, []);   



const traerComunicaciones = async() =>{
    const response = await getComunicacionFromEstudiante(user?._id)
    console.log("Estas son las comunicaciones", response.data.comunicaciones)
    setComunicaciones(response.data.comunicaciones)
}

    return (
        <div>
            {user &&
            <Container>
            <h3>Bienvenido a las comunicaciones de {user?.firstName} {user?.lastName}</h3>

            <h4 className='form-header'>Comunicaciones Generales</h4>
            <div className='admin-container-flex'>
                    {comunicaciones?.filter(comunicacion => comunicacion.tipo === "Grupal").map((comunicacion,index)=>{
                        console.log(comunicacion);
                        return(<Card  key={index} style={{ width: '18rem' }}>
                        <Card.Img variant="top" src={comunicacion.foto} />
                        <Card.Body>
                            <div className="flex-edit-delete">
                                {comunicacion.leido?
                                <EyeTwoTone />:
                                <EyeInvisibleTwoTone twoToneColor="#eb2f96"/>}
                            </div>
                            <Card.Title>{comunicacion.asunto}</Card.Title>
                            <Card.Text>
                                {comunicacion.comunicacion}
                            </Card.Text>
                            <div className="flex-edit-delete">
                                <button className="btn btn-primary" onClick={()=>navigate(`/estudiante/comunicacione/:id/${comunicacion._id}`)}>Leer</button>
                                {/* <EditOutlined style={{ fontSize: '1.4em'}} onClick={()=>navigate(`/admin/${comunicacion._id}`)}/> */}
                            </div>

                        </Card.Body>
                    </Card>)
                    })}
                </div>
                <h4 className='form-header'>Comunicaciones Personales</h4>
            <div className='admin-container-flex'>
                    {comunicaciones?.filter(comunicacion => comunicacion.tipo === "Individual").map((comunicacion,index)=>{
                        console.log(comunicacion);
                        return(<Card  key={index} style={{ width: '18rem' }}>
                        <Card.Img variant="top" src={comunicacion.foto} />
                        <Card.Body>
                            <div className="flex-edit-delete">
                                {comunicacion.leido?
                                <EyeTwoTone />:
                                <EyeInvisibleTwoTone twoToneColor="#eb2f96"/>}
                            </div>
                            <Card.Title>{comunicacion.asunto}</Card.Title>
                            <Card.Text>
                                {comunicacion.comunicacion}
                            </Card.Text>
                            <div className="flex-edit-delete">
                            <button className="btn btn-primary" onClick={()=>navigate(`/estudiante/comunicacione/:id/${comunicacion._id}`)}>Leer</button>
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
