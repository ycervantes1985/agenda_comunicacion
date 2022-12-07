import React from 'react';
import {useUser} from "../contexts/userContext"
import { useNavigate } from 'react-router-dom';
import logout from '../services/logout';
import Detail from './Detail';


const Main = () => {

    const {user,setUser} = useUser();

    const renderInfo=()=>{
        if(user){
            console.log(user)
            return (<>USUARIO LOGGUEADO: {user.firstName} {user.email} {user.rol}</>)
        }else{
            return(<>NO HAY USUARIO LOGGUEADO</>)
        }
    }

    const logOut = async() => {
        const {success} = await logout();
        if(success) setUser(null)
        else window.alert("Error. No se pude desloguear")
    }


    return (
        <div>
            main
            <h2>{renderInfo()} </h2>
            {user && <button onClick={logOut}>LOGOUT</button>}
            {user && <Detail></Detail> }
        </div>
    );
}

export default Main;
