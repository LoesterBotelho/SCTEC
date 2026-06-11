import db from "../db";
import sequelize from "sequelize";

export default db.define(
  "clients",
  {
    id: {
      type: sequelize.INTEGER,
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
  },
  {
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  },
);
