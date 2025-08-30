const { Pool } = require('pg');

const config = {
    host: process.env.PGHOST || "localhost",
    user: process.env.PGUSER || "postgres",
    password: process.env.PGPASSWORD || "2504",
    database: process.env.PGDATABASE || "likeme",
    port: process.env.PGPORT || 5432,
};

const Singleton = (() => {
  let instance;
  function createInstance() {
    const classObj = new Pool(config);
    return classObj;
  }
  return {
    getInstance: () => {
      if (!instance) {
        instance = createInstance();
        console.log('Nueva conexión a la base de datos establecida');
      } else {
        console.log('Conexión a la base de datos reutilizada');
      }
      return instance;
    },
  };
})();

module.exports = Singleton;