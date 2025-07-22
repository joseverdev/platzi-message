// test-db-connection.js

const { Client } = require('pg');

// Configura tu conexión
const client = new Client({
  user: 'postgres',
  host: 'localhost',
  database: 'message_app',
  password: 'jose',
  port: 5432, // puerto por defecto de PostgreSQL
});

async function testConnection() {
  try {
    await client.connect();
    console.log('✅ Conexión exitosa a PostgreSQL');
  } catch (err) {
    console.error('❌ Error al conectar con PostgreSQL:', err.message);
  } finally {
    await client.end();
  }
}

testConnection();
