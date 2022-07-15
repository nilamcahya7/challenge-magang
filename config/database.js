const {
  DB_USER = 'postgres',
  DB_PASSWORD = '12345',
  DB_NAME = 'KampusMerdekaDOT',
  DB_HOST = '127.0.0.1',
} = process.env;

module.exports = {
  development: {
    username: DB_USER,
    password: DB_PASSWORD,
    database: `${DB_NAME}`,
    host: DB_HOST,
    dialect: 'postgres',
    
  },
  test: {
    username: DB_USER,
    password: DB_PASSWORD,
    database: `${DB_NAME}`,
    host: DB_HOST,
    dialect: 'postgres',
    
  },
  production: {
    username: DB_USER,
    password: DB_PASSWORD,
    database: `${DB_NAME}`,
    host: DB_HOST,
    dialect: 'postgres',
    
  },
};
