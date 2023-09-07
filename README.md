# Prueba para Desarrollador Frontend con React

Este proyecto consiste en crear una aplicación React que cumple con una serie de tareas especificadas. A continuación, se detallan las instrucciones y pasos para completar la prueba.

## Tarea 1: Crear una Aplicación React
Crea una aplicación React que haga lo siguiente.
- **Configura el entorno de React:** Crear una aplicación de React.
- **crea componente Header:** que muestre el título "Mi Aplicación React" en un encabezado.
- **crea componente Button:** que muestre un botón que diga "Crear cliente", "Actualizar cliente" o "Consultar cliente".

## Tarea 2: Consumir una API para Obtener Datos
- Utiliza la API pública [Softix API](https://www.softix.site/API/) para obtener una lista de clientes (`/posts`).
   
   Credenciales:
   ```json
   {
     "email": "PRUEBADESARROLLADORFRONT",
     "password": "MTExMTE=Ss1*"
   }
- Cuando se haga clic en el botón "Crear cliente", utiliza el estado de React para hacer una solicitud a la API y mostrar un mensaje de “Se creó el cliente correctamente”
- Cuando se haga clic en el botón "Actualizar cliente", utiliza el estado de React para hacer una solicitud a la API y mostrar un mensaje de “Se Actualizo el cliente correctamente”
- Cuando se haga clic en el botón "Consultar cliente", utiliza el estado de React para hacer
una solicitud a la API y mostrar la inserción, actualización.

## Tarea 3: Estilizar la Aplicación
- Utiliza CSS para aplicar estilo a la aplicación.
- Estiliza los componentes para que tengan una apariencia profesional.
- Asegúrate de que la aplicación sea visualmente atractiva y legible en diferentes tamaños de pantalla utilizando diseño responsivo.

## Instalación

1. Clona este repositorio en tu máquina local.
2. Instala las dependencias usando el comando: `npm install`

## Ejecución
Una vez que hayas instalado las dependencias puedes ejecutar el proyecto usando el comando: `npm run dev`

## Tecnologías Utilizadas

- Vite: Herramienta de compilación rápida y sencilla para proyectos web.
- React V18.2: Biblioteca de JavaScript para la construcción de interfaces de usuario.
- Fetch: API para realizar peticiones HTTP.
- SASS: Preprocesador de CSS.
- React toastify: Librería para mostrar notificaciones.