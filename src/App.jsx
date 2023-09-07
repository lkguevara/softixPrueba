import {useState, useEffect} from 'react'
import { Button } from './components/Button/Button'
import Header from './components/Header/Header'
import './index.css'
import useFetch from './hooks/useFetch'
import cliente from './utils/clients'
import clienteActualizado from './utils/clienteActualizado'

function App() {
  // Ingresar
  const token = {
    Email: "PRUEBADESARROLLADORFRONT",
    Password: "MTExMTE=Ss1*"
  };
  const url = 'https://api.softix.app/api';
  const {auth} = useFetch(`${url}/cuenta/login`, token);
  // console.log(auth.token)

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
  // console.log(clientes)

  // Crear un cliente 
  const [mensaje, setMensaje] = useState("");
  const handleCreate = () => {
    setClienteConsultado(null);
    setClientes(null);
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
     
      setMensaje('Se creó el cliente correctamente');
    })
    .catch(error => {
      console.error('Error al crear el cliente:', error);
      setMensaje("Error al crear cliente, mensaje de error :'El cliente Ya Existe!..");
    });
  }

  const handleUpdate = () => {
    const clienteId = "010101010";
    setConsultado(null);
    setClientes(null);
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
          setMensaje(`Se ha actualizado el cliente con cédula No ${clienteId}`);
        } else {
          return response.text().then(errorMessage => {
            throw new Error(`HTTP error! Status: ${response.status}, Message: ${errorMessage}`);
          });
        }
      })
      .catch(error => {
        console.error('Error al actualizar el cliente:', error);
        setMensaje(error.message);
      });
  }
  
  const handleConsult = () => {
    const clienteId = "010101010";
    console.log(clienteId)
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
      setMensaje('Se consultó el cliente correctamente')
    })
    .catch(error => {
      console.error('Error al consultar el cliente:', error)
      setMensaje('Error al consultar el cliente')
    })
  }
  
  return (
    <>
      <Header />
      <Button onClick={handleCreate} text="Crear cliente"/>
      <Button onClick={handleUpdate} text="Actualizar cliente"/>
      <Button onClick={handleConsult} text="Consultar cliente"/>
      {consultado ? ( 
        clienteConsultado?.map(cliente => ( 
          <div key={cliente.id}>
            <h2>Nombre: {cliente.nombre1}</h2>
            <p>Correo: {cliente.correo}</p>
            <p>Cédula: {cliente.cedula}</p>
          </div>
        ))
      ) : (
        clientes?.map(cliente => ( 
          <div key={cliente.id}>
            <h2>Nombre: {cliente.nombre}</h2>
            <p>Correo: {cliente.correo}</p>
            <p>Cédula: {cliente.cedula}</p>
          </div>
        ))
      )}
      <p>{mensaje}</p>
    </>
  )
}

export default App
