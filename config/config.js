const {DB_USER,DB_PASSWORD,DB_NAME}= require('./env')

module.exports = {
  "development": {
    "username": DB_USER, // ← Usuario de la DB
    "password": DB_PASSWORD, // ← Contraseña del usuario de la DB
    "database": DB_NAME, // ← Nombre de la DB previamente creada
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "test": {
    "username": "root",
    "password": null,
    "database": "database_test",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "production": {
    "username": "root",
    "password": null,
    "database": "database_production",
    "host": "127.0.0.1",
    "dialect": "mysql"
  }
}
