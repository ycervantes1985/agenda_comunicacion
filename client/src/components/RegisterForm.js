import React from 'react';
import { Formik, Field, Form} from "formik";
import * as Yup from "yup";

const RegisterForm = (props) => {

    const {firstName,lastName, rol ,email,password,confirmPassword,onSubmitProp}=props;
    
    return (
        <div >
          <Formik
          initialValues={{
          firstName : firstName,
          lastName:lastName,
          rol:rol,
          email:email,
          password:password,
          confirmPassword:confirmPassword,
        }}
        validationSchema={Yup.object().shape({
            firstName: Yup.string()
            .min(3, "Tu nombre es muy corto")
            .required ("Por favor ingresa tu nombre"),
            
            lastName: Yup.string()
            .min (3, "El apellido es muy corto")
            .required("Por favor ingrese el apellido correctamente"),

            rol: Yup.string()
            .required("Por favor ingrese un rol"),
            
            email: Yup.string()
            .email("Correo no valido")
            .min(3, "Este correo electrónico es incorrecto")
            .required("Por favor, ingresa un correo electrónico válido"),
            
            password: Yup.string()
            .equals([Yup.ref('confirmPassword'), null], "las contraseñas no son iguales")
            .min(8, "La clave debe contener más de 8 caractes")
            .required("Por favor ingrese una contraseña"),

            confirmPassword: Yup.string()
            .equals([Yup.ref('password'), null], "las contraseñas no son iguales")
            .min(8, "La clave debe contener más de 8 caractes")
            .required("Por favor ingrese la confirmación de la contraseña"),
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
            <div className='form-container-register'>
                <h1 className='form-header'>REGISTRO</h1>
                <Form className= "form-login" method= "post" onSubmit={handleSubmit}>
                    <label htmlFor="firstName" className="col-sm-2 col-form-label">Nombre</label>
                    <Field id='firstName'type="text" className={(touched.firstName && errors.firstName) ? 'form-control is-invalid' : 'form-control'} placeholder="Nombre" name='firstName'/>
                    {errors.firstName && touched.firstName && <p className="text-danger">{errors.firstName}</p>}
        
                    <label htmlFor="lastName" className="col-sm-2 col-form-label">Apellido</label>
                    <Field  id='lastName' type="text" placeholder="Apellido" className={(touched.lastName && errors.lastName) ? 'form-control is-invalid' : 'form-control'} name='lastName'/>
                    {errors.lastName && touched.lastName && <p className="text-danger">{errors.lastName}</p>}

                    <label htmlFor='rol'>Rol </label>
                    <Field type='text' name='rol' as="select" className="form-select">
                        <option value="Profesor">Profesor</option>
                        <option value="Estudiante">Estudiante</option>
                    </Field>
                    {errors.rol && touched.rol ? <p className="text-danger">{errors.rol}</p> : null}

                    <label htmlFor="email" className="col-form-label">Correo Electrónico</label>
                    <Field id='email' type="text" placeholder="Email" className={(touched.email && errors.email) ? 'form-control is-invalid' : 'form-control'} name='email'/>
                    {errors.email && touched.email && <p className="text-danger">{errors.email}</p>}

                    <label htmlFor="password" className="col-sm-2 col-form-label">Contraseña</label>
                    <Field  id='password' type="password" placeholder="Contraseña" className={(touched.password && errors.password) ? 'form-control is-invalid' : 'form-control'} name='password'/>
                    {errors.password && touched.password && <p className="text-danger">{errors.password}</p>}

                    <label htmlFor="confirmPassword" className="col-form-label">Confirmar Contraseña</label>
                    <Field  id='confirmPassword' type="password" placeholder="Confirmar Contraseña" className={(touched.confirmPassword && errors.confirmPassword) ? 'form-control is-invalid' : 'form-control'} name='confirmPassword'/>
                    {errors.confirmPassword && touched.confirmPassword && <p className="text-danger">{errors.confirmPassword}</p>}
                    <div className='btn-aling'>

                        <button type="submit" className='btn btn-danger btn-custom-color-login ' disabled={Object.values(errors).length > 0}>Registrarse</button>
                    </div>
                </Form>
                </div>
        );
        }}
        </Formik>
        </div>
      );
    }
export default RegisterForm