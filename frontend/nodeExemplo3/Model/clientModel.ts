import db from "../db";
import sequelize from "sequelize";

export default db.define("clients", {
  id: {
    type: sequelize.INTEGER.UNSIGNED,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  nome: {
    type: sequelize.STRING,
    allowNull: false,
  },
  email: {
    type: sequelize.STRING,
    allowNull: false,
  },
  created_at: {
    type: sequelize.DATE,
    allowNull: false,
  },
  updated_at: {
    type: sequelize.DATE,
    allowNull: false,
  },
});