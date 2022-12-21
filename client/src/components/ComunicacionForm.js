import React, { useEffect, useState } from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { useParams, useNavigate } from 'react-router-dom';
import { addComunicacionToEstudiante, addComunicacionToAllEstudiante, getOneEstudiante } from '../services/users.services';
import { Button } from 'antd';
import ImageUpload from './ImageUpload';
import { imgUpload } from '../services/imgUpload';

import Swal from 'sweetalert2'
import { simpleGet } from '../services/simpleGet';

const ComunicacionForm = () => {

    const [images, setImages] = useState([]);
    const [urlImage, setUrlImage] = useState()
    const [loading, setLoading] = useState(false);


    const onUpload = async () => {
        setLoading(true);
        const url = await imgUpload(images[0].file);
        setLoading(false);
        console.log("URL",url)

        if (url) setUrlImage(url);
        else alert('Error, trate nuevamente más tarde. ❌')
    }

    const { id } = useParams();
    const navigate = useNavigate()
    const [estudiante, setEstudiante] = useState();
    const [comunicacion, setComunicacion] = useState({
        asunto: '',
        comunicacion: '',
        tipo: id ? 'Individual' : 'Grupal',
        foto: '',
        respuesta: '',
    })

    const getEstudiante = async()=>{
        try {
            const response = await getOneEstudiante(id)
            console.log(response.data.estudiante)
            setEstudiante(response.data.estudiante) 
        } catch(err) {
            console.log(err)
        }
    }

    useEffect(() => {
        getEstudiante()
        
    }, []);

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
                values.foto = urlImage 
                const updateEstudiante = id ? await addComunicacionToEstudiante(id, values) : await addComunicacionToAllEstudiante(values)
                id ? Swal.fire(`Se ha creado una comunicacion para ${estudiante[0]?.firstName} ${estudiante[0]?.lastName}`) : Swal.fire('Se ha creado una comunicacion general')            
                id ? navigate(`/estudiante/comunicaciones/${id}`) : navigate(`/home`)            
        } catch(err) {
            console.log("Error", err)
            
        } 
    }

    console.log(estudiante)

    

    return (
        <div className='form-container'>
            <div className='form-header'>
                {id?
                <h1 className='form-header'>Comunicación de {estudiante[0]?.firstName} {estudiante[0]?.lastName}</h1>
                :<h1 className='form-header'>Comunicación Genereal</h1>}
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

                        <label htmlFor='asunto' className="col-form-label">Asunto</label>
                        <Field type='text' name='asunto' className={(touched.asunto && errors.asunto) ? 'form-control is-invalid' : 'form-control'}/>
                        {errors.asunto && touched.asunto ? <p className="text-danger">{errors.asunto}</p> : null}

                        <label htmlFor='comunicacion' className="col-form-label">Comunicacion</label>
                        <Field type='text' as="textarea" name='comunicacion' className={(touched.comunicacion && errors.comunicacion) ? 'form-control is-invalid' : 'form-control'}/>
                        {errors.comunicacion && touched.comunicacion ? <p className="text-danger">{errors.comunicacion}</p> : null}

                        <label htmlFor='tipo'>Tipo </label>
                        <p>{comunicacion?.tipo}</p>
                        {/* <Field type='text' name='tipo' as="select" className="form-select text">
                            <option value="Individual">Individual</option>
                            <option value="Grupal">Grupal</option>
                        </Field>
                        {errors.tipo && touched.tipo ? <p className="text-danger">{errors.tipo}</p> : null} */}
                        <ImageUpload 
                        onUpload={onUpload}
                        images={images}
                        setImages={setImages}
                        urlImage= {urlImage}
                        setUrlImage={setUrlImage}
                        loading={loading}
                        />
                        <div className='btn-aling'>
                            <button type='submit' className='btn btn-custom-color-login' >Agregar</button>                            
                        </div>
                    </Form>
                )}

            </Formik>
        </div>
    )
}

export default ComunicacionForm;