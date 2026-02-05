# 🐾 SISTEMA DE GESTIÓN - VETERINARIA PATITAS FELICES

Este proyecto consiste en una **API REST** desarrollada con **Node.js** y **MySQL** para la gestión integral de una clínica veterinaria. La aplicación permite administrar de forma eficiente los registros de usuarios, dueños, mascotas, profesionales veterinarios y sus historiales clínicos.

## 🏗️ ARQUITECTURA Y DISEÑO
El proyecto implementa el patrón de arquitectura **MVC (Modelo-Vista-Controlador)** para asegurar una construcción modular y escalable, separando cada componente según su responsabilidad:

* **CORE DE CONFIGURACIÓN**: El archivo `server.js` actúa como el corazón del proyecto, donde se centraliza la configuración inicial y se definen las raíces de las relaciones hacia los routers.
* **ROUTERS**: Se encargan de la distribución del tráfico, gestionando rutas con y sin seguridad (autenticación).
* **CONTROLLERS**: Capa encargada de recibir las peticiones y realizar las **validaciones** necesarias antes de procesar la información.
* **SERVICES**: Capa donde se desarrolla la lógica de negocio y se ejecutan las operaciones **CRUD** para cada tabla.



## 🛠️ TECNOLOGÍAS UTILIZADAS
* **Node.js**: Entorno de ejecución para JavaScript en el servidor.
* **Express**: Framework para la gestión de rutas y servidores web.
* **JSON Web Token (JWT)**: Implementación de seguridad para la autenticación de usuarios.
* **Helmet**: Middleware para aumentar la seguridad de la API configurando diversas cabeceras HTTP.
* **MySQL**: Sistema de gestión de bases de datos relacional.

## 🗄️ PERSISTENCIA DE DATOS
La conexión a la base de datos MySQL se realiza a través de un **Pool de conexiones** creado en la capa de servicios. Esto permite habilitar una persistencia de datos eficiente, optimizando la reutilización de recursos y mejorando el tiempo de respuesta en el procesamiento de datos.

Las tablas principales del sistema son:
1. `usuario`
2. `duenos`
3. `mascotas`
4. `veterinarios`
5. `historial_clinico`



## 🚀 EJECUCIÓN DEL PROYECTO

1.  **Instalar las dependencias**:
    ```bash
    npm install
    ```

2.  **Configurar la base de datos**:
    * Crear la base de datos llamada `VETERINARIA_PATITAS_FELICES`.
    * Ejecutar el script SQL proporcionado para crear las tablas necesarias.

3.  **Iniciar el servidor**:
    Para ejecutar el núcleo de la aplicación, utiliza el comando:
    ```bash
    node server.js
    ```

---
**Desarrollado por:** [elugo] 