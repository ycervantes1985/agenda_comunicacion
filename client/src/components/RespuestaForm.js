import React from 'react';
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

const RespuestaForm = (props) => {

    const {onSubmitProp}=props;

    return (
        <div>
        <Formik
        initialValues={{
        respuesta:'',
        }}
        validationSchema={Yup.object().shape({
            respuesta: Yup.string()
            .required("Por favor, ingresa un respuesta al profesor"),
        })}

        onSubmit={(values, {setSubmitting}) =>{
            onSubmitProp(values);
        }}
        >
            {({
                values,
                errors,
                touched,
                handleSubmit,
                //isSubmitting,
                //validating,
                valid,
            }) =>{
        return (
            <div>
                <Form className= "form-login" method= "post" onSubmit={handleSubmit}>
                    <label htmlFor="respuesta" className="col-sm-12 col-form-label" >Respuesta apoderado:</label>
                    <Field id='respuesta' type="text" as="textarea" placeholder="Si lo desea puede enviar una respuesta al profesor" className='form-control textarea-control' name='respuesta'/>
                    {errors.respuesta && touched.respuesta && <p>{errors.respuesta}</p>}
                    <div className='btn-aling'>
                        <button type="submit" className='btn btn-danger btn-custom-color-login ' disabled={Object.values(errors).length > 0}>Responder</button>
                    </div>
                </Form>
            </div>
        );
        }}
        </Formik>
        </div>
    );
}

export default RespuestaForm;
