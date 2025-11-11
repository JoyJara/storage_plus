import mysql from 'mysql2';

export const InventoryDB = mysql.createConnection({
  host: '66.179.92.207',
  user: 'Joel',
  password: 'tu_contraseña',
  database: 'inventario'
});

InventoryDB.connect((err) => {
  if (err) {
    console.error('Error al conectarse a la base de datos:', err);
    return;
  }
  console.log('Conectado a la base de datos MySQL');
});
