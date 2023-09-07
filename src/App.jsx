import {useState, useEffect} from 'react'
import { Button } from './components/Button/Button'
import Header from './components/Header/Header'
import useFetch from './hooks/useFetch'
import cliente from './utils/clients'
import clienteActualizado from './utils/clienteActualizado'
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import './index.scss'

function App() {
  // Ingresar
  const token = {
    Email: "PRUEBADESARROLLADORFRONT",
    Password: "MTExMTE=Ss1*"
  };
  const url = 'https://api.softix.app/api';
  const {auth} = useFetch(`${url}/cuenta/login`, token);

  // listar los usuarios
  const [clientes, setClientes] = useState(null);
  const [clienteConsultado, setClienteConsultado] = useState(null);
  const [consultado, setConsultado] = useState(false);

  useEffect(() => {
    if (auth?.token) {
      fetch(`${url}/usuarios/listar`, {
        headers: {
          'Authorization': `Bearer ${auth.token}`
        }
      })
        .then(response => response.json())
        .then(data => setClientes(data))
    }
  }, [auth])

  // Crear un cliente 
  const [mensaje, setMensaje] = useState("");
  const handleCreate = () => {
    setConsultado(null);
    fetch(`${url}/clientes/crear`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${auth.token}`
      },
      body: JSON.stringify(cliente)
    })
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.text();
    })
    .then(data => {
      setClientes([...clientes]);
      console.log(data)
      toast.success("Se creó el cliente correctamente")
    })
    .catch(error => {
      console.error('Error al crear el cliente:', error);
      toast.error("Error al crear cliente, mensaje de error :'El cliente Ya Existe!..")
    });
  }

  const handleUpdate = () => {
    const clienteId = "010101010";
    setConsultado(null);
    fetch(`${url}/clientes/${clienteId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${auth.token}`
      },
      body: JSON.stringify(clienteActualizado)
    })
      .then(response => {
        console.log(response)
        if (response.ok) {
          toast.success(`Se ha actualizado el cliente con cédula No ${clienteId}`)
        } else {
          return response.text().then(errorMessage => {
            throw new Error(`HTTP error! Status: ${response.status}, Message: ${errorMessage}`);
          });
        }
      })
      .catch(error => {
        console.error('Error al actualizar el cliente:', error);
        toast.error('Error al actualizar el cliente: cliente no encontrado')
      });
  }
  
  const handleConsult = () => {
    const clienteId = "010101010";
    fetch(`${url}/clientes/${clienteId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${auth.token}`
      }
    })
    .then(response => response.json())
    .then(data => {
      setClienteConsultado(data)
      setConsultado(true);
      toast.success('Se consultó el cliente correctamente')
    })
    .catch(error => {
      console.error('Error al consultar el cliente:', error)
      toast.error('Error al consultar el cliente: cliente no encontrado')
    })
  }
  
  return (
    <>
      <Header />
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      <div className="containerButtons">
        <Button onClick={handleCreate} text="Crear cliente"/>
        <Button onClick={handleUpdate} text="Actualizar cliente"/>
        <Button onClick={handleConsult} text="Consultar cliente"/>
      </div>
      <h1>Clientes</h1>
      <div className="containerCard">
        {consultado ? ( 
          clienteConsultado?.map(cliente => ( 
            <div key={cliente.id} className='card'>
              <p>Nombre: <span>{cliente.nombre1}</span></p>
              <p>Correo: <span>{cliente.correo}</span></p>
              <p>Cédula: <span>{cliente.cedula}</span></p>
            </div>
          ))
        ) : (
          clientes?.map(cliente => ( 
            <div key={cliente.id} className='card'>
              <p>Nombre: <span>{cliente.nombre}</span></p>
              <p>Correo: <span>{cliente.correo}</span></p>
              <p>Cédula: <span>{cliente.cedula}</span></p>
            </div>
          ))
        )}
      </div>
    </>
  )
}

export default App
