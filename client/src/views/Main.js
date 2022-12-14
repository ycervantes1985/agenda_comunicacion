import React, {  useEffect} from 'react';
import {useUser} from "../contexts/userContext"
import logo from '../img/Logo.svg'
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

const regist = async() => {
  
  navigate(`/register`)
  
}

useEffect(() => {
   console.log("El usuario", user)
}, [user]);
    


    return (
        <div>
            <nav className='nav-container'>
              <div className='logo'>
                  <img className='remove-bg' src={logo} alt='logo agenda'></img>
                  <p className='nav-extra-bold-text'>Agenda </p> 
                  <p className='nav-extra-ligth-italic'>Inteligente</p>
              </div>  
              {user?.rol==="Profesor"  ?                 
              
              (<ul className='nav justify-content-end'>        
                
                <li className='nav-item'>            
                  <Link className="btn btn-outline-dark" variant="success" onClick={logOut}>LOGOUT</Link>
                </li>          
              </ul> ):
              user?.rol==="Estudiante" ?
              (<ul className='nav justify-content-end'>                  
                <li className='nav-item'>            
                  <Link className="btn btn-outline-dark" onClick={logOut}>LOGOUT</Link>
                </li>    
              </ul>) :
              (<ul className='nav justify-content-end'>                  
                <li className='nav-item'>
                  <button className='btn btn-outline-light btn-register' onClick={regist}>REGISTRO</button>
                </li>
                <li className='nav-item'>            
                  <Link className="btn btn-outline-dark" to='/'>LOGIN</Link>
                </li>    
              </ul>)}
            </nav>  
        </div>
    );
}

export default Main;
