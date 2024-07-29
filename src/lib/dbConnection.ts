import mysql from 'mysql2/promise'


export const pool = mysql.createPool({
    host: 'localhost',     // Dirección del servidor MySQL
    user: 'root',          // Usuario de la base de datos
    password: '',  // Contraseña del usuario
    database: 'yusapi',// Nombre de la base de datos
    waitForConnections: true,
    connectionLimit: 10,   // Número máximo de conexiones en el pool
    queueLimit: 0          // Número máximo de conexiones en cola (0 = sin límite)
  });