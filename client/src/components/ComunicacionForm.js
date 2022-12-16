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
        try {     
            
                const updateEstudiante = id ? await addComunicacionToEstudiante(id, values) : await addComunicacionToAllEstudiante(values)
                Swal.fire('Se ha creado una comunicacion')            
                id ? navigate(`/estudiante/comunicaciones/${id}`) : navigate(`/home`)            
        } catch(err) {
            console.log("Error", err)
            
        }
    }


    

    return (
        <div className="card">
            <Formik
                enableReinitialize
                initialValues={comunicacion}
                validationSchema={comunicacionSchema}
                onSubmit={(values) => addComunicacion(values)}
            >
                {({ errors, touched }) => (
                    <Form>
                        <div>
                            <label htmlFor='asunto' className="col-form-label">Asunto</label>
                            <Field type='text' name='asunto' className={`form-control`}/>
                            {errors.asunto && touched.asunto ? <p>{errors.asunto}</p> : null}
                        </div>
                        <div>
                            <label htmlFor='comunicacion' className="col-form-label">Comunicacion</label>
                            <Field type='text' as="textarea" name='comunicacion' className={`form-control`}/>
                            {errors.comunicacion && touched.comunicacion ? <p>{errors.comunicacion}</p> : null}
                        </div>
                        <label htmlFor='tipo'>Tipo </label>
                            <Field type='text' name='tipo' as="select">
                                <option value="Individual">Individual</option>
                                <option value="Grupal">Grupal</option>
                            </Field>
                            {errors.tipo && touched.tipo ? <p>{errors.tipo}</p> : null}
                        <div>
                            <Button onClick={goToBack}  className='btn-comBack' >Volver</Button>
                            <Button type='submit' className='btn-comAdd' >Agregar</Button>                            
                        </div>
                    </Form>
                )}

            </Formik>
        </div>
    )
}

export default ComunicacionForm;