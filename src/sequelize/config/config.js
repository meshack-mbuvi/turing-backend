require("dotenv").config();

module.exports = {
  development: {
    use_env_variable: "DATABASE_URL_DEV",
    dialect: "postgres",
    define: {
      timestamps: false
    }
  },
  test: {
    use_env_variable: "DATABASE_URL_TEST",
    dialect: "postgres",
    define: {
      timestamps: false
    },
    logging: false
  },
  production: {
    use_env_variable: "DATABASE_URL",
    dialect: "postgres",
    define: {
      timestamps: false
    },
    logging: false
  }
};
