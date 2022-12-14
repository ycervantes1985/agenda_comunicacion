import React, {  useEffect} from 'react';
import {useUser} from "../contexts/userContext"
import HomeAlumnos from './HomeAlumnos';
import Profesor from './Profesor';

const Detail = () => {

    const {user,setUser} = useUser();

    return (
        <div>
            {user?.rol==="Profesor"  ?  
            <Profesor></Profesor> :
            <div>
                <HomeAlumnos></HomeAlumnos>
            </div>
            }
        </div>
    );
}

export default Detail;
