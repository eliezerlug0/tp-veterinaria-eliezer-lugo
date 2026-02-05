const mysql = require('mysql2/promise');
require('dotenv').config();
async function getAllMascotas() {
  const config = {
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USERNAME || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'veterinaria_patitas_felices',
    port: process.env.DB_PORT || 3306,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
  };

  try {
    // Test with connection pool
    const pool = mysql.createPool(config);
   
    // Test connection with a simple query
    const [rows] = await pool.execute('SELECT * FROM mascotas WHERE 1=1');
    console.log('✅ MySQL Connection Successful!');
    console.log('Test Query Result:', rows);
   
      return { success: true, users: rows };
   
  } catch (error) {
    console.error('❌ MySQL Connection Failed:');
    console.error('Error Code:', error.code);
    console.error('Error Message:', error.message);
    console.error('Full Error:', error);
   
    // Check for common errors
    if (error.code === 'ER_ACCESS_DENIED_ERROR') {
      console.error('Authentication failed. Check username/password.');
    } else if (error.code === 'ENOTFOUND' || error.code === 'ECONNREFUSED') {
      console.error('Cannot connect to MySQL server. Check host/port.');
    } else if (error.code === 'ER_BAD_DB_ERROR') {
      console.error('Database does not exist.');
    }
   
    return { success: false, error: error.message };
  }
}

async function saveMascotas(data) {
console.log('registro de usuario ',data);
    
  const config = {
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USERNAME || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'veterinaria_patitas_felices',
    port: process.env.DB_PORT || 3306,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
  };

  try {
    // Test with connection pool
    const pool = mysql.createPool(config);
   
    // Test connection with a simple query

    const [rows] = await pool.execute(`INSERT INTO  mascotas (snombre,sespecie, dfecha_nacimiento,nid_dueno )
       values('${data.snombre}','${data.sespecie}','${data.dfecha_nacimiento}','${data.nid_dueno}')`);

    //console.log('✅ MySQL Connection Successful! email y password son correctos ');
    //console.log('Test Query Result:', rows);
   
      return { success: true, users: rows };
   
  } catch (error) {
    console.error('❌ MySQL Connection Failed:');
    console.error('Error Code:', error.code);
    console.error('Error Message:', error.message);
    console.error('Full Error:', error);
   
    // Check for common errors
    if (error.code === 'ER_ACCESS_DENIED_ERROR') {
      console.error('Authentication failed. Check username/password.');
    } else if (error.code === 'ENOTFOUND' || error.code === 'ECONNREFUSED') {
      console.error('Cannot connect to MySQL server. Check host/port.');
    } else if (error.code === 'ER_BAD_DB_ERROR') {
      console.error('Database does not exist.');
    }
   
    return { success: false, error: error.message };
  }
}
async function updateMascota(data) {
console.log('actualiza  usuario ',data);
    
  const config = {
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USERNAME || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'veterinaria_patitas_felices',
    port: process.env.DB_PORT || 3306,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
  };

  try {
    // Test with connection pool
    const pool = mysql.createPool(config);
   
    // Test connection with a simple query

    const [rows] = await pool.execute(
        `update  mascotas set snombre= '${data.snombre}
        ', sespecie = '${data.sespecie}',dfecha_nacimiento ='${data.dfecha_nacimiento},nid_dueno='${data.dfecha_nacimiento} 
       where nid_mascota='${data.nid_mascota}')`);

    //console.log('✅ MySQL Connection Successful! email y password son correctos ');
    //console.log('Test Query Result:', rows);
   
      return { success: true, users: rows };
   
  } catch (error) {
    console.error('❌ MySQL Connection Failed:');
    console.error('Error Code:', error.code);
    console.error('Error Message:', error.message);
    console.error('Full Error:', error);
   
    // Check for common errors
    if (error.code === 'ER_ACCESS_DENIED_ERROR') {
      console.error('Authentication failed. Check username/password.');
    } else if (error.code === 'ENOTFOUND' || error.code === 'ECONNREFUSED') {
      console.error('Cannot connect to MySQL server. Check host/port.');
    } else if (error.code === 'ER_BAD_DB_ERROR') {
      console.error('Database does not exist.');
    }
   
    return { success: false, error: error.message };
  }
}
async function deleteMascota(data) {
console.log('actualiza  usuario ',data);
    
  const config = {
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USERNAME || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'veterinaria_patitas_felices',
    port: process.env.DB_PORT || 3306,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
  };

  try {
    // Test with connection pool
    const pool = mysql.createPool(config);
   
    // Test connection with a simple query

    const [rows] = await pool.execute(
        `delete  from mascotas  where nid_mascota='${data.nid_mascota}')`);

    //console.log('✅ MySQL Connection Successful! email y password son correctos ');
    //console.log('Test Query Result:', rows);
   
      return { success: true, users: rows };
   
  } catch (error) {
    console.error('❌ MySQL Connection Failed:');
    console.error('Error Code:', error.code);
    console.error('Error Message:', error.message);
    console.error('Full Error:', error);
   
    // Check for common errors
    if (error.code === 'ER_ACCESS_DENIED_ERROR') {
      console.error('Authentication failed. Check username/password.');
    } else if (error.code === 'ENOTFOUND' || error.code === 'ECONNREFUSED') {
      console.error('Cannot connect to MySQL server. Check host/port.');
    } else if (error.code === 'ER_BAD_DB_ERROR') {
      console.error('Database does not exist.');
    }
   
    return { success: false, error: error.message };
  }
}

module.exports = {getAllMascotas,updateMascota,saveMascotas,deleteMascota};