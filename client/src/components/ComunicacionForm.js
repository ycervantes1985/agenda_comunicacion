import React, { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { useParams, useNavigate } from 'react-router-dom';
import { addComunicacionToEstudiante, addComunicacionToAllEstudiante } from '../services/users.services';
import { Button } from 'antd';

import Swal from 'sweetalert2'

const ComunicacionForm = () => {

    const { id } = useParams();
    const navigate = useNavigate()
    const [comunicacion, setComunicacion] = useState({
        asunto: '',
        comunicacion: '',
        tipo: id ? 'Individual' : 'Grupal',
        foto: '',
        respuesta: '',
    })

    

    const goToBack = () =>{navigate(`/home`)}
    
    const comunicacionSchema = Yup.object().shape({
        asunto: Yup.string()
        .min(3, "El asunto no puede tener menos de 2 caracteres")
        .required("Este campo es obligatorio"),

        comunicacion: Yup.string()
        .min(3, "La comunicacion no puede tener menos de 2 caracteres")
        .required("Este campo es obligatorio"),

        tipo: Yup.string()
        .required("Este campo es obligatorio"),

        foto: Yup.string(),
        

        respuesta: Yup.string(),
        



    });

    const addComunicacion = async (values) => {

        console.log("hola estoy en la funcion")
         try {     
            
                const updateEstudiante = id ? await addComunicacionToEstudiante(id, values) : await addComunicacionToAllEstudiante(values)
                Swal.fire('Se ha creado una comunicacion')            
                id ? navigate(`/estudiante/comunicaciones/${id}`) : navigate(`/home`)            
        } catch(err) {
            console.log("Error", err)
            
        } 
    }


    

    return (
        <div className='form-container'>
            <div className='form-header'>
                <h1 className='form-header'>Comuncicación</h1>
                <div className="justify-btn">
                    <button onClick={goToBack}  className='btn btn-outline-light' >Volver</button>
                </div>
            </div>
            <Formik
                enableReinitialize
                initialValues={comunicacion}
                validationSchema={comunicacionSchema}
                onSubmit={(values) => addComunicacion(values)}
            >
                {({ errors, touched }) => (
                    <Form className= "form-login">
                        <div>
                            <label htmlFor='asunto' className="col-form-label">Asunto</label>
                            <Field type='text' name='asunto' className={(touched.asunto && errors.asunto) ? 'form-control is-invalid' : 'form-control'}/>
                            {errors.asunto && touched.asunto ? <p className="text-danger">{errors.asunto}</p> : null}
                        </div>
                        <div>
                            <label htmlFor='comunicacion' className="col-form-label">Comunicacion</label>
                            <Field type='text' as="textarea" name='comunicacion' className={(touched.comunicacion && errors.comunicacion) ? 'form-control is-invalid' : 'form-control'}/>
                            {errors.comunicacion && touched.comunicacion ? <p className="text-danger">{errors.comunicacion}</p> : null}
                        </div>
                        <label htmlFor='tipo'>Tipo </label>
                            <Field type='text' name='tipo' as="select" className="form-select">
                                <option value="Individual">Individual</option>
                                <option value="Grupal">Grupal</option>
                            </Field>
                            {errors.tipo && touched.tipo ? <p className="text-danger">{errors.tipo}</p> : null}
                        <div>
                        <br/>
                            <button type='submit' className='btn btn-danger btn-custom-color-login' >Agregar</button>                            
                        </div>
                    </Form>
                )}

            </Formik>
        </div>
    )
}

export default ComunicacionForm;