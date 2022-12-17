import logo from "./logo.svg";
import "./App.css";
import { Link, Route, Routes } from "react-router-dom";
import Main from "./views/Main";
import Login from "./views/Login";
import Register from "./views/Register";
import { UserProvider } from "./contexts/userContext";
import {useUser} from "./contexts/userContext"
import Detail from "./views/Detail";
import EstudianteDet from "./views/EstudianteDet";
import ComunicacionForm from "./components/ComunicacionForm";
import ComunicacionDetail from "./views/ComunicacionDetail";


function App() {

  return (
    <div className="App">
      <UserProvider>
      <Main></Main>
        <Routes>
            <Route path="/" element={<Login></Login>}></Route>
            <Route path="/home" element={<Detail></Detail>}></Route>
            <Route path="/register" element={<Register />}></Route>
            <Route path="/add-comunicacion/:id" element={<ComunicacionForm></ComunicacionForm>}></Route>
            <Route path="/add-comunicacion/" element={<ComunicacionForm></ComunicacionForm>}></Route>
            <Route path="/estudiante/comunicaciones/:id" element={<EstudianteDet />}></Route>
            <Route path="/estudiante/comunicacione/:id" element={<ComunicacionDetail/>}></Route>
        </Routes>
      </UserProvider>
        <footer/>
    </div>
  );
}

export default App;
