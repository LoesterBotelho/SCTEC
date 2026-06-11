import { Sequelize } from "sequelize";

const dbName = process.env.DB_NAME!;
const dbUser = process.env.DB_USER!;
const dbPass = process.env.DB_PASS!;
const dbHost = process.env.DB_HOST!;
const dbPort = process.env.DB_PORT!;

const sequelize = new Sequelize(dbName, dbUser, dbPass, {
  dialect: "postgres",
  host: dbHost,
  port: Number(dbPort) || 5432,

  define: {
    timestamps: true,
    underscored: true,
    freezeTableName: true,
  },
});

export default sequelize;
