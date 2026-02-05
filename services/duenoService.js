const mysql = require('mysql2/promise');
require('dotenv').config();
async function getAllDuenos() {
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
    const [rows] = await pool.execute('SELECT * FROM duenos WHERE 1=1');
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

async function saveDueno(data) {
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

    const [rows] = await pool.execute(`INSERT INTO  duenos (snombre,sapellido, stelefono,sdireccion )
       values('${data.snombre}','${data.sapellido}','${data.stelefono}','${data.sdireccion}')`);

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
async function updateDueno(data) {
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
        `update  duenos set snombre= '${data.snombre}
        ', sapellido='${data.sapellido}', stelefono = '${data.stelefono}',sdireccion ='${data.sdireccion}' 
       where nid_dueno='${data.nid_dueno}'`);

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
async function deleteDueno(data) {
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
        `delete from duenos  where nid_dueno=${data}`);

    //console.log('✅ MySQL Connection Successful! email y password son correctos ');
    //console.log('Test Query Result:', rows);
   console.log("delete?  ",rows);
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

module.exports = {getAllDuenos,saveDueno,updateDueno,deleteDueno};