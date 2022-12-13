import React, {  useEffect} from 'react';
import {useUser} from "../contexts/userContext"
import { useNavigate, Link } from 'react-router-dom';
import logout from '../services/logout';
import Detail from './Detail';


const Main = () => {

    const {user,setUser} = useUser();
    const navigate = useNavigate();

  const logOut = async() => {
    const {success} = await logout();
    navigate(`/`)
    if(success) setUser(null)    
    else window.alert("Error. No se pude desloguear")
}

useEffect(() => {
   console.log("El usuario", user)
}, [user]);


    


    return (
        <div>
            <nav className='nav-container'>
        <div className='logo'>
          <p>Agenda Comunicacion</p>
        </div>  
        {user?.rol==="Profesor"  ?                 
        <ul className='nav justify-content-end'>                  
          
          <li className='nav-item'>
            <Link className='nav-link' to={"/add-paciente"}>ADD PACIENTE</Link>          
          </li>
          <li className='nav-item'>            
            <Link className="nav-link" variant="success" onClick={logOut}>LOGOUT</Link>
          </li>          
        </ul> : <ul className='nav justify-content-end'>                  
          <li className='nav-item'>
            <button className='nav-link' to={"/register"}>REGISTRO</button>
          </li>
          <li className='nav-item'>            
            <Link className="nav-link" variant="success" onClick={logOut}>LOGOUT</Link>
          </li>    
                 
        </ul> 
        
}
      </nav>    
        </div>
    );
}

export default Main;
