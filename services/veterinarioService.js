const mysql = require('mysql2/promise');
require('dotenv').config();
async function getAllVet() {
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
    const [rows] = await pool.execute('SELECT * FROM veterinarios WHERE 1=1');
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

async function saveVet(data) {
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

    const [rows] = await pool.execute(`INSERT INTO  veterinarios (snombre,sapellido, smatricula,sespecialidad )
       values('${data.snombre}','${data.sapellido}','${data.smatricula}','${data.sespecialidad}')`);

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
async function updateVet (data) {
console.log('actualiza  vet ',data);
    
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
        `update  veterinarios set snombre= '${data.snombre}
        ', sapellido='${data.sapellido}', sespecie = '${data.sespecie}',smatricula ='${data.smatricula},sespecialidad='${data.sespecialidad} 
       where nid_veterinario='${data.nid_mascota}')`);

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
async function deleteVet(data) {
console.log('actualiza  vet ',data);
    
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
        `delete from veterinarios  where nid_veterinarios='${data.nid_veterinarios}')`);

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

module.exports = {getAllVet,saveVet,updateVet,deleteVet};