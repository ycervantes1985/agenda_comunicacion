import React, {  useEffect} from 'react';
import {useUser} from "../contexts/userContext"
import Profesor from './Profesor';

const Detail = () => {

    const {user,setUser} = useUser();

    return (
        <div>
            {user?.rol==="Profesor"  ?  
            <Profesor></Profesor> : 
            <div>{user._id}{user.firstName}</div>
}
           
        </div>
    );
}

export default Detail;
