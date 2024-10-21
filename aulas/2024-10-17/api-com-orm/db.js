import { Sequelize } from "sequelize";

const conexao = new Sequelize({
    dialect: 'sqlite',
    storage: './database.db'
})

export default conexao;